import { StorageUnit } from "@/types";

export const UNITS: StorageUnit[] = [
    {
        id: "u-101",
        name: "Unit 101",
        size: "5x5",
        price: 45,
        description: "Small locker, perfect for boxes and small items.",
        features: ["Climate Controlled", "Indoor Access", "1st Floor"],
        isAvailable: true,
        location: "Building A",
    },
    {
        id: "u-102",
        name: "Unit 102",
        size: "5x10",
        price: 85,
        description: "Walk-in closet size. Fits a mattress set, sofa, and boxes.",
        features: ["Climate Controlled", "Indoor Access", "1st Floor"],
        isAvailable: true,
        location: "Building A",
    },
    {
        id: "u-205",
        name: "Unit 205",
        size: "10x10",
        price: 140,
        description: "Half a one-car garage. Fits furniture for a one-bedroom apartment.",
        features: ["Drive-up Access", "Non-Climate Controlled", "24/7 Access"],
        isAvailable: false,
        location: "Row B",
    },
    {
        id: "u-208",
        name: "Unit 208",
        size: "10x15",
        price: 195,
        description: "Large unit. Fits furniture for a two-bedroom apartment.",
        features: ["Drive-up Access", "Security Camera", "Wide Door"],
        isAvailable: true,
        location: "Row B",
    },
    {
        id: "u-301",
        name: "Unit 301",
        size: "10x20",
        price: 250,
        description: "Standard one-car garage size. Fits a vehicle or 3-4 bedroom house contents.",
        features: ["Drive-up Access", "Power Outlet", "High Ceilings"],
        isAvailable: true,
        location: "Row C",
    },
];

export async function getUnits(): Promise<StorageUnit[]> {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(UNITS), 100);
    });
}

export async function getUnitById(id: string): Promise<StorageUnit | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(UNITS.find(u => u.id === id)), 100);
    });
}
