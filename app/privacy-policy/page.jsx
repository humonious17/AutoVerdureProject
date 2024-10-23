import Image from "next/image";
import Link from "next/link";
import React from "react";

const Privacy = () => {
  return (
    <div className="w-full px-4 pt-[44px] pb-[59px] md:px-[28px] md:py-[116px] xl:px-[119.99px] xl:pt-[114px] xl:pb-[192.5px] 2xl:px-[200px] 2xl:py-[116px] bg-[#FFFCF8] flex flex-col justify-center items-center">
      {/* Title */}
      <div className="max-w-[219px] md:max-w-[382px] w-full relative">
        <div>
          <Image
            className="object-contain absolute -top-[30px] -left-[70px] md:top-6 md:-left-[120px] xl:-top-[25.5px] xl:-left-[320px] -rotate-45 md:rotate-45 transform scale-x-100 md:-scale-x-100"
            src="/leaf.png"
            alt="leaf"
            width={58}
            height={41}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-[40px] md:text-[70px] leading-[48px] md:leading-[80px] -tracking-[1px] md:-tracking-[1.75px] font-normal text-primaryGrayscale">
            <p>Privacy Policy</p>
          </div>
          <div className="mt-3 md:mt-6 text-base font-medium">
            <p className="text-secondaryGrayscale">
              <Link href="/">
                <span className="text-primaryMain">Home</span>
              </Link>{" "}
              / Privacy Policy
            </p>
          </div>
        </div>
        <div>
          <Image
            className="object-contain absolute top-[25px] -right-[70px] md:-top-[10px] md:-right-[96px] xl:top-[30px] xl:-right-[200px] rotate-[95deg] md:-rotate-45"
            src="/leaf.png"
            alt="leaf"
            width={58}
            height={41}
          />
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="mt-16 md:mt-[72px] xl:mt-[72.5px] w-full border-[1px] border-black border-opacity-[11%]" />

      {/* Content */}
      <div className="mt-[80px] md:mt-[72px] max-w-screen md:max-w-[655px] xl:max-w-[778px] w-full flex flex-col justify-center items-center">
        <div className="text-[40px] md:text-[50px] font-normal leading-[48px] md:leading-[60px] -tracking-[1px] md:-tracking-[1.25px] text-primaryGrayscale">
          <p>Privacy Policy</p>
        </div>

        <div className="mt-[7px] md:mt-8 text-sm md:text-xl font-normal leading-6 md:leading-8 md:-tracking-[0.5px] text-secondaryGrayscale">
          At Auto Verdure, we are committed to protecting the privacy and
          security of our customers. This privacy policy describes how we
          collect, use, and share your personal information when you use our
          website autoverdure.com. <br /> <br />
          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            Information We Collect
          </span>{" "}
          <br/>
          <p>
          <strong> A. Personal Data</strong>
          <br/>
            While using our service, we may ask you to provide us with certain personally
            identifiable information that can be used to contact or identify you. Personally
            identifiable information may include, but is not limited to:
           <ul>

            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Usage Data</li>
            
           </ul>
          </p>
          <p> 
          <br/>
          <strong> B. Usage Data</strong>
          <br/>
              Usage data is collected automatically when using the service.
              Usage data may include information such as your device&#39;s Internet Protocol
              address (e.g. IP address), browser type, browser version, the pages of
              our service that you visit, the time and date of your visit, the time spent on those
              pages, unique device identifiers and other diagnostic data.
              When you access the service by or through a mobile device, we may collect
              certain information automatically, including, but not limited to, the type of
              mobile device you use, your mobile device unique ID, the IP address of your
              mobile device, your mobile operating system, the type of mobile Internet
              browser you use, unique device identifiers and other diagnostic data.
              We may also collect information that your browser sends whenever you visit
              our service or when you access the service by or through a mobile device.
          </p>
          <p>
          <br/>
          <strong>C. Information from Third-Party Social Media Services</strong>
          <br/>
              We allow you to create an account and log in to use the service through the
              following third-party social media services:
          <ul>

              <li>Google</li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>LinkedIn</li>

          </ul>
              If you decide to register through or otherwise grant us access to a third-
              party social media service, we may collect personal data that is already
              associated with your third-party social media service&#39;s account, such as your
              name, your email address, your activities or your contact list associated with
              that account.
          <br/>
              You may also have the option of sharing additional information with
              us through your third-party social media service&#39;s account. If you choose to
              provide such information and personal data, during registration or
              otherwise, you are giving the us permission to use, share, and store it in a
              manner consistent with this Privacy Policy. 
          </p>
          <br /> <br />
          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            How We Use Your Information
          </span>{" "}
          <br/>
          <p>
            <strong>A. We may use Personal/Sensitive Personal Data for the following purposes:</strong>
            <br/>
            <ul>
              <li>• To provide and maintain our service, including to monitor the usage of our service.</li>
              <li>• To manage your account: to manage your registration as a user of the service.
                    The personal data you provide can give you access to different functionalities of
                    the Service that are available to you as a registered user.</li>
              <li>• For the performance of a contract: the development, compliance and undertaking
                    of the purchase contract for the products, items or services you have purchased or
                    of any other contract with us through the service.</li>
              <li>• To contact you by email, telephone calls, SMS, or other equivalent
                    forms of electronic communication, such as a mobile application&#39;s push
                    notifications regarding updates or informative communications related to the
                    functionalities, products or contracted services, including the security updates,
                    when necessary or reasonable for their implementation.</li>
              <li>• To provide you with news, special offers and general information about other
                    goods, services and events which we offer that are similar to those that you have
                    already purchased or enquired about unless you have opted not to receive such
                    information.</li>
              <li>• To attend and manage your requests to us.</li>
              <li>• For business transfers: we may use your information to evaluate or conduct a
                    merger, divestiture, restructuring, reorganization, dissolution, or other sale or
                    transfer of some or all of Our assets, whether as a going concern or as part of
                    bankruptcy, liquidation, or similar proceeding, in which personal data held by us
                    about our service users is among the assets transferred.</li>
              <li>• For other purposes: We may use your information for other purposes, such as data
                    analysis, identifying usage trends, determining the effectiveness of our promotional
                    campaigns and to evaluate and improve our service, products, services, marketing
                    and your experience.</li>
            </ul>
          </p>
          <p>
          <br/>
            <strong>B. We may share your personal information in the following situations:</strong>
            <br/>
            <ul>
              <li>• With service providers: we may share your personal information
                    with service providers to monitor and analyze the use of our service, to
                    contact you.</li>
              <li>• For business transfers: we may share or transfer your personal information in
                    connection with, or during negotiations of, any merger, sale of company assets,
                    financing, or acquisition of all or a portion of our business to another company.</li>
              <li>• With affiliates: we may share your information with our affiliates, in which case
                    we will require those affiliates to honour this privacy policy. Affiliates include our
                    parent company and any other subsidiaries, joint venture partners or other
                    companies that we control or that are under common control with us.</li>
              <li>• With business partners: we may share your information with our business partners
                    to offer you certain products, services or promotions.</li>
              <li>• With other users: when you share personal information or otherwise interact in the
                    public areas with other users, such information may be viewed by all users and
                    may be publicly distributed outside. If you interact with other users or register
                    through a third-party social media service, your contacts on the third-
                    party social media service may see your name, profile, pictures and description
                    of your activity. similarly, other users will be able to view descriptions of your
                    activity, communicate with you and view your profile.</li>
              <li>• With your consent: we may disclose your personal information for any other
                    purpose with your consent.</li>
            </ul>
          </p>
          <p>
          <br/>
            <strong>C. Retention of Your Personal Data:</strong>
            <br/>
              We will retain your personal data only for as long as is necessary for the
              purposes set out in this Privacy Policy. We will retain and
              use your personal data to the extent necessary to comply with our legal
              obligations (for example, if we are required to retain your data to comply with
              applicable laws), resolve disputes, and enforce our legal agreements and
              policies.
            <br/>
              We will also retain usage data for internal analysis purposes. Usage data is
              generally retained for a shorter period of time, except when this data is used to
              strengthen the security or to improve the functionality of our service, or we are
              legally obligated to retain this data for longer time periods.
          </p>
          <p>
          <br/>
            <strong>D. Transfer of your Personal Data:</strong>
            <br/>
            Your information, including personal data, is processed at our operating offices
            and in any other places where the parties involved in the processing are located.
            It means that this information may be transferred to — and maintained on —
            computers located outside of your state, province, country or other
            governmental jurisdiction where the data protection laws may differ than those
            from your jurisdiction.<br/>
            Your consent to this Privacy Policy followed by your submission of such
            information represents your agreement to that transfer.
            We will take all steps reasonably necessary to ensure that your data is treated
            securely and in accordance with this Privacy Policy and no transfer
            of your personal data will take place to an organization or a country unless there
            are adequate controls in place including the security of your data and other
            personal information.
          </p>
          <p>
          <br/>
            <strong>E. Delete Your Personal Data:</strong>
            <br/>
            You have the right to delete or request that we assist in deleting
            the personal data that we have collected about you.
            Our service may give you the ability to delete certain information about you
            from within the service.<br/>
            You may update, amend, or delete your information at any time by signing in
            to your account, if you have one, and visiting the account settings section that
            allows you to manage your personal information. You may also contact us to
            request access to, correct, or delete any personal information that you have
            provided to us.<br/>
            Please note, however, that we may need to retain certain information when we
            have a legal obligation or lawful basis to do so.
          </p>
          <p>
          <br/>
            <strong>F. Disclosure of Your Personal Data:</strong>
            <br/>
            <ul>
              <li>• Business Transactions: If we are involved in a merger, acquisition or asset
                    sale, your personal data may be transferred. We will provide notice
                    before your personal data is transferred and becomes subject to a different Privacy
                    Policy.</li>
              <li>• Law enforcement: Under certain circumstances, we may be required to
                    disclose your personal data if required to do so by law or in response to valid
                    requests by public authorities (e.g. a court or a government agency).</li>
              <li>• Other legal requirements: We may disclose your personal data in the good faith
                    belief that such action is necessary to:
                    
                      <li>a) Comply with a legal obligation</li>  
                      <li>b) Protect and defend our rights or property</li>  
                      <li>c) Prevent or investigate possible wrongdoing in connection with the service</li>  
                      <li>d) Protect the personal safety of users of the service or the public</li>  
                      <li>e) Protect against legal liability</li>
                    </li>
            </ul>
          </p>
          <br/>
          <p>
            <strong>G. Security of Your Personal Data:</strong>
            <br/>
            The security of Your Personal Data is important to us but remember that no
            method of transmission over the Internet, or method of electronic storage is
            100% secure. While we strive to use commercially acceptable means to
            protect your personal data, we cannot guarantee its absolute security.
          </p>
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
            Tracking Technologies And Cookies
          </span>{" "}
          We use cookies and similar tracking technologies to track the activity
          on our service and store certain information. Tracking technologies used are
          beacons, tags, and scripts to collect and track information and to improve and
          analyze our service. The technologies we use may include:
          <br/>
          <br/>
          <p>
            <strong>A. Cookies or Brower Cookies:</strong>
            <br/>
             A cookie is a small file placed on your device. You
            can instruct your browser to refuse all cookies or to indicate when a cookie is being
            sent. However, if you do not accept cookies, you may not be able to use some parts
            of our service. Unless you have adjusted your browser setting so that it will
            refuse cookies, our service may use cookies.
          </p>
          <br/>
          <p>
            <strong>B. Web Beacons:</strong>
            <br/>
            Certain sections of our service and our emails may contain small
            electronic files known as web beacons (also referred to as clear gifs, pixel tags, and
            single-pixel gifs) that permit us, for example, to count users who have visited those
            pages or opened an email and for other related website statistics (for example,
            recording the popularity of a certain section and verifying system and server
            integrity).<br/>
            Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain
            on your personal computer or mobile device when you go offline, while Session
            Cookies are deleted as soon as you close your web browser.
            <br/>
            We use both Session and Persistent Cookies for the purposes set out below:
            <br/>
            <br/>
            <strong>Necessary / Essential Cookies</strong>
            <br/>
            Purpose: These cookies are essential to provide you with services available
            through the website and to enable you to use some of its features. They help to
            authenticate users and prevent fraudulent use of user accounts. Without
            these cookies, the services that you have asked for cannot be provided, and we
            only use these cookies to provide you with those services.
            <br/>
            <br/>
            <strong>Cookies Policy / Notice Acceptance Cookies</strong>
            <br/>
            Purpose: These cookies identify if users have accepted the use of cookies on the Website.
            <br/>
            <br/>
            <strong>Functionality Cookies</strong>
            <br/>
            Purpose: These cookies allow us to remember choices you make when you use
            the website, such as remembering your login details or language preference. The
            purpose of these cookies is to provide you with a more personal experience and
            to avoid you having to re-enter your preferences every time you use the website.
          </p>
          <br /> <br />

          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            Children's Policy
          </span>{" "}
          Our service does not address anyone under the age of 13. We do not knowingly
          collect personally identifiable information from anyone under the age of 13. If you
          are a parent or guardian and you are aware that your child has provided us
          with personal data, please contact us. If we become aware that we have
          collected personal data from anyone under the age of 13 without verification of
          parental consent, we take steps to remove that information from our servers.<br/>
          If we need to rely on consent as a legal basis for processing your information
          and your country requires consent from a parent, we may require your parent&#39;s
          consent before we collect and use that information.
          <br /> <br />

          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            Third-Party Links
          </span>{" "}
          Our site may contain links to other websites that are not operated by us. If you
          click on a third-party link, you will be directed to that third party&#39;s site. We
          strongly advise you to review the Privacy Policy of every site you visit.
          We have no control over and assume no responsibility for the content, privacy
          policies or practices of any third party sites or services.
          <br /> <br />

          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            Updates to Privacy Policy
          </span>{" "}
          We may update our Privacy Policy from time to time. We will notify you of any
          changes by posting the new Privacy Policy on this page.
          We will let you know via email and/or a prominent notice on our service, prior to
          the change becoming effective and update the &quot;Last updated&quot; date at the top of this
          Privacy Policy.
          You are advised to review this Privacy Policy periodically for any changes.
          Changes to this Privacy Policy are effective when they are posted on this page.
          <br /> <br />

          <span className="block md:leading-6 -tracking-[0.5px] text-primaryGrayscale font-[600]">
            Contact Us
          </span>{" "}
          If you have any questions or concerns about this privacy policy or our
          privacy practices, please contact us at 
          <br/>
          <ul>
          <li>By email: admin@xirde.com</li>
          <li>By contacting us on: +91 9289671707</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
