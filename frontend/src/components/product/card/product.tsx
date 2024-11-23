"use client";

import { ProductProps } from "@/types/product";
import { Button, Input, Card, Spinner, Skeleton } from "@nextui-org/react";
import { StrapiImage } from "@/components/ui/strapi-image";
import { useEffect, useState } from "react";
import { getProductData } from "@/data/loader";
import { addOrUpdateProduct, getProductsFromLocalStorage } from "@/lib/localStorage";

type Slug = {
    slug: string,
    quantity: number,
}

export default function ProductCard({ slug, quantity } : Readonly<Slug> ) {

    // as={Link} href={`products/${slug}`}

    const [product, setProduct] = useState<ProductProps | null>(null);
    const [productQuantity, setProductQuantity] = useState<number>(quantity);

    const handleAddProduct = (name: string) => {
        if (!name.trim() || productQuantity <= 0 || product == null) return;
        addOrUpdateProduct(name, productQuantity, product.cena);
        console.dir( getProductsFromLocalStorage(), { depth: null })
    };

    useEffect(() => {
        const fetchData = async (slug: string) => {
            const data = await getProductData(slug);
        
            if (!data) setProduct(null);
            else setProduct(data.data[0]);
        }


        fetchData((slug as string));
    }, [slug])

    if (!product) return (
        <Card className="w-[300px] h-[475] space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-[300px] rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="pt-8 h-[150px] flex flex-col justify-center align-center items-center gap-8">
                <Skeleton className="w-[80px] rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-[50px] rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-[250px] rounded-lg">  
                <div className="h-[50px] w-[250px] rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
    );

    return (
        <Card onClick={(e) => {
            e.preventDefault();
            window.open(`products/${slug}`)
        }}  className="bg-transparent w-[300px] h-[475px] relative">

            <div onClick={(e) => {
            e.preventDefault();
            window.open(`products/${slug}`)
        }} className="absolute top-0 left-0 z-1 w-full h-[350px] cursor-pointer">
            {
                product?.zdjecie? <StrapiImage src={product?.zdjecie.url} alt={product?.zdjecie.alternativeText || ''} width={300} height={300}/> : <></>
            }
            </div>
            <div className="z-10 w-full h-[225px] bg-success absolute bottom-0 left-0 rounded-b-[20px] rounded-t-[50px] drop-shadow-[0_-5px_12px_rgba(0,191,99,1)]">
                <div className="w-full h-full py-8 gap-4 flex flex-col justify-between align-center items-center">
                    <h4 onClick={(e) => {
                            e.preventDefault();
                            window.open(`products/${slug}`)
                        }}  
                        className="text-xl cursor-pointer"
                    >
                        {product?.tytul}
                    </h4>
                    <p onClick={(e) => {
                            e.preventDefault();
                            window.open(`products/${slug}`)
                        }} 
                        className="cursor-pointer"
                    >
                        {product?.cena} zł/kg
                    </p>
                    <div className="w-[250px] h-[50px] flex">
                        <Input 
                        radius="none"
                        classNames={{
                            // base: "cursor-pointer",
                            // mainWrapper: "min-h-full",
                            inputWrapper: [
                                "h-full",
                                "rounded-l-[10px]",
                                'bg-primary-100',
                            ],
                            // innerWrapper: "h-full"
                        }}
                        color="default" 
                        type="number" 
                          label="Ilość" 
                        placeholder={`. . .`}
                        defaultValue={String(productQuantity)}
                        min={1}
                        max={100}
                        value={String(productQuantity)}
                        onValueChange={(e) => {
                            if(Number(e) == null || Number(e) <= 0){
                                setProductQuantity(1);
                            } 
                            // else if(Number(e) > 100) {
                            //     setProductQuantity(100);
                            // }
                            setProductQuantity(Number(e))
                        }}
                        />
                        <Button 
                          className="w-[25px] h-full rounded-r-[10px] bg-primary-foreground text-primary" 
                          radius="none" 
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddProduct(`${slug}`);
                          }}
                        >
                            +
                        </Button>
                    </div>
                </div>
            </div>    

        </Card>
    )
}