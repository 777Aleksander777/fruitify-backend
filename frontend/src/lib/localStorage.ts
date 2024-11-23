
export interface CartProps {
    name: string;
    quantity: number;
    price: number;
}
  
export const getProductsFromLocalStorage = (): CartProps[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("products") || "[]");
};
  
const saveProductsToLocalStorage = (products: CartProps[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("products", JSON.stringify(products));
};
  
export const addOrUpdateProduct = (name: string, quantity: number, price: number): void => {
    if (typeof window === "undefined") return;
  
    const products = getProductsFromLocalStorage();
    const productIndex = products.findIndex((product) => product.name === name);
  
    if (productIndex !== -1) {
      // Jeśli produkt istnieje, zaktualizuj jego ilość
      products[productIndex].quantity = quantity;
      products[productIndex].price = price;
    } else {
      // Jeśli produkt nie istnieje, dodaj nowy
      products.push({ name, quantity, price });
    }
  
    saveProductsToLocalStorage(products);
};
  
export const removeProduct = (name: string): void => {
    if (typeof window === "undefined") return;
    if(name==='all'){
        localStorage.removeItem("products");       
    }
    else {
        const products = getProductsFromLocalStorage();
        const updatedProducts = products.filter((product) => product.name !== name);
        saveProductsToLocalStorage(updatedProducts);
    }
  
};  