"use client"

import { QAProps } from "../../../types/qA"
import { Accordion, AccordionItem } from "@nextui-org/react"


export default function QuestionsAndAnswes({ data }: { readonly data: QAProps}) {

    const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";


    return (
      <div className="max-w-[1536px] w-full mx-auto lg:px-8">
        <h1 className="text-center my-8">{data.nazwa}</h1>
        <Accordion variant="splitted"  className=" w-full mb-16 ">
          {data.pytaniaIOdpowiedzi.map((el) => (
            <AccordionItem key={el.id} aria-label={el.pytanie} title={el.pytanie}>
              {el.odpowiedz}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
        // <></>
    )
}