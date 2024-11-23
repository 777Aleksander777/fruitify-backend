export interface HeaderProps {
    data: {
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
}