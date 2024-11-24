"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { StrapiImage } from "./strapi-image";
import { ImageProps } from "../../types/image";
import { LogoProps } from "../../types/logo"
import { getPublicUrl } from "../../lib/utils";
import { Spinner } from "@nextui-org/react";


// type CombinedProps = LogoProps & ImageProps;

export default function Logo({
    href,
    imageURL,
    alt,
    width = 36,
    height = 36,
}: Readonly<LogoProps>) {

    const [src, setSrc] = useState<string | null>(null);

    // const src = await getStrapiURL() + imageURL;
    useEffect(() => {
        const fetchImage = async () => {
          const imageSrc = await getPublicUrl(imageURL);
          console.log("Logo imageUrl: " + imageURL);
          console.log("########################################")
          console.log("Logo imageSrc: " + imageSrc);
          setSrc(imageSrc);
        };
    
        fetchImage();
      }, [imageURL]);
    
      if (!src) return <Spinner color="success"/>; // Obsługa ładowania

    return (
        <Link href={href}>
            <StrapiImage src={imageURL} alt={alt} width={width} height={height}/>
        </Link>
    )
}