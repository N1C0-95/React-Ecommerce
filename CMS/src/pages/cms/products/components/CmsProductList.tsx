import clsx from "clsx";
import { Product } from "../../../../model/product";

interface ProductListProp{
    items:Product[];
    activeItem:Partial<Product> | null;
    onEditItem:(product:Partial<Product>) => void;
    onDeleteItem:(id:string)=>void
}

export function CmsProductsList(props:ProductListProp){
    
    return (
        <div>
        <table className="table-auto w-full hover mt-10">
          <thead>
            <tr>
              <th>PRODUCTS</th>
              <th>IMAGE</th>
              <th>COST</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {props.items.map((item) => {
              return(
                <tr className={clsx("text-center","cursor-pointer",
                {'bg-sky-200 text-black pointer-events-none':item.id === props.activeItem?.id}
                )} 
                key={item.id} onClick={() => {                    
                    props.onEditItem(item) // viene sempre invocata setActiveItem visto che abbiamo passato una reference di questa funzione
                }} >
                    <td>{item.name}</td>
                    <td className="flex justify-center"><img src={item.img} alt={item.name} /></td>
                    <td >{item.cost} €</td>
                    <td>
                        <i className="fa fa-trash" onClick={(e) =>{
                            
                            e.stopPropagation();
                            props.onDeleteItem(item.id);
                        }}></i>
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
        
    )
}