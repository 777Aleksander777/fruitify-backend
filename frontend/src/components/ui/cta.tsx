import React from "react";
import Link from "next/link";

interface CtaProps {
    adres: string,
    nazwa: string,
}

export async function CTA({ adres, nazwa }: Readonly<CtaProps>) {
    

    return (
        <Link href={adres}>{nazwa}</Link>
    )
}