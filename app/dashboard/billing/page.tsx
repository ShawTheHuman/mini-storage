"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, CreditCard, Clock } from "lucide-react";

export default function BillingPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Billing</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your payment methods and view transactions.
                </p>
            </div>
            <Separator />

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Payment Methods</h4>
                    <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" /> Add New</Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="relative overflow-hidden border-primary/50">
                        <div className="absolute top-0 right-0 p-2 bg-primary text-primary-foreground text-xs font-bold rounded-bl">Default</div>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle className="text-base">Visa ending in 4242</CardTitle>
                                <CardDescription>Expires 12/2026</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </div>
            </section>

            <section className="pt-8">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Invoice History</h4>
                <div className="rounded-md border">
                    <div className="p-4 flex items-center justify-between border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-green-100 text-green-700 rounded-full">
                                <Clock className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Monthly Rent - Unit 101</p>
                                <p className="text-xs text-muted-foreground">Paid on Dec 1, 2025</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-sm">$45.00</p>
                            <p className="text-xs text-green-600">Paid</p>
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-green-100 text-green-700 rounded-full">
                                <Clock className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Security Deposit</p>
                                <p className="text-xs text-muted-foreground">Paid on Nov 15, 2025</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-sm">$45.00</p>
                            <p className="text-xs text-green-600">Paid</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
