import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
    searchParams: {
        session_id?: string;
        canceled?: string;
        unitId?: string;
    };
}

export default async function CheckoutResultPage({ searchParams }: Props) {
    const { session_id, canceled, unitId } = await searchParams;

    if (canceled) {
        return (
            <div className="container flex items-center justify-center min-h-[60vh]">
                <Card className="w-full max-w-md border-destructive/50">
                    <CardHeader className="text-center">
                        <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                        <CardTitle>Checkout Canceled</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground">
                        Your payment was not processed. No charges were made.
                    </CardContent>
                    <CardFooter className="flex justify-center gap-4">
                        <Link href={unitId ? `/checkout/${unitId}` : "/"}>
                            <Button variant="outline">Try Again</Button>
                        </Link>
                        <Link href="/">
                            <Button variant="ghost">Return Home</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    if (session_id) {
        return (
            <div className="container flex items-center justify-center min-h-[60vh]">
                <Card className="w-full max-w-md border-green-500/50">
                    <CardHeader className="text-center">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <CardTitle>Payment Successful!</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground">
                        <p className="mb-2">Thank you for your rental.</p>
                        <p className="text-sm">You will receive a confirmation email shortly. Your unit is now ready for access.</p>
                        <div className="mt-4 p-3 bg-muted rounded text-sm font-mono">
                            Order ID: {session_id.slice(0, 10)}...
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Link href="/dashboard">
                            <Button className="w-full">Go to Dashboard</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    redirect("/");
}
