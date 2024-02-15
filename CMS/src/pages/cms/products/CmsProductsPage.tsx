/*
ogni volta che viene invocata la funzione dispatch il reducer viene processato , ricevendo lo stato attuale più l'azione corrente.
il vantaggio di utilizzare usereducer è quello di modificare più azioni del nostro stato

*/

import { useEffect } from "react";
import { ServerError, Spinner } from "../../../shared";
import { useProductsService } from "../../../services/products";
import { CmsProductsList } from "./components/CmsProductList";
import { CmsProductForm, initialFormState } from "./components/CmsProductForm";

export function CmsProductsPage() {
  const { actions, state } = useProductsService();

  useEffect(() => {
    console.log("monto il componente ");
    actions.getProducts();
  }, []);

  actions.setActiveItem;
  console.log("rivaluto il template", state);

  return (
    <div>
      <h1 className="title">Product</h1>

      {state.pending && <Spinner />}
      {state.error && <ServerError message={state.error} />}

      <CmsProductForm activeItem={state.activeItem}
       onCloseForm={actions.resetActiveItem}
       onAdd={(item) => actions.addProduct(item)}
       onEdit={(item) => actions.editProduct(item)}
       />

      <CmsProductsList 
        items={state.products}
        activeItem={state.activeItem}
        onEditItem={actions.setActiveItem} //callback
        onDeleteItem={actions.deleteProduct} //callback
     />

      <button className="btn primary"
        onClick={() => actions.setActiveItem(initialFormState)}
        disabled ={state.activeItem != null}
      >
        Add New
      </button>

      {/*<pre>{JSON.stringify(state, null, 2)}</pre>*/}
    </div>
  );
}
