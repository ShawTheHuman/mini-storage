"use client";

import { StorageUnit } from "@/types";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";


interface RentalConfigFormProps {
    unit: StorageUnit;
}

const DURATION_OPTIONS = [
    { months: 1, label: "Monthly (Month-to-Month)", discount: 0 },
    { months: 3, label: "3 Months", discount: 0.05 },
    { months: 6, label: "6 Months", discount: 0.10 },
    { months: 12, label: "12 Months (Best Value)", discount: 0.15 },
];

export function RentalConfigForm({ unit }: RentalConfigFormProps) {
    const { data: session } = useSession();
    const [duration, setDuration] = useState(1);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    // Guest State
    const [guestName, setGuestName] = useState("");
    const [guestEmail, setGuestEmail] = useState("");
    const [guestPhone, setGuestPhone] = useState("");

    const selectedOption = DURATION_OPTIONS.find(o => o.months === duration) || DURATION_OPTIONS[0];
    const monthlyPrice = unit.price;
    const discountAmount = monthlyPrice * selectedOption.discount;
    const discountedMonthlyPrice = monthlyPrice - discountAmount;
    const totalDueToday = discountedMonthlyPrice; // Assuming billing first month now.

    const handleCheckout = async () => {
        if (!agreedToTerms) return;

        // Guest Validation
        if (!session) {
            if (!guestName || !guestEmail || !guestPhone) {
                alert("Please fill in all guest information fields.");
                return;
            }
        }

        setLoading(true);

        // Call API to create checkout session
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    unitId: unit.id,
                    durationMonths: duration,
                    priceId: "price_mock_id", // In real app, look up Stripe Price ID
                    guestInfo: !session ? { name: guestName, email: guestEmail, phone: guestPhone } : undefined
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("No checkout URL returned");
                alert("Checkout initialization failed. Check console.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {!session && (
                <section>
                    <h3 className="text-lg font-semibold mb-4">1. Guest Information</h3>
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="guest-name">Full Name</Label>
                                <Input id="guest-name" placeholder="John Doe" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="guest-email" className="p-6 rounded-xl">Email Address</Label>
                                    <Input id="guest-email" type="email" placeholder="john@example.com" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="guest-phone">Phone Number</Label>
                                    <Input id="guest-phone" type="tel" placeholder="(555) 000-0000" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required />
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                We'll create an account for you after checkout using this email.
                            </p>
                        </CardContent>
                    </Card>
                </section>
            )}

            <section>
                <h3 className="text-lg font-semibold mb-4">{!session ? "2." : "1."} Select Rental Duration</h3>
                <RadioGroup
                    value={duration.toString()}
                    onValueChange={(val) => setDuration(parseInt(val))}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {DURATION_OPTIONS.map((option) => (
                        <div key={option.months}>
                            <RadioGroupItem value={option.months.toString()} id={`d-${option.months}`} className="peer sr-only" />
                            <Label
                                htmlFor={`d-${option.months}`}
                                className={cn(
                                    "flex flex-col justify-between rounded-xl border-2 bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full border-slate-200",
                                    duration === option.months && "border-primary"
                                )}
                            >
                                <span className="font-semibold">{option.label}</span>
                                <div className="mt-2">
                                    {option.discount > 0 ? (
                                        <>
                                            <span className="text-muted-foreground line-through text-sm mr-2">${unit.price}/mo</span>
                                            <span className="font-bold text-green-600">${(unit.price * (1 - option.discount)).toFixed(2)}/mo</span>
                                            <div className="text-xs text-green-600 font-medium mt-1">Save {option.discount * 100}%</div>
                                        </>
                                    ) : (
                                        <span className="font-bold">${unit.price}/mo</span>
                                    )}
                                </div>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-4">{!session ? "3." : "2."} Review Charges</h3>
                <Card>
                    <CardContent className="p-6 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Monthly Rate</span>
                            <span>${unit.price.toFixed(2)}</span>
                        </div>
                        {selectedOption.discount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Discount ({selectedOption.discount * 100}%)</span>
                                <span>-${discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="pt-2 mt-2 border-t flex justify-between font-bold text-lg">
                            <span>Due Today</span>
                            <span>${totalDueToday.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Recurring monthly payment will be ${discountedMonthlyPrice.toFixed(2)}.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-4">{!session ? "4." : "3."} Terms & Agreement</h3>
                <div className="h-32 overflow-y-auto border rounded-md p-4 text-sm text-muted-foreground mb-4 bg-muted/20">
                    <p className="font-bold mb-2">RENTAL AGREEMENT TERMS</p>
                    <p className="mb-2">1. The Tenant agrees to pay rent on time.</p>
                    <p className="mb-2">2. No hazardous materials allowed.</p>
                    <p className="mb-2">3. 30-day notice required for vacation (unless fixed term).</p>
                    <p className="mb-2">4. Manager has right to enter for emergency repairs.</p>
                    <p className="mb-2">5. Late fees apply after 5 days.</p>
                    <p>By checking the box below, you acknowledge you have read and agree to all terms listed above.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(c) => setAgreedToTerms(c as boolean)} />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                        I agree to the Rental Agreement and Terms of Service.
                    </Label>
                </div>
            </section>

            <Button size="lg" className="w-full text-lg" disabled={!agreedToTerms || loading} onClick={handleCheckout}>
                {loading ? "Processing..." : `Proceed to Payment ($${totalDueToday.toFixed(2)})`}
            </Button>
        </div>
    );
}
