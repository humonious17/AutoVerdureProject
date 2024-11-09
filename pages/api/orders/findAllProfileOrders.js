import { db } from "@/pages/api/firebaseAdmin";

export default async function findAllProfileOrders(email = null) {
  try {
    const ordersRef = db.collection("orders");
    let querySnapshot;

    if (email) {
      querySnapshot = await ordersRef.where("email", "==", email).get();
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

      // Serialize all possible timestamp fields
      const serializedData = {
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || null,
        updatedAt: data.updatedAt?.toDate().toISOString() || null,
        orderTime: data.orderTime?.toDate().toISOString() || null,
        // Handle statusHistory array if it exists
        statusHistory:
          data.statusHistory?.map((status) => ({
            ...status,
            timestamp: status.timestamp?.toDate().toISOString() || null,
          })) || [],
        // Handle any other nested timestamp fields in the order
        shipping: {
          ...data.shipping,
          deliveryDate:
            data.shipping?.deliveryDate?.toDate().toISOString() || null,
        },
      };

      orders.push(serializedData);
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
