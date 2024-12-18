"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Spinner, Input } from "@nextui-org/react";
import { getProductData } from "../../../data/loader";
import { ProductProps } from '../../../types/product';
import { StrapiImage } from '../../../components/ui/strapi-image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import UserMessage from "@/components/userMessage";
import { addOrUpdateProduct, getProductsFromLocalStorage } from "../../../lib/localStorage";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

export default function Product() {
    const { slug } = useParams();

    const [addProduct, setAddProduct] = useState<boolean>(false);

    const [productData, setProductData] = useState<ProductProps | null | 'cannot find'>(null);
    const [quantity, setQuantity] = useState(1);

    const handleAddProduct = (name: string) => {
      if (!name.trim() || quantity <= 0 || productData === 'cannot find' || productData === null) return;
      addOrUpdateProduct(name, quantity, productData.cena);
      console.dir( getProductsFromLocalStorage(), { depth: null })
      setAddProduct(true);
    };

    function renderModal(productTitle: string) {
      return <UserMessage title="Dodano do koszyka!" text={`Produkt: ${productTitle} został dodany do koszyka w ilości: ${quantity}`}/>
    }

    

    useEffect(() => {
        const fetchData = async (slug: string) => {
            const data = await getProductData(slug);
        
            if (!data) setProductData('cannot find');
            else setProductData(data.data[0]);
        }


        fetchData((slug as string));
    }, [slug])
    
    if (!productData) return (
      <section className="max-w-[1536px] w-full min-h-screen px-8 mb-16 mx-auto flex flex-wrap flex-col justify-center align-center items-center gap-8">
        <Spinner size="lg"/>
      </section>
    );
    else if(productData === 'cannot find') return <div className="text-danger">Nie można znaleźć produktu!</div>


    return (
        <div className='max-w-[1536px] w-full md:min-h-screen h-auto lg:px-8 mx-auto flex flex-nowrap md:flex-row flex-col justify-between align-center items-start'>
            
            {/* <form onSubmit={handelBlik}>
                <Input 
                    color='primary'
                    type='number'
                    label='Kod BLIK'
                    placeholder='123456'
                    onChange={(e) => {
                        setBlikCode(String(e.target.value));
                    }}
                />
                <Button type='submit' onClick={handlePayment}>{'Zapłać teraz'}</Button>
            </form> */}
            <div className='md:w-[50%] w-[100%] md:h-screen h-[500px]  flex '>
              <StrapiImage src={productData.zdjecie.url} alt={productData.zdjecie.alternativeText} height={500} width={500}/>
            </div>
            <div className='md:w-[50%] w-[100%] md:h-screen h-auto px-8 gap-8 py-8 lg:shadow-[-20px_0_20px_rgba(0,0,0,0.2)] shadow-[0px_-20px_20px_rgba(0,0,0,0.2)] flex flex-col justify-center align-start items-start'>
              <div>
                <h1>{productData.tytul}</h1>
                <p className='text-success'>
                  Cena: {productData.cena} zł/{productData.jednostka}
                </p>
              </div>
              {/* <p>{description}</p> */}
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {productData.opis}
              </ReactMarkdown>
              <div className="w-[250px] h-[50px] flex lg:mt-6 mx-auto lg:mx-0">
                <Input 
                  radius="none"
                  classNames={{
                  // base: [
                    
                  // ],
                  // mainWrapper: [
                  // ],
                  inputWrapper: [
                    "h-full",
                    "rounded-l-[10px]",
                    'bg-success-100',
                    'text-primary-foreground',
                    'data-[hover=true]:bg-success-200',
                    'group-data-[focus=true]:bg-success-200',
                  ],
                  innerWrapper: [
                    'focus:bg-success-100',
                  ],
                  label: [
                    'text-primary-foreground'
                  ]
                  }}
                  color="primary" 
                  type="number" 
                  label="Ilość" 
                  placeholder={`. . .`}
                  defaultValue="1"
                  // onClick={(e) => {e.preventDefault(); e.stopPropagation()}}
                  // onFocusChange={(focus) => {console.log("Is editing: " + focus); setIsEditing(focus)}}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  onClick={(e) => {setAddProduct(false); e.preventDefault(); e.stopPropagation()}}
                  onFocusChange={(focus) => setAddProduct(false)}
                />
                {/* <Button 
                  className="w-[25px] h-full rounded-r-[10px] bg-primary-foreground text-primary" 
                  radius="none" 
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddProduct(`${productData.slug}`);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // window.location.href='/cart'
                    handleAddProduct(`${productData.slug}`);
                  }}
                  //   variant="ghost"
                >
                  +
                </Button> */}
                <Button 
                  className="w-[25px] h-[50px] px-2 rounded-r-[10px] bg-primary-foreground text-primary" 
                  radius="none" 
                  onTouchEnd={(e) => {
                //   setAddProduct(false);
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddProduct(`${productData.slug}`);
                    //   <UserMessage title="Dodano do koszyka!" text={`Produkt: ${product.tytul} został dodany do koszyka w ilości: ${productQuantity}`}/>
                  }}
                  onClick={(e) => {
                  // setAddProduct(false);
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddProduct(`${productData.slug}`);
                    // <UserMessage title="Dodano do koszyka!" text={`Produkt: ${product.tytul} został dodany do koszyka w ilości: ${productQuantity}`}/>
                  }}
                  >
                    <div className="w-full h-full m-autoflex flex-col justofu-center align-center items-center">
                      <p className="text-center">Do</p>
                      <p className="text-center">koszyka</p>
                    </div>
                </Button>
                {addProduct?  renderModal(productData.tytul) : null}
              </div>
            </div>
        </div>
    )
}