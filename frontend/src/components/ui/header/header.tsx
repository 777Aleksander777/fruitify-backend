import React from "react";
import TopNav from "./top-nav";
import { HeaderProps } from "../../../types/header";


// export interface HeaderProps {
//     data: {
//         logo: {
//             id: number,
//             href: string,
//             label: string,
//             image: {
//                 id: number,
//                 documentId: string,
//                 url: string,
//                 name: string,
//                 alternativeText: string,
//                 width: number,
//                 height: number,
//             },
//         },
//         links: [
//             {
//                 id: number,
//                 href: string,
//                 label: string,
//                 isExternal: boolean,
//             },
//         ],
//         cta: [
//             {
//                 id: number,
//                 href: string,
//                 label: string,
//                 isExternal: boolean,
//             },
//         ],
//     }
// }

export async function Header({ data }: Readonly<HeaderProps>) {
    
    console.log("Header: " + data.logo.zdjecie.url);
    return (
        <TopNav data={data} logoUrl={data.logo.zdjecie.url}/>
    )
}