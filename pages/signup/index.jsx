import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import bcrypt from "bcryptjs";
import { parse } from 'cookie';

const importScript = src => {
    const credScript = document.createElement('script');
    credScript.type = 'text/javascript';
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
    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)
}

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
                    type={isVisible ? "text" : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <Image
                        className="cursor-pointer"
                        onClick={() => setIsVisible(!isVisible)}
                        src="/eye.svg"
                        alt="eye"
                        width={24}
                        height={24}
                    />
                )}
            </div>
        </div>
    );
};

const Signin = (prop) => {

    useEffect(() => {
        importScript("https://accounts.google.com/gsi/client");
    }, []);

    const [buttonText, setButtonText] = useState('Create Account')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText('Creating...');
        const form = new FormData();
        const hashedPassword = await bcrypt.hash(formData.password.trim(), 10);
        form.append('username', formData.firstName + ' ' + formData.lastName);
        form.append('email', formData.email);
        form.append('phone', formData.phone);
        form.append('hashedPassword', hashedPassword);

        try {
            const response = await fetch('/api/addPwdSession', {
                method: 'POST',
                body: form
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (response.status === 200) {
                window.location.href = '/profile';
            } else {
                setButtonText('Create Account');
            }

            const result = await response.json();
            console.log('Form submitted successfully:', result);
        } catch (error) {
            setButtonText('Create Account');
            console.error('Error submitting form:', error);
        }
    };
  return (
   <div className="mt-[55px] mb-[41px] lg:mb-[152px] lg:pl-[70px] w-full flex flex-col lg:flex-row lg:gap-[57px] xl:gap-x-[152px] justify-center lg:justify-start items-center overflow-x-hidden">
    <div className="mb-[46px] lg:mb-0 w-full lg:w-[560px] px-11 sm:px-[50px] lg:px-0 flex flex-col justify-center items-start">
        {/* Title */}
        <div className="w-full flex flex-col gap-y-3">
            <p className="text-[32px] leading-8 font-normal capitalize text-[#070707]">
                Welcome back
            </p>
            <p className="w-[266px] sm:w-full text-sm leading-[22.4px] font-medium text-[#8E8F94]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </div>

        {/* Google and Apple Authentication */}
        <div className="mt-[42px] sm:mt-[52px] w-full flex flex-col justify-center sm:flex-row gap-y-4 sm:gap-x-4">
            <div id="g_id_onload"
                data-client_id="704145836182-04mlgm7nhg2n4sjqno7vlh172427g778.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleCredentialResponse"
                data-auto_prompt="false">
            </div>

            <div className="g_id_signin"
                data-type="standard"
                data-shape="pill"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="center"
                data-width="400">
            </div>
        </div>

        {/* Or */}
        <div className="my-8 w-[560px] flex gap-x-2 items-center">
            <div className="w-full h-[1px] bg-[#E4E4E4]" />
            <p className="text-base leading-[25.6px] font-medium text-[#070707]">
                or
            </p>
            <div className="w-full h-[1px] bg-[#E4E4E4]" />
        </div>
   


        {/* Form */}
              <div className="w-full">
                  <form className="w-full flex flex-col gap-y-6" onSubmit={handleSubmit}>
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

      <div className="flex justify-center items-center">
        {/* Image */}
        <div className="w-[345.65px] h-[373px] lg:w-[548.65px] lg:h-[592px] xl:w-[815.65px] xl:h-[880px]">
          <Image
            className="w-full h-full"
            src="/signinImg.png"
            alt="img"
            width={345.65}
            height={373}
          />
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
            const usersRef = db.collection('users');
            const querySnapshot = await usersRef.where('sessionToken', '==', sessionToken).get();

            const users = [];
            querySnapshot.forEach(doc => {
                users.push({ id: doc.id, ...doc.data() });
            });

            const user = users[0];
            if (user) {
                return {
                    redirect: {
                        destination: '/profile',
                        permanent: false,
                    },
                };
            }
        } else {
            return {
                props: { user: null },
            }
        }
    }
    return {
        props: { user: null },
    }
}

export default Signin;
