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

    if (querySnapshot.empty) {
      console.log("No matching orders.");
      return [];
    }

    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.().toISOString() ||
        new Date().toISOString(),
    }));

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Propagate error to handle it in the component
  }
}
