import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import bcrypt from "bcryptjs";
import { parse } from "cookie";
import { Eye, EyeOff } from "lucide-react";

const importScript = (src) => {
  const credScript = document.createElement("script");
  credScript.type = "text/javascript";
  credScript.innerHTML = `
    window.handleCredentialResponse = async (response) => {
        const data = JSON.stringify({data:response});

        await fetch('/api/addSession', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                },
            body: data,
        });

        window.location.href = '/profile';
    }
    `;
  document.head.appendChild(credScript);
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
};

const Input = ({ label, placeholder, type, name, value, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full flex flex-col gap-y-3">
      <label className="text-2xl leading-6 capitalize font-normal text-[#070707]">
        {label}
      </label>
      <div className="w-full text-base px-4 py-3 leading-[25.6px] rounded-[84px] border-[1px] border-[#070707] text-[#070707] bg-[#FFFFFF] font-medium flex gap-5 justify-between">
        <input
          className="w-full h-fit text-base focus:outline-none"
          placeholder={placeholder}
          type={type === "password" && isVisible ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="cursor-pointer"
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        )}
      </div>
    </div>
  );
};

const Signin = (prop) => {
  useEffect(() => {
    importScript("https://accounts.google.com/gsi/client");
  }, []);

  const [buttonText, setButtonText] = useState("Create Account");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    avPoints: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Creating...");
    const form = new FormData();
    const hashedPassword = await bcrypt.hash(formData.password.trim(), 10);
    form.append("username", formData.firstName + " " + formData.lastName);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("hashedPassword", hashedPassword);
    form.append("avPoints", formData.avPoints);

    try {
      const response = await fetch("/api/addPwdSession", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (response.status === 200) {
        window.location.href = "/profile";
      } else {
        setButtonText("Create Account");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
    } catch (error) {
      setButtonText("Create Account");
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="px-4 sm:px-0 pt-16 sm:pt-[80px] mt-8 sm:mt-[55px] mb-8 sm:mb-[41px] lg:mb-[152px] lg:pl-[70px] w-full flex flex-col lg:flex-row lg:gap-[57px] xl:gap-x-[152px] justify-center lg:justify-start items-start overflow-x-hidden">
    {/* Left Section with Text */}
    <div className="mb-8 sm:mb-[46px] lg:mb-0 w-full lg:w-[560px] px-0 sm:px-[50px] lg:px-0 flex flex-col justify-center items-start">
      {/* Title */}
      <div className="w-full flex flex-col gap-y-2 sm:gap-y-3">
        <p className="text-2xl sm:text-[32px] leading-8 font-normal capitalize text-[#070707]">
            Welcome back
          </p>
          <p className="w-full text-sm leading-[22.4px] font-medium text-[#8E8F94]">
            Join to start shopping and stay up-to-date on the latest deals.
          </p>
        </div>

        {/* Google and Apple Authentication */}
        <div className="mt-8 sm:mt-[52px] w-full flex flex-col justify-center sm:flex-row gap-y-4 sm:gap-x-4">
          <div
            id="g_id_onload"
            data-client_id="39593396169-ppn7dc7v4huovmuromku2k01s26kngfa.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleCredentialResponse"
            data-auto_prompt="false"
          ></div>

          <div
            className="g_id_signin w-full sm:w-[380px] md:w-[400px] lg:w-[400px]"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signup_with"
            data-size="large"
            data-logo_alignment="center"
            
          ></div>
        </div>

        {/* Or */}
        <div className="my-6 sm:my-8 w-full sm:w-[560px] flex gap-x-2 items-center">
          <div className="w-full h-[1px] bg-[#E4E4E4]" />
          <p className="text-sm sm:text-base leading-[25.6px] font-medium text-[#070707] whitespace-nowrap px-2">
            or
          </p>
          <div className="w-full h-[1px] bg-[#E4E4E4]" />
        </div>

        {/* Form */}
        <div className="w-full">
          <form
            className="w-full flex flex-col gap-y-4 sm:gap-y-6"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col sm:flex-row gap-x-4 gap-y-6 sm:gap-y-0">
              <Input
                label="First Name"
                placeholder="Type here"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                label="Last Name"
                placeholder="Type here"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <Input
              label="Email"
              placeholder="Type here"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              placeholder="Type here"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="Password"
              placeholder="Type here"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="mt-[42px] sm:mt-[52px] w-full text-base px-6 py-[17px] rounded-[30px] border-[1px] bg-[#070707] border-[#070707] text-[#FFFFFF] font-[600]"
            >
              {buttonText}
            </button>
            <p className="mt-4 sm:mt-6 text-sm leading-[18.2px] text-[#8E8F94] font-medium text-center">
              Already Created?
              <Link href="/signin">
                <span className="text-[#070707]"> Login</span>
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="flex justify-center items-center w-full md:w-[820px] lg:w-[710px]">
        <div className="w-full xl:mt-[210px] lg:mt-[180px] h-[280px] sm:w-[430.65px] sm:h-[340px] md:w-[640px] md:h-[440px] lg:w-[558.65px] lg:h-[582px] xl:w-[725.65px] xl:h-[590px] overflow-hidden  shadow-lg rounded-lg">
      <video
            className="w-full h-full object-cover rounded-lg"
            src="/signup.mp4"
            playsInline
            autoPlay
            loop
            muted
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const { admin, db } = await import("/pages/api/firebaseAdmin");
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokens = parse(cookies);
    const sessionToken = tokens.sessionToken;
    if (sessionToken) {
      const usersRef = db.collection("users");
      const querySnapshot = await usersRef
        .where("sessionToken", "==", sessionToken)
        .get();

      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      const user = users[0];
      if (user) {
        return {
          redirect: {
            destination: "/profile",
            permanent: false,
          },
        };
      }
    } else {
      return {
        props: { user: null },
      };
    }
  }
  return {
    props: { user: null },
  };
}

export default Signin;
