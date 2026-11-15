import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";
import "./shop.css";

const canonical = `${SITE_URL}/shop`;
const title = "Lad & Lass";
const description =
  "Thoughtful pieces, made with feeling. Everyday clothes from Lad & Lass in Nairobi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  icons: {
    icon: [
      { url: "/lad_n_lass_logo.png", type: "image/png", sizes: "32x32" },
      { url: "/lad_n_lass_logo.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/lad_n_lass_logo.png",
    shortcut: "/lad_n_lass_logo.png",
  },
  openGraph: {
    type: "website",
    url: canonical,
    title,
    description,
    siteName: "Lad & Lass",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
