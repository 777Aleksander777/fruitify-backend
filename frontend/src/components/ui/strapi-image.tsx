"use client";

import React, { useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicUrl } from "../../lib/utils";
import { ImageProps } from "../../types/image";
import { Spinner } from "@nextui-org/react";


export function StrapiImage({
    src,
    alt,
    width,
    height,
}: Readonly<ImageProps>) {

    // const imageURL = getStrapiMedia(src);
    // if(!imageURL) return null;

    const [url, setURL] = useState<string | null>(null);

    // const src = await getStrapiURL() + imageURL;
    useEffect(() => {
        const fetchImage = async () => {
          // const imageSrc = await getStrapiMedia(src);
          const imageSrc = await getPublicUrl(src);
          console.log("Image src: " + imageSrc)
          setURL(imageSrc);
        };
    
        fetchImage();
      }, [src]);
    
      if (!url) return <Spinner color="success"/> // Obsługa ładowania

    

    return (
        <Image className="object-scale-down h-full m-auto" src={url} alt={alt || ""} width={width || undefined} height={height || undefined}/> 
    )
}