import { db } from "@/pages/api/firebaseAdmin";
import Image from "next/image";
import Contact from "@/app/ui/Contact";
import Displayblogs from "@/app/ui/Store/Displayblogs";
import {
  Share2,
  Twitter,
  Linkedin,
  MessageCircle,
  Send,
  Clock,
  Calendar,
  BookOpen,
  ChevronLeft,
} from "lucide-react";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";

export default function BlogPost({ blog }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-[#fffbf7]">
      {/* Hero Section with Full-width Image - Added mt-16 for navbar height */}
      <div className="mt-16">
        <div className="relative w-full h-[80vh]">
          {blog.imageUrl && (
            <>
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                className="object-cover"
                fill
                priority
                quality={90}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            </>
          )}

          {/* Back Button - Adjusted position */}
          <div className="absolute top-4 left-4 z-20 md:left-8">
            <Link
              href="/resources"
              className="inline-flex items-center px-4 py-2 space-x-2 text-sm text-white bg-black/20 backdrop-blur-sm rounded-full shadow-sm hover:bg-black/30 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
          </div>

          {/* Centered Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                {blog.category || "General"}
              </span>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(new Date())}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {estimateReadTime(blog.content)} min read
                  </span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50" />
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">
                    {blog.content.split(/\s+/).length} words
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div className="mt-8 flex items-center justify-center">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primaryMain to-indigo-700 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {(blog.authorName || "Unknown").charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">
                      {blog.authorName || "Unknown Author"}
                    </p>
                    <p className="text-sm text-white/70">Content Writer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto -mt-32">
        <div className="bg-[#fffbf7] rounded-2xl shadow-xl p-6 sm:p-10 lg:p-16">
          {/* Description */}
          <div className="prose prose-lg mx-auto">
            <blockquote className="text-xl md:text-2xl font-light italic text-gray-700 border-l-4 border-primaryMain pl-4 my-8">
              {blog.description}
            </blockquote>

            {/* Content */}
            <div
              className="mt-8 prose prose-lg prose-green prose-headings:font-bold prose-p:text-gray-700 prose-a:text-green-600 prose-blockquote:text-gray-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          </div>

          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="font-medium text-gray-900 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-gray-600" />
                Share this article
              </p>
              <div className="flex gap-4">
                <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <FacebookIcon className="w-5 h-5 text-gray-700" />
                </button>
                <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <XIcon className="w-5 h-5 text-gray-700" />
                </button>
                <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <InstagramIcon className="w-5 h-5 text-gray-700" />
                </button>
                <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <LinkedInIcon className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Blog Section */}
      <section className="bg-[#fffbf7] mt-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              More Articles
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover more stories and insights about sustainable living and
              eco-friendly practices.
            </p>
          </div>
          <Displayblogs />
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#fffbf7] py-16">
        <Contact />
      </section>
    </div>
  );
}

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
