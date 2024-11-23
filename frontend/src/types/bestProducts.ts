import { ProductProps } from "./product"

export interface BestProductsProps {
    nazwa: string,
    produkt: [
        {
            produkty: {
                tytul: string,
                slug: string,
                opis: string,
                cena: number,
                dostepny: boolean,
                kategoria: 'OWOCE' | 'WARZYWA',
                zdjecie: {
                    url: string,
                    name: string,
                    alternativeText: string,
                    width: number,
                    heigth: number,
                },
            }
        }
    ]
}