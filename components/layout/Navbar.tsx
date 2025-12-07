
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    const routes = [
        { href: "/", label: "Home" },
        { href: "/units", label: "View Units" },
        { href: "/location", label: "Location" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Package className="h-6 w-6 text-primary" />
                    <Link href="/">144 Mini-Storage</Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            {route.label}
                        </Link>
                    ))}

                    <div className="flex items-center gap-4 ml-4">
                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                                            <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {session.user?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/billing">Billing</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => signOut()}>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/units">
                                    <Button size="sm">Rent Now</Button>
                                </Link>
                            </>
                        )}

                    </div>
                </nav>

                {/* Mobile Nav */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex flex-col gap-6 mt-6">
                            <Link href="/" className="font-bold text-lg" onClick={() => setIsOpen(false)}>
                                144 Mini-Storage
                            </Link>
                            <nav className="flex flex-col gap-4">
                                {routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {route.label}
                                    </Link>
                                ))}
                                <div className="flex flex-col gap-2 mt-4">
                                    {session ? (
                                        <>
                                            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                                <Button className="w-full">Dashboard</Button>
                                            </Link>
                                            <Button variant="outline" className="w-full" onClick={() => signOut()}>Log out</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                                <Button variant="outline" className="w-full">Log in</Button>
                                            </Link>
                                            <Link href="/units" onClick={() => setIsOpen(false)}>
                                                <Button className="w-full">Rent Now</Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
