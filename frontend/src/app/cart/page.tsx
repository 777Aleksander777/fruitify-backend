"use client";

import { stripePromise } from '@/lib/stripe';
import { useState, useEffect } from "react";
import { CartProps, getProductsFromLocalStorage, removeProduct } from "@/lib/localStorage";
import ProductCard from "@/components/product/card/product";
import { ProductProps } from "@/types/product";
import { getProductData } from "@/data/loader";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Pagination, Card} from "@nextui-org/react";


export default function Cart() {

  const [isPhoneStart, setIsPhoneStart] = useState<boolean>(true);
  const [isCityStart, setIsCityStart] = useState<boolean>(true);
  const [isPostalCodeStart, setIsPostalCodeStart] = useState<boolean>(true);
  const [isAddressStart, setIsAddressStart] = useState<boolean>(true);
  const [isBlikCodeStart, setIsBlikCodeStart] = useState<boolean>(true);
  const [cSecret, setCSecret] = useState<string | null>(null);
  const [blikCode, setBlikCode] = useState<string>('');

  const [products, setProducts] = useState<CartProps[]>([]);
  
  const [phone, setPhone] = useState<number>(0);
  const [miasto, setMiasto] = useState<string>("");
  const [kodPocztowy, setKodPocztowy] = useState<string>("");
  const [adres, setAdres] = useState<string>("");

  const [price, setPrice] = useState<number>(0);

  const [isPaying, setIsPaying] = useState<boolean>(false);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  useEffect(() => {
    setProducts(getProductsFromLocalStorage());
  }, []);

  const handleRemoveProduct = (productName: string) => {
    removeProduct(productName);
    setProducts(getProductsFromLocalStorage());
  };

  const handlePayment = async () => {

    try {
      const totalPrice = getProductsFromLocalStorage()?.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
      }, 0);
      setPrice(totalPrice);
      console.log(price);
      
      // const url = new URL('payment/intent', process.env.NEXT_PUBLIC_BACKEND_URL);

      const stripeIntend = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: totalPrice + 15,
        })
      })

      if(!stripeIntend.ok) {
        const error = await stripeIntend.json();
        setIsCityStart(true);
        setIsPostalCodeStart(true);
        setIsAddressStart(true);
        setIsBlikCodeStart(true);
        setIsPaying(false);
        throw new Error(error.message || 'Failed to create Stripe intent');
      }
      // setIsPaying(true);
      const { clientSecret } = await stripeIntend.json();
      console.log("##########################");
      console.log(clientSecret);
      console.log("##########################");
      setCSecret(clientSecret);
      // console.log(cSecret);
      // handelBlik();
    } catch (error) {
      setIsPhoneStart(true);
      setIsCityStart(true);
        setIsPostalCodeStart(true);
        setIsAddressStart(true);
        setIsBlikCodeStart(true);
      setIsPaying(false);
      console.error('Error: ', error);
    }
  };
  
  const handelBlik = async () => {
    
    // e.preventDefault();
    setIsPhoneStart(false);
    setIsCityStart(false);
    setIsPostalCodeStart(false);
    setIsAddressStart(false);
    setIsBlikCodeStart(false);
    
    if(!( miasto!="" && kodPocztowy!="" && adres!="" && blikCode!="")) {
      setIsPaying(false);
      // alert("Wypełnij formularz!")
      return null;
    }
    else if (!cSecret) {
      alert("Blik error");
      setIsCityStart(true);
      setIsPostalCodeStart(true);
      setIsAddressStart(true);
      setIsBlikCodeStart(true);
      setIsPaying(false);
      return null;
      };
      setIsPaying(true);
      
      const stripe = await stripePromise;
      // const { error } = await stripe!.confirmPayment({
        //   clientSecret,
        //   // payment_method: {
          //   //   blik: {}, // Stripe automatycznie obsłuży kod BLIK
          //   // },
          // });

      const { error } = await stripe!.confirmBlikPayment(cSecret, {
        payment_method: {
          blik: {},
          billing_details: {
            phone:`+48${phone}`
          }
        },
        payment_method_options: {
          blik: {
            code: blikCode,
          }
        },
        shipping: {
          address: {
            city: miasto,
            postal_code: kodPocztowy,
            country: 'Poland',
            line1: adres,
          },
          tracking_number: cSecret || "Tracking number null",
          name: 'Dostawa',
        },
        // receipt_email: 'aleksanderb787@gmail.com',
        // save_payment_method: true,
      })

      if (error) {
        console.error(error.message);
        setIsCityStart(true);
        setIsPostalCodeStart(true);
        setIsAddressStart(true);
        setIsBlikCodeStart(true);
        setIsPaying(false);
      } else {
        setIsPaying(false);
        setCSecret(null);
        setPrice(0);
        setIsCityStart(true);
        setIsPostalCodeStart(true);
        setIsAddressStart(true);
        setIsBlikCodeStart(true);
        removeProduct('all');
        // alert('Zapłacono!');
        window.location.reload();
      }
  };

    return (
      <div className="max-w-[1536px] w-full min-h-[100vh] h-max lg:px-8 mx-auto flex flex-nowrap lg:flex-row flex-col justify-between align-center items-start">
        <div
          className="w-full pt-24 flex flex-col justify-center align-center items-center gap-8"
        >
          <Button isDisabled={products.length == 0} className='mb-24 w-[250px] bg-primary-foreground text-primary' onPress={() => {
            onOpen(); 
            handlePayment(); 
            }} >Do kasy</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => {
            if(price < 50) {
              return(
                <>
                  <ModalHeader className="flex flex-col gap-1">Za mało produktów</ModalHeader>
                  <ModalBody className=''>
                    <div className='text-danger '>Minimalna kwota zamówienia musi wynosić 50 zł</div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </>
              )
            } else{
              return (<>
                <ModalHeader className="flex flex-col gap-1">Płatność BLIK</ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Telefon"
                    placeholder="Wpisz numer telefonu"
                    variant="bordered"
                    type='tel'
                    isRequired
                    isInvalid={!(phone != 0 || isPhoneStart)}
                    onValueChange={(e) => { setIsPhoneStart(false); console.log("Phone number: " + phone); setPhone(Number(e))}}
                    />
                  <Input
                    label="Miasto"
                    placeholder="Wpisz miasto"
                    type="text"
                    variant="bordered"
                    isRequired
                    isInvalid={!(miasto!="" || isCityStart)}
                    onValueChange={(e) => { setIsCityStart(false); setMiasto(e)}}
                    />
                  <Input
                    label="Kod Pocztowy"
                    placeholder='Wpisz kod pocztowy'
                    type='text'
                    variant='bordered'
                    isRequired
                    isInvalid={!(kodPocztowy!="" || isPostalCodeStart)}
                    onValueChange={(e) => {setIsPostalCodeStart(false); setKodPocztowy(e)}}
                    />
                  <Input
                    label="Adres dostawy"
                    placeholder='Wpisz adres dostawy'
                    type='text'
                    variant='bordered'
                    isRequired
                    isInvalid={!(adres!="" || isAddressStart)}
                    onValueChange={(e) => { setIsAddressStart(false); setAdres(e)}}
                    />
                  <Input
                    label="KOD BLIK"
                    placeholder='BLIK'
                    type='number'
                    variant='bordered'
                    isRequired
                    isInvalid={!(blikCode!="" || isBlikCodeStart)}
                    onValueChange={(e) => {setIsBlikCodeStart(false); setBlikCode(e)}}
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <p>Do zapłaty: {price} zł</p>
                    <p>Dostawa: 15 zł</p>
                    <p>Razem: {price + 15} zł</p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={() => { 
                    setIsPhoneStart(true);
                    setIsCityStart(true);
                    setIsPostalCodeStart(true);
                    setIsAddressStart(true);
                    setIsBlikCodeStart(true); 
                    setPrice(0); 
                    onClose(); 
                  }}>
                    Zrezugnuj
                  </Button>
                    <Button color="primary" type='submit' isLoading={isPaying} onClick={handelBlik}>
                      Zapłać
                    </Button>
                </ModalFooter>
              </>)
            }}
            }
        </ModalContent>
      </Modal>
      <div className='w-full flex lg:flex-row pb-8 flex-col justify-center align-center items-center gap-8'>
          {products.length > 0 ? products.map((product) => {
            return (<div key={product.name} className='felx flex-col justify-center align-center items-center gap-8 pb-4  '><ProductCard slug={product.name} quantity={product.quantity}/><div className='w-full flex justify-center align-center items-center'><Button className='my-4' color='danger' onClick={() => handleRemoveProduct(product.name)}>X</Button></div></div>)
          }): <h1>Brak produktów w koszyku ...</h1>}
      </div>
      {/* <div className="my-6 flex justify-center">
          <Pagination
            total={Math.ceil(products.length / PRODUCTS_PER_PAGE)}
            initialPage={1}
            onChange={(page) => setCurrentPage(page)}
          />
      </div> */}
      </div>
      </div>
    );
  }