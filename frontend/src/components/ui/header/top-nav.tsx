"use client";

import React, { useEffect, useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
// import { HeaderProps } from "../../../types/header";
// import { getStrapiURL } from "../../../lib/utils";
import Logo  from "../logo";
import { StrapiImage } from "../strapi-image";


interface HeaderProps {
    logo: {
        id: number,
        adres: string,
        nazwa: string,
        zdjecie: {
            id: number,
            documentId: string,
            url: string,
            name: string,
            alternativeText: string,
            width: number,
            height: number,
        },
    },
    linki: [
        {
            id: number,
            adres: string,
            nazwa: string,
            jestZewnetrzny: boolean,
        },
    ],
    cta: [
        {
            id: number,
            adres: string,
            nazwa: string,
            jestZewnetrzny: boolean,
        },
    ],
}

export default function TopNav({ data, logoUrl }: { readonly data: HeaderProps, logoUrl: string}) {

    const { logo, linki, cta } = data;

    // const logoURL = getStrapiURL() + logo.image.url; 
    console.log("Top nav: " + logo.zdjecie.url);
    console.log("Top nav 2: " + logoUrl);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar maxWidth="2xl" shouldHideOnScroll={false} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
                />
                <NavbarBrand>
                {/* <AcmeLogo /> */}
                {/* <p className="font-bold text-inherit">ACME</p> */}
                <Logo href={logo.adres} imageURL={"https://cswuhyugfqkxtbycmfev.supabase.co/storage/v1/object/public/fruitify/uploads/LogoWhite.svg-c04306ce160f8384f85d772e71cdc6d3.svg"} alt={logo.zdjecie.alternativeText} width={50} height={50}/>

                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {linki.map((link) => (
                    <NavbarItem key={link.id}>
                        <Link color="foreground" href={link.adres}>
                            {link.nazwa}
                        </Link>
                    </NavbarItem>
                ))}
                {/* <NavbarItem isActive>
                <Link href="#" aria-current="page">
                    Customers
                </Link>
                </NavbarItem>
                <NavbarItem>
                <Link color="foreground" href="#">
                    Integrations
                </Link>
                </NavbarItem> */}
            </NavbarContent>
            <NavbarContent justify="end">
                {cta.map((link) => (
                    // return <Link key={link.id} href={link.href}>{link.label}</Link>
                    // return <CTA key={link.id} href={link.href} label={link.label}/>
                    <NavbarItem key={link.id}>
                    <Button as={Link} color="success" href={link.adres} variant="flat">
                        {link.nazwa}
                    </Button>
                    </NavbarItem>
                ))}
                {/* <NavbarItem className="hidden lg:flex">
                <Link href="#">Login</Link>
                </NavbarItem> */}
            </NavbarContent>
            <NavbarMenu>
                {linki.map((link) => (
                    //  <Link key={link.id} href={link.href}>{link.label}</Link>
                    <NavbarMenuItem key={`${link.nazwa}-${link.id}`}>
                        <Link
                        // color={
                        //     index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                        // }
                        color="foreground"
                        className="w-full"
                        href={link.adres}
                        size="lg"
                        >
                        {link.nazwa}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}