import clsx from "clsx";
import { Product } from "../../../../model/product";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface ProductFormProps {
  activeItem: Partial<Product> | null;
  onCloseForm: () => void;
  onAdd : (product:Partial<Product>) => void;
  onEdit : (product:Partial<Product>) => void;
}

export const initialFormState: Partial<Product> = {
  name: "",
  cost: 0,
  description: "",
};

export function CmsProductForm(props: ProductFormProps) {

  const [formData, setFormData] = useState(initialFormState);
  const [dirty, setDirty] = useState<boolean>(false);

  const isNameValid = formData.name?.length;
  const isCostValid = formData.cost && formData.cost >0;
  const isDescriptionValid = formData.description?.length;

  const isValid = isNameValid && isCostValid && isDescriptionValid;

  

  useEffect(() => {
    console.log("effect",props.activeItem)
    if(props.activeItem){
      setFormData({...props.activeItem})
    }
    else{
      setFormData(initialFormState)
    }

  },[props.activeItem])

  function changeHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    console.log(name)
    setFormData((s) => ({ ...s, [name]:value }));
    setDirty(true)
  }

  function saveHandler(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(formData.id){
      //stiamo modificando
      props.onEdit(formData)
    }
    else{
      //stiamo creando un nuovo prodotto
      props.onAdd(formData)
    }
    console.log(formData)
  }
  return (
    <div
      className={clsx(
        "fixed top-0 z-10 w-96 bg-slate-200 border h-full transition-all overflow-auto",
        { "right-0": props.activeItem },
        { "-right-96": !props.activeItem }
      )}
    >
      <div>
        <form onSubmit={saveHandler} className="p-10">
          <button
            className="h-10 text-white w-1/2 bg-green-500 hover:bg-green-600 disabled:opacity-30"
            disabled={!isValid}
            type="submit"
          >
            SAVE
          </button>
          <button
            className="h-10 text-white w-1/2 bg-slate-500 hover:bg-slate-600"
            onClick={props.onCloseForm}
            type="button"
          >
            CLOSE
          </button>
          <div className="flex flex-col gap-2">
          Product Name:
          <input
            type="text"
            name="name"
            className={clsx({ error: !isNameValid && dirty })}
            value={formData.name}
            onChange={changeHandler}
          />
          Product Cost
          <input type="number" 
            name="cost" 
            className={clsx({ error: !isCostValid && dirty })}
            value={formData.cost} 
            onChange={changeHandler}
          />
          Description
          <textarea name="description"
            className={clsx({error: !isDescriptionValid && dirty})}
            value={formData.description}
            onChange={changeHandler}
          />
          
          </div>
          
        </form>
      </div>

      {<pre>{JSON.stringify(props.activeItem?.name, null, 2)}</pre>}
    </div>
  );
}
