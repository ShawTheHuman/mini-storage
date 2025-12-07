import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getUnitById } from "@/lib/data";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { unitId, durationMonths, guestInfo } = await req.json();

        // Allow if session exists OR if guestInfo is provided
        if (!session && !guestInfo) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const unit = await getUnitById(unitId);

        if (!unit) {
            return new NextResponse("Unit not found", { status: 404 });
        }

        // Determine user email/id for metadata
        const userEmail = session?.user?.email || guestInfo?.email || "guest_unknown";
        const userName = session?.user?.name || guestInfo?.name || "Guest";

        // Demo Mode: If no real Stripe key, return a mock success URL
        if (!process.env.STRIPE_SECRET_KEY) {
            console.log("Mocking Stripe Checkout Session for Demo");
            return NextResponse.json({
                url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/result?session_id=mock_session_123&unitId=${unitId}`
            });
        }

        // Real Stripe Logic
        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${unit.size} Storage Unit Rental (${durationMonths} Months)`,
                            description: `Unit ${unit.name} at ${unit.location}`,
                            images: unit.image ? [unit.image] : [],
                        },
                        unit_amount: unit.price * 100,
                    },
                    quantity: durationMonths,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/result?session_id={CHECKOUT_SESSION_ID}&unitId=${unitId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/${unitId}`,
            customer_email: userEmail, // Prepare for guest checkout receipt
            metadata: {
                unitId: unitId,
                userEmail: userEmail,
                userName: userName,
                durationMonths: durationMonths,
                isGuest: (!session).toString()
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error("[CHECKOUT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
