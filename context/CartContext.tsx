import React, { createContext, useCallback, useMemo, useState } from "react";

export type Produto = {
  id: string;
  nome: string;
  preco: number;
};

type CartItem = Produto & { quantidade: number };

type CartContextType = {
  carrinho: CartItem[];
  produtos: Produto[];
  addToCart: (produto: Produto) => void;
  total: number;
};

export const CartContext = createContext({} as CartContextType);

export const produtos: Produto[] = [
  { id: "1", nome: "Notebook", preco: 3000 },
  { id: "2", nome: "Mouse", preco: 100 },
  { id: "3", nome: "Teclado", preco: 200 },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);

  const addToCart = useCallback((produto: Produto) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }, []);

  const total = useMemo(() => {
    return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }, [carrinho]);

  return (
    <CartContext.Provider value={{ carrinho, produtos, addToCart, total }}>
      {children}
    </CartContext.Provider>
  );
}