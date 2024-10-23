import Contact from "@/app/ui/Contact";
import RelatedBlog from "@/app/ui/RelatedBlog";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleBlog = () => {
  return (
    <div className="pt-8 pb-[126px] md:pt-10 md:pb-[128.44px] xl:pt-[57px] xl:pb-[167px] pl-4 pr-[13px] bg-[#FFFCF8] flex flex-col justify-center items-center">
      <div className="px-1 md:px-[35px] xl:px-[101px] text-base font-medium w-full flex flex-col justify-start items-start">
        <p>
          <span className="text-primaryMain">
            <Link href="/">Home</Link> / <Link href="/guides">Our Blog</Link> /{" "}
          </span>{" "}
          Lorem Ipsum
        </p>
      </div>

      <div className="mt-[88px] md:mt-[70px] w-full sm:w-[364px] md:w-[681px] xl:w-[833px] 2xl:w-[1000px] flex flex-col justify-center items-center">
        <div className="w-full relative">
          {/* Leaf */}
          <div className="xl:hidden absolute -top-[26px] left-[38px] md:-top-8 md:left-[550px]">
            <Image
              className="w-[37.199px] h-[26.296px] md:w-[58px] md:h-[41px]"
              src="/leaf1.png"
              alt="leaf"
              width={37.199}
              height={26.296}
            />
          </div>
          <div className="xl:hidden absolute -top-[17px] right-[19.1px] md:left-10 md:top-14">
            <Image
              className="w-[37.199px] h-[26.296px] md:w-[58px] md:h-[41px]"
              src="/leaf2.png"
              alt="leaf"
              width={37.199}
              height={26.296}
            />
          </div>

          {/* Heading and Author Name */}
          <div className="flex flex-col gap-[12px] justify-center items-center">
            <div className="px-3 py-[6px] rounded-lg text-base bg-quaternaryMain secondaryFontText font-[600] -tracking-[0.4px] text-quaternaryBg">
              <p>Green Living</p>
            </div>

            <div className="md:mb-6 text-[40px] md:text-5xl xl:text-[64px] font-normal leading-[48px] md:leading-[57.6px] xl:leading-[76.8px] text-center -tracking-[1px] md:-tracking-[1.2px] xl:-tracking-[1.6px]">
              <p>How to water plants</p>
            </div>

            <div className="flex gap-[12px] justify-center items-center secondaryFont">
              <div>
                <Image src="/user.svg" alt="user" width={46} height={46} />
              </div>
              <div className="flex flex-col gap-[2px] secondaryFontText">
                <p className="text-base font-semibold leading-[19.2px] text-primaryGrayscale -tracking-[0.4px] text-center">
                  By Arka
                </p>
                <p className="text-xs text-center font-normal leading-[14.4px] -tracking-[0.3px] text-primaryGrayscale">
                  Just now
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Image and Description */}
        <div className="mt-[68px] w-full flex flex-col justify-center items-center">
          {/* Blog Image */}
          <div className="w-full h-[218px] md:h-[419px] md:w-[681px] xl:w-[833px] 2xl:w-[1000px] rounded-3xl flex justify-center items-center">
            <Image
              className="object-cover w-full h-[218px] md:h-[419px] md:w-[681px] xl:w-[833px] 2xl:w-[1000px] rounded-3xl"
              src="/blogImage.png"
              alt="image"
              width={1000}
              height={218}
            />
          </div>

          {/* Blog Description */}
          <div className="mt-[54px] md:mt-[49px] w-full flex flex-col justify-center items-start">
            <p className="text-2xl leading-[28.8px] -tracking-[0.6px] text-secondaryGrayscale font-[600]">
              Indoor plants can do more than just add a touch of green to your
              home or office. They can actually improve your physical and mental
              health. Here are some of the many benefits of indoor plants:
            </p>

            <div className="my-[54px] flex flex-col gap-8">
              <div className="text-primaryGrayscale">
                <p className="mb-[2px] text-2xl leading-[28.08px] -tracking-[0.6px] font-[600]">
                  1.Purifying the Air
                </p>
                <p className="text-sm md:text-xl leading-6 font-normal">
                  Indoor plants can help to purify the air in your home or
                  office. They absorb harmful chemicals and pollutants, and
                  release oxygen into the air. Some of the best plants for air
                  purification include spider plants, peace lilies, and Boston
                  ferns.
                </p>
              </div>
              <div className="text-primaryGrayscale">
                <p className="mb-[2px] text-2xl leading-[28.08px] -tracking-[0.6px] font-[600]">
                  2. Boosting Mood and Productivity
                </p>
                <p className="text-sm md:text-xl leading-6 font-normal">
                  Indoor plants can also have a positive effect on your mood and
                  productivity. Studies have shown that simply being around
                  plants can lower stress levels, reduce anxiety, and improve
                  mood. In addition, having plants in your workspace can
                  increase productivity, creativity, and overall job
                  satisfaction.
                </p>
              </div>
              <div className="text-primaryGrayscale">
                <p className="mb-[2px] text-2xl leading-[28.08px] -tracking-[0.6px] font-[600]">
                  3. Improving Mental Health{" "}
                </p>
                <p className="text-sm md:text-xl leading-6 font-normal">
                  Indoor plants can be beneficial for those struggling with
                  mental health issues such as depression and anxiety. The act
                  of caring for plants can provide a sense of purpose and
                  accomplishment, and can help to reduce symptoms of depression
                  and anxiety.
                </p>
              </div>
              <div className="text-primaryGrayscale">
                <p className="mb-[2px] text-2xl leading-[28.08px] -tracking-[0.6px] font-[600]">
                  4. Enhancing Physical Health{" "}
                </p>
                <p className="text-sm md:text-xl leading-6 font-normal">
                  In addition to their mental health benefits, indoor plants can
                  also have physical health benefits. Some studies have shown
                  that plants can lower blood pressure and improve respiratory
                  function. Additionally, having plants in your home or office
                  can reduce the risk of headaches and other symptoms associated
                  with poor indoor air quality.
                </p>
              </div>
              <div className="text-primaryGrayscale">
                <p className="mb-[2px] text-2xl leading-[28.08px] -tracking-[0.6px] font-[600]">
                  5. Boosting Immune System{" "}
                </p>
                <p className="text-sm md:text-xl leading-6 font-normal">
                  Plants release phytoncides that help to boost our immune
                  system. Exposure to these compounds can help to reduce stress
                  levels and increase the production of white blood cells, which
                  can help to fight off infections.
                </p>
              </div>
            </div>

            {/* Conclusion */}
            <div className="text-primaryGrayscale">
              <p className="text-sm md:text-xl leading-6 font-normal">
                In conclusion, indoor plants can have a wide range of benefits
                for both your physical and mental health. Whether you choose to
                add a few plants to your home or office, or create an entire
                indoor garden, you&apos;re sure to notice the positive effects
                that plants can have on your well-being.
              </p>
            </div>

            {/* Share */}
            <div className="mt-[48px]">
              <p className="text-xl leading-6 -tracking-[0.5px] font-[600]">
                Share
              </p>
              <div className="mt-[48px] flex gap-5">
                <Link href="3">
                  <Image
                    src="/discord.svg"
                    alt="discord"
                    width={39.398}
                    height={39.398}
                  />
                </Link>

                <Link href="#">
                  <Image src="/x.svg" alt="x" width={39.398} height={39.398} />
                </Link>

                <Link href="#">
                  <Image
                    src="/telegram.svg"
                    alt="telegram"
                    width={39.398}
                    height={39.398}
                  />
                </Link>

                <Link href="#">
                  <Image
                    src="/linkedIn.svg"
                    alt="linkedIn"
                    width={39.398}
                    height={39.398}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Blogs */}
      <RelatedBlog
        title="Related Blog"
        description="Our blog is filled with informative and inspiring content on all
            things green. From plant care tips and advice to the latest trends
            in gardening and design, our experts share their knowledge to help
            you bring your indoor and outdoor spaces to life."
      />

      {/* Contact Us */}
      <Contact />
    </div>
  );
};

export default SingleBlog;
