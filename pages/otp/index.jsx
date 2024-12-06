import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const OtpInput = dynamic(() => import("otp-input-react"), {
  ssr: false,
});

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha resolved");
        },
        "expired-callback": () => {
          console.log("Recaptcha expired");
        },
      });
      setRecaptchaVerifier(verifier);

      return () => {
        verifier.clear();
      };
    }
  }, []);

  function onSignup() {
    if (!ph) {
      toast.error("Please enter a phone number");
      return;
    }

    if (!recaptchaVerifier) {
      toast.error("Recaptcha not initialized");
      return;
    }

    setLoading(true);

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("OTP Send Error:", error);
        toast.error(`Failed to send OTP: ${error.message}`);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setUser(res.user);
        setLoading(false);
        toast.success("Login Successful!");
      })
      .catch((err) => {
        console.error("OTP Verification Error:", err);
        toast.error(`OTP Verification Failed: ${err.message}`);
        setLoading(false);
      });
  }

  return (
    <section className="bg-[#fffbf7] flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-black font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-primaryMain font-medium text-3xl mb-6">
              Welcome to <br /> Auto Verdure
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-black w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-black text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-black w-full flex gap-1 items-center justify-center py-2.5 text-black rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-black w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-black text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-primaryMain w-full flex gap-1 items-center justify-center py-2.5 text-black rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
