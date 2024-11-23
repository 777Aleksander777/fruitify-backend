export interface FooterProps {
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
        tekst: string,
        linki: [
            {
                id: number,
                adres: string,
                nazwa: string,
                jestZewnetrzny: boolean,
            },
        ],
    }
};