import { getUnitById } from "@/lib/data";
import { notFound } from "next/navigation";
import { RentalConfigForm } from "@/components/checkout/RentalConfigForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
    params: {
        unitId: string;
    };
}

export default async function RentalConfigPage({ params }: Props) {
    const { unitId } = await params;
    const unit = await getUnitById(unitId);

    if (!unit || !unit.isAvailable) {
        notFound();
    }

    return (
        <div className="container mx-auto py-12 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Complete Your Rental</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Left: Config Form */}
                <div className="md:col-span-2 space-y-6">
                    <RentalConfigForm unit={unit} />
                </div>

                {/* Right: Unit Summary */}
                <div>
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Unit Summary</CardTitle>
                            <CardDescription>Review your selection</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center text-muted-foreground mb-4">
                                Unit Image
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold">{unit.size} Unit</span>
                                    <Badge variant="secondary">{unit.location}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{unit.name}</p>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t">
                                <span className="text-muted-foreground">Base Monthly Rate</span>
                                <span className="font-semibold">${unit.price}/mo</span>
                            </div>
                            <div className="pt-4 border-t text-xs text-muted-foreground">
                                <p>Access hours: 6am - 10pm</p>
                                <p>Insurance required (offered in checkout)</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
