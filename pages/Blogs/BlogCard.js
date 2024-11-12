import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <Link href={`/Blogs/${blog.id}`} className="block mb-6">
      <div className="object-cover w-full rounded-3xl overflow-hidden">
        {/* Image Section for Other Blogs */}
        <div className="w-full h-[280px] md:h-[194.158px] xl:h-[240px]">
          {blog.imageUrl && (
            <Image
              className="object-cover w-full h-full rounded-3xl"
              src={blog.imageUrl}
              alt={blog.title || "Blog Image"}
              width={1000}
              height={270}
            />
          )}
        </div>

        {/* Content Section */}
        <div className="w-full flex flex-col justify-between">
          <div className="w-fit rounded-lg px-3 py-[6px] text-sm font-normal -tracking-[0.35px] bg-quaternaryMain text-quaternaryBg mt-4">
            <p>{blog.category || "General"}</p>
          </div>

          <div className="mt-2 text-xl leading-6 -tracking-[0.5px] font-semibold text-primaryGrayscale text-left">
            <p>{blog.title}</p>
          </div>

          <div className="mt-3 text-base font-medium flex items-center gap-2">
            <p>Read More</p>
            <Image src="/rightArrow.svg" alt="Read More Arrow" width={20} height={20} />
          </div>

          <div className="mt-3 px-1 flex gap-[12px] items-center">
            <div>
              <Image
                src={blog.authorImage || '/image1.png'}
                alt={`Profile picture of ${blog.authorName}`}
                width={32}
                height={32}
              />
            </div>
            <div className="flex flex-col gap-[2px] text-start text-primaryGrayscale">
              <p className="text-xs font-medium">By {blog.authorName}</p>
              <p className="text-xs font-normal">{formatDate(blog.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
    authorImage: PropTypes.string,
    authorName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogCard;
