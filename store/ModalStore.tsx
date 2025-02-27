import {create} from 'zustand'

interface ModalState {
    isOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
}


export const useModalStore = create<ModalState>((set)=>({
    isOpen: false,
    closeModal: ()=> set({isOpen: true}),
    openModal: ()=> set({isOpen: false}),
}))