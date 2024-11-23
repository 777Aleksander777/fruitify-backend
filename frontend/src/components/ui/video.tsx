"use client";

import React, { useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicUrl, getStrapiMedia } from "../../lib/utils";
import { ImageProps } from "../../types/image";
import { Spinner } from "@nextui-org/react";


type VideoProps = {
    src: string,
}

export function StrapiVideo({
    src,
}: Readonly<VideoProps>) {

    // const imageURL = getStrapiMedia(src);
    // if(!imageURL) return null;

    const [url, setURL] = useState<string | null>(null);

    // const src = await getStrapiURL() + imageURL;
    useEffect(() => {
        const fetchImage = async () => {
          const mediaSrc = await getPublicUrl(src);
          setURL(mediaSrc);
          console.log(src);
          console.log('####################')
          console.log(mediaSrc);
        };
        
        fetchImage();
    }, [src]);
    
      if (!url) return <Spinner color="success"/> // Obsługa ładowania

    

    return (
        // <Image className="object-scale-down h-full m-auto" src={url} alt={alt || ""} width={width || undefined} height={height || undefined}/> 
        // <video 
        //     src={url}>
        //     autoPlay

        // </video>
        <video className="m-auto rounded-xl drop-shadow-[0_0_24px_rgba(0,0,0,1)]" width="1200" height="auto" autoPlay={true} preload="auto" muted>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
    )
}