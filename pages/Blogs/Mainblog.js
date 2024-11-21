import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

const MainBlog = ({ blog }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'long', year: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };
  return (
    <Link href={`/Blogs/${blog.id}`}>
    <div className="pt-2 pb-[50px] md:pt-[30px] md:pb-[40px] xl:pt-16 xl:pb-[60px] md:px-[11px] xl:px-[1px] 2xl:px-[20px] w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-[33px]">
        {/* Image Section */}
      
        <div className="w-full h-[226px] md:w-[367px] md:h-[351px] xl:w-[550px] xl:h-[343px] 2xl:w-[600px] rounded-3xl">
      
          <Image
            className="object-cover w-full h-[226px] md:w-[367px] md:h-[321px] xl:w-[550px] xl:h-[343px] 2xl:w-[600px] rounded-3xl"
            src={blog.imageUrl}
            alt="blogImage"
            width={1000}
            height={226}
          />
          
        </div>

        {/* Content Section */}
        <div className="w-full md:w-[350px] xl:w-[507px] 2xl:w-[550px]">
          <div className="w-fit rounded-lg px-3 py-[6px] text-sm font-normal -tracking-[0.35px] bg-quaternaryMain text-quaternaryBg">
            <p>{blog.category || "General"}</p>
          </div>
          <div className="mt-2 text-xl xl:text-2xl leading-6 -tracking-[0.5px] font-[600] text-primaryGrayscale">
            <p>{blog.title}</p>
            <p className="mt-2 text-sm font-normal leading-6 text-secondaryGrayscale">
              {blog.description}
            </p>
          </div>
          <div className="mt-3 text-base font-medium flex gap-2">
            <p>Read More</p>
            <Image src="/rightArrow.svg" alt="rightArrow" width={20} height={20} />
          </div>
          <div className="mt-3 flex gap-[12px]">
            <div>
              <Image
                src={blog.authorImage || '/image1.png'}
                alt="user"
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
    </div>
    </Link>
  );
};

MainBlog.propTypes = {
  blog: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authorImage: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export default MainBlog;
