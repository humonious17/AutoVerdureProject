import { db } from "@/pages/api/firebaseAdmin";
import Image from "next/image";

export async function getServerSideProps({ params }) {
  try {
    const docRef = await db.collection("blogs").doc(params.id).get();
    if (!docRef.exists) {
      return { notFound: true };
    }

    const blogData = { id: docRef.id, ...docRef.data() };
    return {
      props: { blog: blogData },
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return { notFound: true };
  }
}

export default function BlogPost({ blog }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      {blog.imageUrl && (
        <Image src={blog.imageUrl} alt={blog.title} width={800} height={400} />
      )}
      <p className="text-gray-600 text-sm mb-4">{blog.description}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}
