import ProductDetail from "../_components/ProductDetail";
import businessesAction from "@/services/axios/actions/businesses.action";
import productAction from "@/services/axios/actions/product.endpoint";
import { notFound } from "next/navigation";
import ProductViewTracker from "@/components/product/ProductViewTracker";

async function getProduct(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await productAction.getById(id);
  if (!res) {
    notFound();
  }

  return res;
}

async function getBusiness(businessId: string) {
  const res = await businessesAction.getById(businessId);

  return res;
}

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const product = await getProduct(params.id);
  const business = await getBusiness(product.businessesId);

  return (
    <>
      <ProductViewTracker productId={params.id} />
      <ProductDetail product={product} business={business} />
    </>
  );
};

export default page;
