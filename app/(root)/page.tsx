import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/products.actions";
export default async function Home() {
  const latestProducts = await getLatestProducts();
  return (
   <>
    <ProductList title="Newest Arrivals" data={latestProducts} limit={4} />
   </>
  );
}
