import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types"; // Import PropTypes for type checking

const BlogCard = ({ blog, className }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', year: 'numeric' }; // Format options for month and year
    return date.toLocaleDateString(undefined, options); // Locale-aware formatting
  };
  return (
    <Link href={`/Blogs/${blog.id}`} className={`${className} block`}>
      <div className="w-full h-[226px] md:h-[194.158px] xl:h-[234px] rounded-3xl overflow-hidden">
        {blog.imageUrl && (
          <Image
            className="object-cover w-full h-full"
            src={blog.imageUrl}
            alt={blog.title || "Blog Image"} // More descriptive alt text
            width={1000}
            height={226}
          />
        )}
      </div>

      <div className="mt-6 w-full">
        <div className="w-fit rounded-lg px-3 py-[6px] text-sm font-normal -tracking-[0.35px] bg-quaternaryMain text-quaternaryBg">
          <p>{blog.category || "General"}</p> {/* Default category if not provided */}
        </div>
        <div className="mt-2 text-xl leading-6 -tracking-[0.5px] font-semibold text-primaryGrayscale text-left"> {/* Title aligned to left */}
          <p>{blog.title}</p>
        </div>
        <div className="mt-3 text-base font-medium flex items-center gap-2">
          <p>Read More</p>
          <Image
            src="/rightArrow.svg"
            alt="Read More Arrow"
            width={20}
            height={20}
          />
        </div>
        <div className="mt-3 flex gap-[12px] items-center">
          <div>
          
              
            <Image
              src='/image1.png'
              alt={`Profile picture of ${blog.authorName}`} // Descriptive alt text
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
    </Link>
  );
};

// PropTypes for better type checking
BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authorImage: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    category: PropTypes.string, // Optional category
  }).isRequired,
  className: PropTypes.string,
};

BlogCard.defaultProps = {
  className: '',
};

export default BlogCard;
