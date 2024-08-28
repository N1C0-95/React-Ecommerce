import { Product } from "../../model/product";
import { useEffect, useState } from "react";
import { pb } from "../../pocketbase";
import { ProductCard } from "./components/ProductCard";
import { ServerError, Spinner } from "../../shared";
import { useCart, useCartPanel } from "../../services/cart";
import { useProductsService } from "../../services/products";
import { Card } from "./components/Card";


export function ShopPage() {

  // const [products, setProducts] = useState<Product[]>([]);
  // const [pending, setPending] = useState<boolean>(false)
  // const [error, setError] = useState<boolean>(false) gli stati locali sono stati rimossi perchè è stato refattorizzato il codice utilizzando l'hook di productService


  const openCartPanel = useCartPanel().openOverlay;
  const addProductToCart =  useCart().addToCart;
  
  const {actions, state} = useProductsService()
  useEffect(() => {    
    actions.getProducts()
    //loadData();    
  }, []);

  const loadData = () => {
    // questa chiamata è stata commentata perchè è stato utilizzato useReducer
    // setError(false)
    // setPending(true)
    // pb.collection("products")
    //   .getList<Product>()
    //   .then((res) => {setProducts(res.items)})
    //   .catch((e) => {setError(true)})
    //   .finally(() => setPending(false))
      
    
    
  };

  // function addToCart(product:Partial<Product>){
  //   console.log("invoke add to cart");
  //   openCartPanel();
  //   addProductToCart(product)
    
  // }



  return (
    <div>
      <h1 className="title">Shop</h1>
      
      
      {state.pending && <Spinner/>}
      {state.error && <ServerError/>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 m-auto">
        {state.products.map((p) => {
          return (
            <li key={p.id}>
            <Card  
              product={p}
              onAddToCart={() => {
                openCartPanel();
                addProductToCart(p)
              }}
            />              
            </li>
          );
        })}
      </div>
    </div>
  );
}
