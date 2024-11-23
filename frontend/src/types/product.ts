export interface ProductProps {
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