import { db } from "@/pages/api/firebaseAdmin";

export async function getServerSideProps({ params }) {
  const { productId } = params;

  try {
    const testimonialRef = db
      .collection("reviews")
      .where("productId", "==", productId);
    const testimonialSnapshot = await testimonialRef
      .orderBy("createdAt", "desc")
      .get();

    const testimonials = testimonialSnapshot.docs.map((doc) => ({
      id: doc.id,
      comment: doc.data().comment,
      createdAt: doc.data().createdAt,
      imageUrl: doc.data().imageUrl,
      orderId: doc.data().orderId,
      productId: doc.data().productId,
      productName: doc.data().productName,
      rating: doc.data().rating,
      userEmail: doc.data().userEmail,
      userName: doc.data().userName,
    }));

    return {
      props: {
        testimonials: testimonials.length > 0 ? testimonials : [],
      },
    };
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return {
      props: {
        testimonials: [],
      },
    };
  }
}
