"use client";

import { useEffect, useState } from "react";

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [toastType, setToastType] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToastMessage(null);

    const formData = new FormData(e.target);

    const _data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      mobileNumber: formData.get("mobileNumber"),
      emailSubject: formData.get("emailSubject"),
      message: formData.get("message"),
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_data),
      });

      if (response.ok) {
        setToastMessage("Data sent successfully!");
        setToastType("success");
        e.target.reset();
      } else {
        setToastMessage("Error sending data. Please try again later...");
        setToastType("error");
      }
    } catch (error) {
      setToastMessage(
        "There was an error sending the data. Please try again later..."
      );
      setToastType("error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let toastTimer;
    if (toastMessage) {
      toastTimer = setTimeout(() => {
        setToastMessage(null);
        setToastType(null);
      }, 3000);
    }
    return () => {
      clearTimeout(toastTimer);
    };
  }, [toastMessage]);
  return (
    <section
      id="contact"
      data-aos="zoom-in"
      data-aos-duration="1500"
      className="bg-[#1f242d] min-h-screen text-slate-300 p-6"
    >
      <div className="text-center m-8">
        <h1 className="text-3xl font-bold">
          Contact
          <span className="text-3xl font-bold text-[#0ef] mx-2">Me</span>
        </h1>
      </div>
      <div className=" text-slate-300 p-10">
        <div className="md:grid md:grid-cols-2 space-y-4 space-x-4">
          <div>
            <h2 className="text-6xl font-bold mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="mb-8 text-4xl">Get In Touch With Me</p>

            <p className="mb-8">
              I&apos;m interested in freelance opportunities - especially
              ambitious or large projects. However, if you have other requests
              or questions, don&apos;t hesitate to use the form.
            </p>
          </div>
          <div>
            <form
              className="space-y-4 bg-[#373f4e] p-8 rounded-lg"
              onSubmit={handleSubmit}
            >
              <div className="md:pt-8">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full bg-transparent border-b-2 border-gray-500 text-slate-200 placeholder-gray-400 p-2 focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  required
                  className="w-full bg-transparent border-b-2 border-gray-500 text-slate-200 placeholder-gray-400 p-2 focus:outline-none focus:border-gray-300"
                />
              </div>
              <div>
                <input
                  id="mobileNumber"
                  type="tel"
                  placeholder="Your mobile number"
                  name="mobileNumber"
                  className="w-full bg-transparent border-b-2 border-gray-500 text-slate-200 placeholder-gray-400 p-2 focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <input
                  id="emailSubject"
                  name="emailSubject"
                  type="text"
                  placeholder="Subject"
                  required
                  className="w-full bg-transparent border-b-2 border-gray-500 text-slate-200 placeholder-gray-400 p-2 focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write me a message"
                  className="w-full bg-transparent border-b-2 border-gray-500 text-slate-200 placeholder-gray-400 p-2 focus:outline-none focus:border-gray-300"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-400 text-slate-100 px-6 py-2 rounded-full hover:bg-teal-500 focus:outline-none focus:bg-teal-500"
                >
                  {loading ? "Loading..." : "Send"}
                </button>
              </div>
              {toastMessage && (
                <div
                  className={`toast-message flex flex-row items-center justify-center rounded-full p-2 m-4 text-xs md:text-md lg:text-lg text-white ${
                    toastType === "success" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {toastMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
