export type Product={id:string;name:string;category:string;price:number;description:string;image:string;badge?:string};
export const products:Product[]=[
{id:"av-001",name:"Everyday Linen Shirt",category:"Clothing / Shirts",price:1899,description:"A relaxed, breathable shirt designed for repeat wear. Easy to style across seasons.",image:"/products/linen-shirt.jpg",badge:"New"},
{id:"av-002",name:"Structured Cotton Tee",category:"Clothing / T-shirts",price:899,description:"A clean-cut cotton tee with a considered fit and a soft hand-feel.",image:"/products/cotton-tee.jpg"},
{id:"av-003",name:"Relaxed Straight Trousers",category:"Clothing / Trousers",price:2199,description:"A versatile straight-leg silhouette for everyday movement.",image:"/products/trousers.jpg"},
{id:"av-004",name:"Essential Overshirt",category:"Clothing / Shirts",price:2499,description:"A lightweight layering piece with understated detailing.",image:"/products/overshirt.jpg"}
];
