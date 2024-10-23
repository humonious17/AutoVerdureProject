import Image from "next/image";
import Link from "next/link";
import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="w-full px-4 pt-[44px] pb-[59px] md:px-[28px] md:py-[116px] xl:px-[119.99px] xl:pt-[114px] xl:pb-[192.5px] 2xl:px-[200px] 2xl:py-[116px] bg-[#FFFCF8] flex flex-col justify-center items-center">
      {/* Title */}
      <div className="max-w-[246px] md:max-w-[430px] w-full relative">
        <div>
          <Image
            className="object-contain absolute -top-[10px] -left-[60.43px] md:top-[88px] md:-left-[62px] xl:-left-[248px] xl:-bottom-6 -rotate-45 md:rotate-45 xl:-rotate-45 transform scale-x-100 md:-scale-x-100 xl:scale-x-100"
            src="/leaf.png"
            alt="leaf"
            width={58}
            height={41}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-[40px] md:text-[70px] leading-[48px] md:leading-[80px] -tracking-[1px] md:-tracking-[1.75px] font-normal text-primaryGrayscale">
            <p>Shipping Policy</p>
          </div>
          <div className="mt-3 md:mt-6 text-base font-medium">
            <p className="text-secondaryGrayscale">
              <Link href="/">
                <span className="text-primaryMain">Home</span>
              </Link>{" "}
              / Shipping Policy
            </p>
          </div>
        </div>
        <div>
          <Image
            className="object-contain absolute -bottom-[40px] -right-[50px] md:bottom-[123px] md:-right-[62px] xl:top-[35.5px] xl:-right-[150px] rotate-45 md:-rotate-45"
            src="/leaf.png"
            alt="leaf"
            width={58}
            height={41}
          />
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="mt-[57px] md:mt-[72px] xl:mt-[72.5px] w-full border-[1px] border-black border-opacity-[11%]" />

      {/* Content */}
      <div className="mt-[80px] md:mt-[72px] max-w-screen md:max-w-[655px] xl:max-w-[778px] w-full flex flex-col justify-center items-center">
        <div className="text-[40px] md:text-[50px] font-normal leading-[48px] md:leading-[60px] -tracking-[1px] md:-tracking-[1.25px] text-primaryGrayscale">
          <p>Shipping Policy</p>
        </div>

        <div className="mt-[7px] md:mt-8 text-sm md:text-xl font-normal leading-6 md:leading-8 md:-tracking-[0.5px] text-secondaryGrayscale">
          At Auto Verdure, we are committed to protecting the privacy and
          security of our customers. This privacy policy describes how we
          collect, use, and share your personal information when you use our
          website autoverdure.com. <br /> <br />
          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            Information We Collect
          </span>{" "}
          When you use our website, we may collect certain information about
          you, such as your name, email address, phone number, billing and
          shipping address, and payment information. We may also collect
          information about your use of our website, such as your IP address,
          browser type, and operating system. <br /> <br />
          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            How We Use Your Information
          </span>{" "}
          We may use your personal information to: Fulfill orders and process
          payments Communicate with you about your orders and account Respond to
          your inquiries and customer service requests Improve our website and
          services Send you promotional emails and newsletters (you can opt-out
          at any time) We will not sell, rent, or share your personal
          information with third parties for their marketing purposes without
          your consent.
          <br /> <br />
          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            Data Security
          </span>{" "}
          We take reasonable measures to protect your personal information from
          loss, theft, and unauthorized access, disclosure, alteration, and
          destruction. However, please be aware that no method of transmission
          over the internet or electronic storage is 100% secure.
          <br /> <br />
          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            Cookies
          </span>{" "}
          We may use cookies and similar tracking technologies to enhance your
          experience on our website and collect information about your browsing
          behavior. You can control the use of cookies through your browser
          settings.
          <br /> <br />
          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            Third-Party Links
          </span>{" "}
          Our website may contain links to third-party websites that are not
          operated by us. We are not responsible for the privacy practices of
          these websites and recommend that you review their privacy policies.
          <br /> <br />
          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            Updates to Privacy Policy
          </span>{" "}
          We may update this privacy policy from time to time to reflect changes
          in our practices or applicable laws. We encourage you to review this
          policy periodically.
          <br /> <br />
          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            Contact Us
          </span>{" "}
          If you have any questions or concerns about this privacy policy or our
          privacy practices, please contact us at [Contact Information].
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
