import ProductCard from "@/components/product/card/product";
import { BestProductsProps } from "@/types/bestProducts";

// interface BestProductsProps {
//     nazwa: string,
//     produkt: [
//          {
//             produkty: {
//                 tytul: string,
//                 slug: string,
//                 opis: string,
//                 cena: number,
//                 dostepny: boolean,
//                 kategoria: 'OWOCE' | 'WARZYWA',
//                 zdjecie: {
//                     url: string,
//                     name: string,
//                     alternativeText: string,
//                     width: number,
//                     heigth: number,
//                 },
//             }
//         }
//     ]
// }


export function BestProducts({ data } : {readonly data: BestProductsProps}) {

    const { nazwa, produkt} = data;

    return (
        <div>
            <h1 className="text-center mt-32 mb-16">
                {nazwa}
            </h1>
            <section className="max-w-[1536px] w-full px-8 mb-32 mx-auto flex flex-wrap flex-row justify-center align-center items-start gap-8">
                {produkt?.map((p) => {
                    return <ProductCard key={p.produkty.slug} slug={p.produkty.slug} quantity={1}/>
                })}
            </section>
        </div>
    )
}