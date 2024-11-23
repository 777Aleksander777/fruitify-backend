import { Button, Link } from "@nextui-org/react";
// import { Button, Link } from "../../node_modules/@nextui-org/react/dist/index";


export default async function NotFound() {

    return (
      <section className="max-w-[1536px] w-full min-h-screen px-8 mb-16 mx-auto flex flex-wrap flex-col justify-center align-center items-center gap-8">
          <h1>Pracujemy nad tym aby powstało tu coś pięknego.</h1>
          <Button color="primary" as={Link} href="/">Strona główna</Button>
      </section>
    );
  }