export function Footer() {
    return (
        <footer className="border-t bg-muted/40 py-6 md:py-0">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} 144 Mini-Storage. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                </div>
            </div>
        </footer>
    );
}
