import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";
export default async function Home() {
  return (
   <>
    <ProductList title="Newest Arrivals" data={sampleData.products} limit={4} />
   </>
  );
}
