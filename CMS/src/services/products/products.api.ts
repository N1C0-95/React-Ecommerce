import { Product } from "../../model/product";
import { pb } from "../../pocketbase";

export function get(){
    return pb.collection('products').getList<Product>()
}

export function remove(id:string){
    return pb.collection('products').delete(id);
}

/*
    partial permette di passare un prodotto che non ha tutti i campi. questo perchè nel modello prodotto è stato salvato tutte le proprietà ma chiaramente
    quando andiamo in creazione questo non sarà vero. tutti i campi diventeranno opzionali quindi ogni proprietà potrebbe essere undefined
*/
export function add(product:Partial<Product>){
    return pb.collection('products').create<Product>(product); // impostare qui il generic con Product indichiamo che quello che otterremo è un prodotto completo
}

export function edit(product:Partial<Product>){
    return pb.collection('products').update<Product>(product.id!, product);
    /* qui abbiamo usato il non-null assertion operato (!) per consentire di rimuove il null e undefined senza nessun controllo di guardia */
}