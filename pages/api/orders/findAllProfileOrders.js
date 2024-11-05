import { db } from "@/pages/api/firebaseAdmin";

export default async function findAllProfileOrders(email = null) {
  try {
    const ordersRef = db.collection("orders");
    let querySnapshot;

    // If email is provided, filter by ordererEmail, not email
    if (email) {
      querySnapshot = await ordersRef.where("ordererEmail", "==", email).get();
    } else {
      querySnapshot = await ordersRef.orderBy("orderTime", "desc").get();
    }

    if (querySnapshot.empty) {
      console.log("No matching orders.");
      return [];
    }

    const orders = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        ...data,
      });
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
