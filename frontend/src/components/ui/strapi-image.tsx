"use client";

import React, { useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicUrl, getStrapiMedia } from "../../lib/utils";
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
          setURL(imageSrc);
        };
    
        fetchImage();
      }, [src]);
    
      if (!url) return <Spinner color="success"/> // Obsługa ładowania

    

    return (
        <Image className="object-scale-down h-full m-auto" src={"https://cswuhyugfqkxtbycmfev.supabase.co/storage/v1/object/public/fruitify/uploads/ziemniak.png-4b7e7f6b70d94e5ac094ad9a0da2617c.png"} alt={alt || ""} width={width || undefined} height={height || undefined}/> 
    )
}