"use client";

import ProductCard from "../../components/product/card/product";
import { getProducts } from "../../data/loader";
import { useEffect, useState } from "react";
import { Input, Pagination, Select, SelectItem, Spinner } from "@nextui-org/react";

const PRODUCTS_PER_PAGE = 24;

export default function Products() {
  const categories = [
    { key: "WSZYSTKO", label: "Wszystko" },
    { key: "OWOCE", label: "Owoce" },
    { key: "WARZYWA", label: "Warzywa" },
  ];

  type Category = "WSZYSTKO" | "OWOCE" | "WARZYWA";

  const [allProducts, setAllProducts] = useState<[] | null>(null); // Pełna lista produktów
  const [products, setProducts] = useState<[] | null>(null); // Przefiltrowana lista
  const [category, setCategory] = useState<Category>("WSZYSTKO");
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  let currentProducts = products?.slice(startIndex, endIndex);

  const handleSearch = (name: string) => {
    if (!name) {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts?.filter((product: any) =>
      product.tytul.toLowerCase().startsWith(name)
    );

    setProducts((filtered as []) || []);
  };

  useEffect(() => {
    const fetchData = async (category: Category) => {
      const res = await getProducts(category);
      setAllProducts(res.data);
      setProducts(res.data);
    };
    fetchData(category);
  }, [category]);

  if (!products) return (
    <section className="max-w-[1536px] w-full min-h-screen px-8 mb-16 mx-auto flex flex-wrap flex-col justify-center align-center items-center gap-8">
        <Spinner size="lg"/>
    </section>
  );

  return (
    <section>
      <div className="max-w-[1536px] w-full px-6 my-12 mx-auto gap-4 flex flex-wrap-reverse justify-center align-center items-center">
        <Select
          label="Kategorie"
          placeholder="Wybierz kategorie"
          classNames={{ base: ["max-w-sm"] }}
          // color="primary"
          variant="underlined"
          selectedKeys={[category]}
          onChange={(e) => {
            if (e.target.value !== "") {
              setCategory(e.target.value as Category);
            }
          }}
        >
          {categories.map((c) => (
            <SelectItem className="" key={c.key}>
              {c.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          classNames={{ base: ["max-w-lg"], label: ["text-primary-foreground"] }}
          color="default"
          label="Szukaj ..."
          type="text"
          variant="bordered"
          onChange={(e) => handleSearch(e.target.value.toLowerCase())}
          isClearable
          onClear={() => handleSearch("")}
        />
      </div>
      <section className="max-w-[1536px] w-full min-h-screen px-8 mt-8 mx-auto flex flex-wrap flex-row justify-center align-center items-start gap-8">
        {currentProducts?.map((product: any) => (
          <ProductCard key={product.slug} quantity={1} slug={product.slug} />
        ))}
      </section>
      <div className="my-6 flex justify-center">
        <Pagination
          classNames={{ cursor: ["bg-success",], item: ["bg-primary-foreground", "text-primary", "[&[data-hover=true]:not([data-active=true])]:bg-primary-400"]}}
          total={Math.ceil(products.length / PRODUCTS_PER_PAGE)}
          initialPage={1}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
}
