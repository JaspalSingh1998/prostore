"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { approvePayPalOrder, createPayPalOrder } from "@/lib/actions/order.actions";
import { useToast } from "@/hooks/use-toast";

const OrderDetailsTable = ({ order, paypalCLientId }: { order: Order, paypalCLientId: string }) => {
  const {
    id,
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
  } = order;
  const {toast} = useToast();
  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = ''

    if (isPending) {
      status = 'Loading PayPal....'
    } else if (isRejected) {
      status = 'Error Loading PayPal'
    } 

    return status;
  };


  const handleCreatePayPalOrder = async () => {
    try {
      const res =await createPayPalOrder(order.id);
      if(!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
        return;
      }

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprovePayPalOrder = async (data: {orderID: string}) => {
    try {
      const res = await approvePayPalOrder(order.id, data);
      toast({
        variant: res.success ? 'default' : 'destructive',
        description: res.message,
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p className="mb-2">{paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  PAID AT {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not paid</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p className="mb-2">
                {" "}
                {shippingAddress.streetAddress}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}{" "}
              </p>
              {isDelivered ? (
                <Badge variant="secondary">
                  PAID AT {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">NOT Delivered</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
                <h2 className="text-xl pb-4">Order Items</h2>
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderitems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/products/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.qty}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-right">${item.price}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
            <Card>
                <CardContent className="p-4 gap-4 space-y-4">
                    <div className="flex justify-between">
                        <div>Items</div>
                        <div>{formatCurrency(itemsPrice)}</div>
                    </div>
                    <div className="flex justify-between">
                        <div>Tax</div>
                        <div>{formatCurrency(taxPrice)}</div>
                    </div>
                    <div className="flex justify-between">
                        <div>Shipping</div>
                        <div>{formatCurrency(shippingPrice)}</div>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <div>Total</div>
                        <div>{formatCurrency(totalPrice)}</div>
                    </div>
                    {/* PayPal Payment */}
                    {!isPaid && paymentMethod === "PayPal" && (
                        <PayPalScriptProvider options={{ clientId: paypalCLientId }}>
                            <PrintLoadingState />
                            <PayPalButtons createOrder={handleCreatePayPalOrder} onApprove={handleApprovePayPalOrder}/>
                        </PayPalScriptProvider>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
