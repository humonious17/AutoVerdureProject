import Image from "next/image";
import Link from "next/link";

const GuideCard = ({ guide, href, className }) => {

  return (
    <Link href="/guides/123" className={`${className}`}>
      <div className="w-full h-[226px] md:h-[194.158px] xl:h-[234px] rounded-3xl">
        <Image
          className="object-cover w-full h-[226px] md:h-[194.158px] xl:h-[234px] rounded-3xl"
          src={guide.blogImg}
          alt="blogImage"
          width={1000}
          height={226}
        />
      </div>

      <div className="mt-6 w-full">
        <div className="w-fit rounded-lg px-3 py-[6px] text-sm font-normal -tracking-[0.35px] bg-quaternaryMain text-quaternaryBg">
          <p>Plant Care</p>
        </div>
        <div className="mt-2 text-xl leading-6 -tracking-[0.5px] font-[600] text-primaryGrayscale">
          <p>{guide.title}</p>
        </div>
        <div className="mt-3 text-base font-medium flex gap-2">
          <p>Read More</p>
          <Image
            src="/rightArrow.svg"
            alt="rightArrow"
            width={20}
            height={20}
          />
        </div>
        <div className="mt-3 flex gap-[12px]">
          <div>
            <Image src={guide.authorImage} alt="user" width={32} height={32} />
          </div>
          <div className="flex flex-col gap-[2px] text-start text-primaryGrayscale">
            <p className="text-xs font-medium">By {guide.authorName}</p>
            <p className="text-xs font-normal">{guide.createdAt}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GuideCard;
