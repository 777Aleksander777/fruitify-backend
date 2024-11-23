import { link } from "fs";
import Link from "next/link";
import React from "react";
import { FooterProps } from "@/types/footer";
import Logo from "../logo";

export async function Footer({ data }: Readonly<FooterProps>) {
  
    const { logo, tekst,  linki} = data;

    return (
        <footer className="w-full h-32 mb-0 bg-primary-foreground">
            <div className="max-w-[1536px] h-full mx-auto gap-4 px-6  flex flex-nowrap justify-between align-center items-center">
                <Logo href={logo.adres} imageURL={logo.zdjecie.url} alt={logo.zdjecie.alternativeText} width={64} height={64}/>
                <p className="text-center text-primary">{tekst}</p>
                {linki.map((link) => {
                    return <Link className="text-primary" key={link.id} href={link.adres}>{link.nazwa}</Link>
                })}
            </div>
        </footer>
    )
}