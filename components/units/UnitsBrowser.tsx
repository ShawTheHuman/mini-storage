"use client";

import { useState, useMemo } from "react";
import { StorageUnit, UnitSize } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface UnitsBrowserProps {
    initialUnits: StorageUnit[];
}

export function UnitsBrowser({ initialUnits }: UnitsBrowserProps) {
    const [selectedSizes, setSelectedSizes] = useState<UnitSize[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
    const [features, setFeatures] = useState<string[]>([]);

    // Extract unique features
    const allFeatures = Array.from(new Set(initialUnits.flatMap(u => u.features)));
    const allSizes: UnitSize[] = ['5x5', '5x10', '10x10', '10x15', '10x20'];

    const filteredUnits = useMemo(() => {
        return initialUnits.filter(unit => {
            // Filter by Size
            if (selectedSizes.length > 0 && !selectedSizes.includes(unit.size)) return false;

            // Filter by Price
            if (unit.price < priceRange[0] || unit.price > priceRange[1]) return false;

            // Filter by Features (Must have all selected features? Or at least one? Usually "AND" logic for selected)
            // Let's go with "AND" logic for better specificity, but "OR" is often more user friendly web standard for same-category.
            // Since "features" is a single list, let's treat checking multiple features as "MUST HAVE ALL".
            if (features.length > 0) {
                const hasAllFeatures = features.every(f => unit.features.includes(f));
                if (!hasAllFeatures) return false;
            }

            return true;
        });
    }, [initialUnits, selectedSizes, priceRange, features]);

    const toggleSize = (size: UnitSize) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const toggleFeature = (feature: string) => {
        setFeatures(prev =>
            prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
        );
    };

    const clearFilters = () => {
        setSelectedSizes([]);
        setPriceRange([0, 300]);
        setFeatures([]);
    };

    const renderFilterControls = () => (
        <div className="space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-semibold">Size</h3>
                <div className="space-y-2">
                    {allSizes.map(size => (
                        <div key={size} className="flex items-center space-x-2">
                            <Checkbox
                                id={`size-${size}`}
                                checked={selectedSizes.includes(size)}
                                onCheckedChange={() => toggleSize(size)}
                            />
                            <Label htmlFor={`size-${size}`}>{size}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-lg font-semibold">Price Range (${priceRange[0]} - ${priceRange[1]})</h3>
                <Slider
                    defaultValue={[0, 300]}
                    max={500}
                    step={5}
                    value={priceRange}
                    onValueChange={(val) => setPriceRange(val as [number, number])}
                    className="py-4"
                />
            </div>

            <div>
                <h3 className="mb-4 text-lg font-semibold">Features</h3>
                <div className="space-y-2">
                    {allFeatures.map(feature => (
                        <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                                id={`feat-${feature}`}
                                checked={features.includes(feature)}
                                onCheckedChange={() => toggleFeature(feature)}
                            />
                            <Label htmlFor={`feat-${feature}`}>{feature}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <Button variant="outline" className="w-full" onClick={clearFilters}>
                Clear Filters
                <X className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Sheet */}
            <div className="lg:hidden mb-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" /> Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                            <SheetDescription>Narrow down your search</SheetDescription>
                        </SheetHeader>
                        <div className="mt-8">
                            {renderFilterControls()}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                    {renderFilterControls()}
                </div>
            </div>

            {/* Results Grid */}
            <div className="flex-1">
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-muted-foreground">{filteredUnits.length} units found</p>
                    {/* Sort controls could go here */}
                </div>

                {filteredUnits.length === 0 ? (
                    <div className="text-center py-20 border rounded-lg bg-muted/10">
                        <h3 className="text-xl font-bold mb-2">No units found</h3>
                        <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results.</p>
                        <Button onClick={clearFilters}>Clear All Filters</Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredUnits.map((unit) => (
                            <Card key={unit.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        <span>{unit.size}</span>
                                        <span className="text-xl font-bold">${unit.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
                                    </CardTitle>
                                    <CardDescription>{unit.name} • {unit.location}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-sm text-muted-foreground mb-4">{unit.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {unit.features.map((feature) => (
                                            <Badge key={feature} variant="secondary" className="font-normal text-xs">{feature}</Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/units/${unit.id}`} className="w-full">
                                        <Button className="w-full" disabled={!unit.isAvailable}>
                                            {unit.isAvailable ? "Reserve Now" : "Waitlist"}
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
