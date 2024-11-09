import { db } from "@/pages/api/firebaseAdmin";

export default async function findAllOrders(email) {
  try {
    const ordersRef = db.collection("orders");
    const querySnapshot = await ordersRef
      .where("ordererEmail", "==", email)
      .get();

    if (querySnapshot.empty) {
      console.log("No matching orders.");
      return [];
    }

    const orders = [];

    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    console.log(orders);
    return orders;
  } catch (error) {
    console.log(error);
    return false;
  }
}
