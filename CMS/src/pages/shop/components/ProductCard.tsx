import { Product } from "../../../model/product";

interface ProductCardProps{    
    product:Partial<Product>;
    onAddToCart : (product:Partial<Product>) => void;

}
export function ProductCard(props:ProductCardProps){
  const {product:p} = props
    return(
        <div className="h-80 w-full flex mt-10 border-2 border-slate-200 rounded-xl overflow-hidden hover:scale-105 transition hover:rotate-2">
              {p.img && <img
                className="object-cover"
                src={p.img}
                alt=""
              />}
              <div className="flex flex-col items-center justify-center m-auto">
                <div className="text-3xl">{p.name} </div>
                <p className="p-3">{p.description}</p>                
                <button className="btn primary w-full" onClick={() => props.onAddToCart(p)}>ADD TO CART</button>
              </div>              
            </div>         
    )
}