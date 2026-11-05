import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUnits } from "@/lib/data";
import { ArrowRight, CheckCircle2, ShieldCheck, Truck } from "lucide-react";

export default async function Home() {
  const allUnits = await getUnits();
  const featuredUnits = allUnits.slice(0, 3); // Show first 3 units

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="container mx-auto relative z-10 flex flex-col items-center text-center gap-8">
          <Badge className="px-4 py-1 text-sm" variant="secondary">
            New Location Open Now
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl text-balance">
            Secure, Affordable Storage near you.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
            Rent your unit online in minutes. 24/7 access, climate control options, and state-of-the-art security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/units">
              <Button size="lg" className="px-10 text-md h-12 rounded-full">
                Find a Unit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/location">
              <Button size="lg" variant="outline" className="px-8 text-md h-12">
                View Location
              </Button>
            </Link>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-lg bg-background border shadow-sm">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-xl">Top-Tier Security</h3>
            <p className="text-muted-foreground">24/7 video surveillance, gated access, and individual unit alarms.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-lg bg-background border shadow-sm">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-xl">Climate Control</h3>
            <p className="text-muted-foreground">Keep your valuables safe from extreme temperatures and humidity.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-lg bg-background border shadow-sm">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-xl">Easy Access</h3>
            <p className="text-muted-foreground">Drive-up units and wide loading docks for hassle-free moving.</p>
          </div>
        </div>
      </section>

      {/* Featured Units */}
      <section className="py-20 container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Featured Units</h2>
            <p className="text-muted-foreground">Popular sizes available for immediate move-in.</p>
          </div>
          <Link href="/units">
            <Button variant="ghost">View All Units <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredUnits.map((unit) => (
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
      </section>
    </div>
  );
}
