import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartProvider } from "@/components/CartProvider";
export const metadata: Metadata = {
 title:{default:"ARVÉSHA CLOTHINGS | Considered Everyday Wear",template:"%s | ARVÉSHA CLOTHINGS"},
 description:"Shop considered clothing, versatile essentials and thoughtful everyday style at ARVÉSHA CLOTHINGS.",
 keywords:["ARVÉSHA CLOTHINGS","everyday clothing","minimal clothing","wardrobe essentials","clothing India"],
 openGraph:{title:"ARVÉSHA CLOTHINGS",description:"Considered clothing for everyday wear.",type:"website",siteName:"ARVÉSHA CLOTHINGS"},
 metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body><CartProvider><SiteHeader/><main>{children}</main><SiteFooter/></CartProvider></body></html>;
}
