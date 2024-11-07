import { db } from "@/pages/api/firebaseAdmin";

export default async function findAllOrders(email = null) {
  try {
    const ordersRef = db.collection("orders");
    let querySnapshot;

    if (email) {
      querySnapshot = await ordersRef
        .where("email", "==", email)
        .orderBy("createdAt", "desc")
        .get();
    } else {
      querySnapshot = await ordersRef.orderBy("createdAt", "desc").get();
    }

    const orders = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt?.toDate?.().toISOString() || new Date().toISOString(),
      };
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
