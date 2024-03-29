import type { ReactNode } from "react";

export default function LayoutCreartion({ children }: { children: ReactNode}) {
    return (
        <div className="mt-10">
            {children}
        </div>
    )
}