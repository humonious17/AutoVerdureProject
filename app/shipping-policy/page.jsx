import Image from "next/image";
import Link from "next/link";
import React from "react";

const PolicySection = ({ title, children }) => (
  <div className="mb-8 bg-[#FFFBF7] shadow-sm rounded-lg p-6">
    <h2 className="text-2xl font-semibold text-primaryMain border-b pb-3 mb-4">
      {title}
    </h2>
    {children}
  </div>
);

const PolicySubsection = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="text-lg font-medium text-primaryGrayscale mb-2">{title}</h3>
    {children}
  </div>
);

const ShippingPolicy = () => {
  return (
    <div className="w-full px-4 pt-[100px] pb-[59px] md:px-[28px] md:py-[116px] xl:px-[119.99px] xl:pt-[114px] xl:pb-[192.5px] 2xl:px-[200px] 2xl:py-[116px] bg-[#FFFBF7] flex flex-col justify-center items-center">
      {/* Title Section */}
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
            <h1>Shipping Policy</h1>
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
      <div className="mt-[80px] md:mt-[72px] max-w-screen md:max-w-[655px] xl:max-w-[778px] w-full">
        <div className="bg-[#FFFBF7] rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-8">
            <p className="text-secondaryGrayscale text-base md:text-xl leading-relaxed">
              Welcome to Auto Verdure! We are dedicated to providing
              high-quality plants, flowers, hydroponic planters, and urban
              gardening accessories to customers worldwide.
            </p>
          </div>

          <PolicySection title="1. Shipping Policy">
            <PolicySubsection title="Order Processing">
              <ul className="list-disc list-outside pl-5 space-y-2 text-secondaryGrayscale">
                <li>
                  Orders are processed within 1-2 business days after payment
                  confirmation.
                </li>
                <li>
                  Orders placed on weekends or public holidays will be processed
                  on the next business day.
                </li>
              </ul>
            </PolicySubsection>

            <PolicySubsection title="Shipping Time">
              <div className="mb-4">
                <h4 className="font-medium mb-2">Domestic Orders (India)</h4>
                <ul className="list-disc list-outside pl-5 space-y-2 text-secondaryGrayscale">
                  <li>Standard delivery time is 3-7 business days.</li>
                  <li>Remote areas may take up to 10-15 business days.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">International Orders</h4>
                <ul className="list-disc list-outside pl-5 space-y-2 text-secondaryGrayscale">
                  <li>
                    Delivery time varies based on the destination country and
                    selected shipping method.
                  </li>
                  <li>
                    Estimated delivery timelines will be displayed at checkout
                    or sent via email.
                  </li>
                </ul>
              </div>
            </PolicySubsection>

            <PolicySubsection title="Shipping Charges">
              <div className="mb-4">
                <h4 className="font-medium mb-2">Domestic Orders (India)</h4>
                <ul className="list-disc list-outside pl-5 space-y-2 text-secondaryGrayscale">
                  <li>Free shipping on all orders.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">International Orders</h4>
                <ul className="list-disc list-outside pl-5 space-y-2 text-secondaryGrayscale">
                  <li>
                    Shipping charges vary based on destination country, weight,
                    and package size.
                  </li>
                  <li>
                    Charges calculated during checkout based on live exchange
                    rates and carrier pricing.
                  </li>
                  <li>
                    Customers responsible for applicable customs duties or
                    taxes.
                  </li>
                </ul>
              </div>
            </PolicySubsection>
          </PolicySection>

          <PolicySection title="2. Returns & Replacements">
            <PolicySubsection title="Domestic Returns (India)">
              <ul className="list-disc list-outside pl-5 space-y-2 text-secondaryGrayscale">
                <li>Free 7-day no-questions-asked returns.</li>
                <li>
                  Products must be returned in original packaging with no
                  visible signs of use or damage.
                </li>
              </ul>
            </PolicySubsection>

            <PolicySubsection title="International Returns">
              <ul className="list-disc list-outside pl-5 space-y-2 text-secondaryGrayscale">
                <li>Returns possible within 7 days of delivery.</li>
                <li>Return shipping costs must be covered by the customer.</li>
                <li>Products must be in original condition and packaging.</li>
              </ul>
            </PolicySubsection>

            <PolicySubsection title="Free Replacement">
              <ul className="list-disc list-outside pl-5 space-y-2 text-secondaryGrayscale">
                <li>Free replacement for defective or damaged items.</li>
                <li>
                  Includes plants in poor condition (photo evidence required)
                  and damaged transit items.
                </li>
                <li>
                  Replacement requests must be made within 7 days of delivery.
                </li>
              </ul>
            </PolicySubsection>
          </PolicySection>

          <PolicySection title="Contact Us">
            <div className="space-y-4 text-secondaryGrayscale">
              <p>Questions about your order? Contact our support team:</p>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:Support@autoverdure.com"
                    className="text-primaryMain hover:underline"
                  >
                    Support@autoverdure.com
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a
                    href="tel:+919289671707"
                    className="text-primaryMain hover:underline"
                  >
                    +91 9289671707
                  </a>
                </li>
                <li>Hours: 10:00 AM to 5:00 PM</li>
              </ul>
            </div>
          </PolicySection>

          <div className="mt-8 p-4 bg-green-50 border-l-4 border-primaryMain rounded">
            <p className="italic text-secondaryGrayscale">
              By placing an order on our website, you agree to this policy.
              Thank you for choosing Auto Verdure!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
