import { auth } from "@/auth";
import { getAllOrders } from "@/lib/actions/order.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Orders",
};
const Orders = async (props: { searchParams: Promise<{ page: string }> }) => {
  const { page = "1" } = await props.searchParams;
  const session = await auth();

  if (session?.user?.role !== "admin")
    throw new Error("User is not authorized");

  const orders = await getAllOrders({
    page: Number(page),
  });

  console.log(orders);

  return <div>Orders</div>;
};

export default Orders;
