import { db } from "@/pages/api/firebaseAdmin";
import Image from "next/image";
import Contact from "@/app/ui/Contact";
import RelatedBlog from "@/app/ui/RelatedBlog";

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
    <>
      <div className="container mx-auto p-6 mt-14 max-w-2xl">
        <div className="text-center mb-8">
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs uppercase tracking-wide">
            Green Living
          </span>
          <h1
            className="font-urbanist text-[64px] font-normal leading-[76.8px] tracking-[-0.025em] text-center mt-4 mb-2"
            style={{ fontFamily: "Urbanist" }}
          >
            {blog.title}
          </h1>
          <p className="font-bold text-black">By Arka</p>
          <p className="text-gray-500 text-sm">
            {new Date().toLocaleDateString()}
          </p>
        </div>

        {blog.imageUrl && (
          <div className="flex justify-center mb-6">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={800}
              height={400}
              className="rounded-md"
            />
          </div>
        )}

        <p
          className="font-urbanist text-[24px] font-semibold leading-[28.8px] tracking-[-0.025em] text-left mb-4"
          style={{ color: "#6F6E73", fontFamily: "Urbanist" }}
        >
          {blog.description}
        </p>

        <div
          className="font-urbanist text-[24px] font-semibold leading-[28.8px] tracking-[-0.025em] text-left"
          style={{ color: "#3D3D3D", fontFamily: "Urbanist" }}
          dangerouslySetInnerHTML={{
            __html: blog.content.replace(
              /<p>/g,
              '<p style="margin-bottom: 16px;">'
            ),
          }}
        />

        {/* <div className="ml-4 mt-6"> */}
          <p
            className="text-bold mb-2"
            style={{ color: "#3D3D3D", fontFamily: "Urbanist" }}
          >
            Share
          </p>
          <div className="flex space-x-3">
            <button className="w-10 h-10 bg-purple-600 rounded-full hover:bg-purple-700 transition">
              <i className="fab fa-discord text-white text-xl"></i>
            </button>
            <button className="w-10 h-10 bg-purple-600 rounded-full hover:bg-purple-700 transition">
              <i className="fab fa-twitter text-white text-xl"></i>
            </button>
            <button className="w-10 h-10 bg-purple-600 rounded-full hover:bg-purple-700 transition">
              <i className="fab fa-telegram text-white text-xl"></i>
            </button>
            <button className="w-10 h-10 bg-purple-600 rounded-full hover:bg-purple-700 transition">
              <i className="fab fa-linkedin text-white text-xl"></i>
            </button>
          </div>
        </div>
      {/* </div> */}

      {/* Related Blog */}
      <RelatedBlog
        title="Related Blog"
        description="Our blog is filled with informative and inspiring content on all
            things green. From plant care tips and advice to the latest trends
            in gardening and design, our experts share their knowledge to help
            you bring your indoor and outdoor spaces to life."
      />

      {/* Contact Us */}
      <div className="mt-8 mb-24">
        <Contact />
      </div>
    </>
  );
}
