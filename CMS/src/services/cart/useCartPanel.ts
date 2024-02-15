import { create } from "zustand";

export interface CartStateOverlay {
    open: boolean;
    toogle:()=>void;
    openOverlay : () => void;
    closeOverlay : () => void;
}
export const useCartPanel = create<CartStateOverlay>((set, get) => ({
    open:false,
    toogle : () => set({open: !get().open }),
    openOverlay: () => set({open : true}),
    closeOverlay : () => set({open:false})
}))