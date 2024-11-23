import { getHomePage } from "@/data/loader";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { HeroVideo } from '@/components/ui/hero/HeroVideo';
import { BestProducts } from '@/components/ui/bestProducts/bestProducts';
import Image from "next/image";
import QuestionsAndAnswes from "@/components/ui/qA/qA";
import Contact from "@/components/ui/contact/contact";


const blockComponents = {
  "elements.video": HeroVideo,
  "layout.promowane": BestProducts,
  "layout.pytania": QuestionsAndAnswes,
};

function blockRenderer(block: any) {
  const Component = blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block?.nazwa} data={block} /> : null;
}

export default async function Home() {

  const strapiData = await getHomePage();

  // console.dir(strapiData.data, { depth: null});

  const { title, description, blocks } = strapiData.data; 
  if (!blocks) return <p>No data found!</p>;

  return (
    <main className="h-full">
      {/* <Button color="primary">{title}</Button> */}
      {blocks?.map(blockRenderer)}
      <Contact/>
    </main>
  );
}
