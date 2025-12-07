import { UnitsBrowser } from "@/components/units/UnitsBrowser";
import { getUnits } from "@/lib/data";

export const metadata = {
    title: "Browse Storage Units | 144 Mini-Storage",
    description: "Find the perfect storage unit size for your needs. Climate controlled and drive-up access available.",
};

export default async function UnitsPage() {
    const units = await getUnits();

    return (
        <div className="container mx-auto py-12">
            <div className="mb-8 space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Available Units</h1>
                <p className="text-muted-foreground">Browse our selection of clean, secure storage units.</p>
            </div>

            <UnitsBrowser initialUnits={units} />
        </div>
    );
}
