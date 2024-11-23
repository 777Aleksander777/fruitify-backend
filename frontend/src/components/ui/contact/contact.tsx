"use client"

import { Button, Input, Textarea, Card } from "@nextui-org/react";
import { useState } from "react";


export default function Contact() {

    const [title, setTitle] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handelSendMail = async (email: string, title: string, message: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/sendMail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                title: title,
                message:message,
            })
        });

        if(!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create Stripe intent');
        } else{
            console.log('Mail is send!');
        }
    }

    return (
        <div className="max-w-[1536px] lg:px-8 mb-32 mx-auto flex flex-wrap flex-col justify-center align-center items-start gap-8">
            <Card 
              className="w-full h-full py-24"
            >
            <h1 className="w-full text-center mb-8">Kontakt</h1>
            <form 
              className="w-full flex flex-col justify-center align-center items-center gap-8"
              onSubmit={() => handelSendMail(email, title, message)}>

                <Input
                    classNames={{base: ["lg:w-[350px] w-[250px]"], inputWrapper: ["border-success", "data-[hover=true]:border-success-700"]}}
                    color="success"
                    type="email"
                    placeholder="email"
                    variant="underlined"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <Input
                    classNames={{base: ["lg:w-[350px] w-[250px]"], inputWrapper: ["border-success", "data-[hover=true]:border-success-700"]}}
                    color="success"
                    type="text"
                    placeholder="Tytuł"
                    variant="underlined"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                <Textarea
                    classNames={{base: ["lg:w-[350px] w-[250px] mt-8"], inputWrapper: ["border-success", "data-[hover=true]:border-success-700"]}}
                    color="success"
                    type="text"
                    placeholder="Wiadomość"
                    variant="bordered"
                    onChange={(e) => setMessage(e.target.value)}
                    />
                <Button className="w-[250px] bg-primary-foreground text-primary" type="submit">Wyślij</Button>
            </form>
            </Card>
        </div>
    )
}