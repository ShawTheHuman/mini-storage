import { getUnitById, getUnits } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MapPin, Ruler, ShieldCheck } from "lucide-react";

import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
    params: {
        id: string;
    };
}

// Generate static params for all known units (optional, but good for SEO/Performance)
export async function generateStaticParams() {
    const units = await getUnits();
    return units.map((unit) => ({
        id: unit.id,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const unit = await getUnitById(id);
    if (!unit) return { title: "Unit Not Found" };

    return {
        title: `${unit.size} Storage Unit - ${unit.name} | 144 Mini-Storage`,
        description: `Rent this ${unit.size} unit at ${unit.location}. ${unit.features.join(", ")}.`,
    };
}

export default async function UnitPage({ params }: Props) {
    const { id } = await params;
    const unit = await getUnitById(id);

    if (!unit) {
        notFound();
    }

    return (
        <div className="container mx-auto py-12">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Left Col: Image / Visual */}
                <div className="space-y-6">
                    <div className="aspect-square relative rounded-xl overflow-hidden bg-muted flex items-center justify-center border">
                        {/* Placeholder for real image */}
                        <div className="text-center p-6">
                            <Ruler className="h-24 w-24 mx-auto text-muted-foreground/50 mb-4" />
                            <p className="text-2xl font-bold text-muted-foreground">{unit.size}</p>
                            <p className="text-muted-foreground">Schematic View</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="p-6 text-center space-y-2">
                                <MapPin className="h-6 w-6 mx-auto text-primary" />
                                <div className="font-semibold">Location</div>
                                <div className="text-sm text-muted-foreground">{unit.location}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center space-y-2">
                                <ShieldCheck className="h-6 w-6 mx-auto text-primary" />
                                <div className="font-semibold">Security</div>
                                <div className="text-sm text-muted-foreground">Enhanced</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Col: Details & Action */}
                <div className="space-y-8">
                    <div>
                        <Badge variant="outline" className="mb-4">{unit.isAvailable ? "Available" : "Waitlist Only"}</Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2">{unit.name}</h1>
                        <p className="text-xl text-muted-foreground">{unit.description}</p>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">${unit.price}</span>
                        <span className="text-muted-foreground">/ month</span>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Unit Features</h3>
                        <ul className="grid gap-3">
                            {unit.features.map(feature => (
                                <li key={feature} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-6 border-t">
                        {unit.isAvailable ? (
                            <Link href={`/checkout/${unit.id}`}>
                                <Button size="lg" className="w-full text-lg h-14">
                                    Rent This Unit Now
                                </Button>
                            </Link>
                        ) : (
                            <Button size="lg" className="w-full text-lg h-14" variant="secondary" disabled>
                                Join Waitlist
                            </Button>
                        )}
                        <p className="text-center text-xs text-muted-foreground mt-4">
                            Secure checkout powered by Stripe. No long-term commitment required.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
