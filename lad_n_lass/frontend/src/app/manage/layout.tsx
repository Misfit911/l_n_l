import type { Metadata } from "next";
import "../shop/shop.css";

export const metadata: Metadata = {
  title: "Catalog",
};

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
