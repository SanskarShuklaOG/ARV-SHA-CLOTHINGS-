'use client';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {products} from '@/lib/products';
type Line={id:string;qty:number};type CartContextType={items:Line[];add:(id:string)=>void;remove:(id:string)=>void;setQty:(id:string,qty:number)=>void;clear:()=>void};
const C=createContext<CartContextType|null>(null);
function validCart(value:unknown):Line[]{if(!Array.isArray(value))return [];return value.filter((x):x is Line=>!!x&&typeof x==='object'&&'id'in x&&'qty'in x&&typeof x.id==='string'&&products.some(p=>p.id===x.id)&&Number.isInteger(x.qty)&&x.qty>0&&x.qty<=10).slice(0,100)}
export function CartProvider({children}:{children:React.ReactNode}){const [items,setItems]=useState<Line[]>([]);const [loaded,setLoaded]=useState(false);
useEffect(()=>{try{const saved=localStorage.getItem('arvesha-cart-v1');if(saved)setItems(validCart(JSON.parse(saved)))}catch{try{localStorage.removeItem('arvesha-cart-v1')}catch{}}finally{setLoaded(true)}},[]);
useEffect(()=>{if(!loaded)return;try{localStorage.setItem('arvesha-cart-v1',JSON.stringify(items))}catch{}},[items,loaded]);
const value=useMemo(()=>({items,add:(id:string)=>{if(!products.some(p=>p.id===id))return;setItems(old=>{const found=old.find(x=>x.id===id);return found?old.map(x=>x.id===id?{...x,qty:Math.min(10,x.qty+1)}:x):[...old,{id,qty:1}]})},remove:(id:string)=>setItems(old=>old.filter(x=>x.id!==id)),setQty:(id:string,qty:number)=>setItems(old=>qty<=0?old.filter(x=>x.id!==id):old.map(x=>x.id===id?{...x,qty:Math.max(1,Math.min(10,Math.floor(qty)))}:x)),clear:()=>setItems([])}),[items]);
return <C.Provider value={value}>{children}</C.Provider>}
export function useCart(){const c=useContext(C);if(!c)throw new Error('CartProvider is missing');return c}
