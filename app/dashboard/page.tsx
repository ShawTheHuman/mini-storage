import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUnitById } from "@/lib/data"; // Import UNITS directly for mocking a rented unit

export default async function DashboardPage() {
    // Simulate fetching user's rented units.
    // For demo, we'll pretend the user has rented "u-101"
    const rentedUnitId = "u-101";
    const rentedUnit = await getUnitById(rentedUnitId);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Your Rentals</h3>
                <p className="text-sm text-muted-foreground">
                    View and manage your active storage units.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rentedUnit ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>{rentedUnit.size} Unit</CardTitle>
                            <CardDescription>{rentedUnit.name} • {rentedUnit.location}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-0">
                                <div className="text-2xl font-bold">${rentedUnit.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white shadow hover:bg-green-500/80">Active</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button variant="outline" className="w-full">View Details</Button>
                            <Button variant="outline" className="w-full">Pay Bill</Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <Card className="border-dashed">
                        <CardHeader className="text-center">
                            <CardTitle>No Active Rentals</CardTitle>
                            <CardDescription>You don&apos;t have any units yet.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center pb-6">
                            <Link href="/units">
                                <Button>Rent a Unit</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
