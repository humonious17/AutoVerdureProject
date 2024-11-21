import { db } from "@/pages/api/firebaseAdmin";
import Image from "next/image";
import Contact from "@/app/ui/Contact";
import Displayblogs from "@/app/ui/Store/Displayblogs";

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
      <div className="container mx-auto p-6 mt-14 max-w-2xl md:max-w-3xl lg:max-w-4xl">
        {/* Blog Header */}
        <div className="text-center mb-8">
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-lg text-xs uppercase tracking-wide">
            {blog.category || "General"}
          </span>
          <h1 className="font-urbanist text-[40px] sm:text-[48px] md:text-[64px] leading-tight mt-4 mb-2 text-center font-normal text-primaryGrayscale">
            {blog.title}
          </h1>
          <p className="font-bold text-black">{blog.authorName || "Unknown Author"}</p>
          <p className="text-gray-500 text-sm">
            {new Date().toLocaleDateString("en-GB")}
          </p>
        </div>

        {/* Blog Image */}
        {blog.imageUrl && (
          <div className="flex justify-center mb-6 ">
            <Image className="rounded-3xl w-[364px] h-[218px] sm:w-[681px] sm:h-[419px] xl:w-[833px] xl:h-[498px]"
              src={blog.imageUrl}
              alt={blog.title}
              width={364}
              height={218}
             
            />
          </div>
        )}

        {/* Blog Description */}
        <p className="font-urbanist text-[20px] sm:text-[24px] font-semibold leading-[28.8px] tracking-[-0.025em] text-left mb-4" style={{ color: "#6F6E73", fontFamily: "Urbanist" }}>
          {blog.description}
        </p>

        {/* Blog Content */}
        <div
          className="font-urbanist text-[20px] sm:text-[24px] font-normal leading-[28.8px] tracking-[-0.025em] text-left"
          style={{ color: "#3D3D3D", fontFamily: "Urbanist" }}
          dangerouslySetInnerHTML={{
            __html: blog.content.replace(
              
              '<p style="margin-bottom: 16px;">'
            ),
          }}
        />

        {/* Share Buttons */}
        <div className="mt-6">
          <p className="font-bold mb-2" style={{ color: "#3D3D3D", fontFamily: "Urbanist" }}>
            Share
          </p>
          <div className="flex space-x-3 justify-start">
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
      </div>

      {/* Related Blog Section */}
      <div className="mx-auto p-6 md:p-16 max-w-screen-2xl text-center">
        <Displayblogs
          title="Related Blog"
          description="Our blog is filled with informative and inspiring content on all things green. From plant care tips and advice to the latest trends in gardening and design, our experts share their knowledge to help you bring your indoor and outdoor spaces to life."
        />
      </div>

      {/* Contact Us Section */}
      <div className="mt-8 mb-24">
        <Contact />
      </div>
    </>
  );
}
