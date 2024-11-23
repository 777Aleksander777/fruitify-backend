import { Spinner } from "@nextui-org/react";
// import { Spinner } from "../../node_modules/@nextui-org/react/dist/index";


export default async function Lodaing() {

    return (
      <section className="max-w-[1536px] w-full min-h-screen px-8 mb-16 mx-auto flex flex-wrap flex-col justify-center align-center items-center gap-8">
        <Spinner size="lg"/>
      </section>
    );
  }