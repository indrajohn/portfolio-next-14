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
        setToastMessage("Error sending data.");
        setToastType("error");
      }
    } catch (error) {
      setToastMessage("There was an error sending the data.");
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
      }, 3000); // Clears the toast message after 3 seconds
    }
    return () => {
      clearTimeout(toastTimer); // Cleanup timeout when the component unmounts
    };
  }, [toastMessage]);
  return (
    <section
      id="contact"
      data-aos="zoom-in"
      data-aos-duration="1500"
      className="bg-[#1f242d] min-h-screen text-white p-6"
    >
      <div className="text-center m-8">
        <h1 className="text-3xl font-bold">
          Contact
          <span className="text-3xl font-bold text-[#0ef] mx-2">Me</span>
        </h1>
      </div>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white text-black rounded-lg p-6"
        >
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label
                className="block text-[#0ef] text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                placeholder="Your full name"
                name="fullName"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label
                className="block text-[#0ef] text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your email address"
                name="email"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label
                className="block text-[#0ef] text-sm font-bold mb-2"
                htmlFor="mobileNumber"
              >
                Mobile Number
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mobileNumber"
                type="tel"
                placeholder="Your mobile number"
                name="mobileNumber"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label
                className="block text-[#0ef] text-sm font-bold mb-2"
                htmlFor="emailSubject"
              >
                Email Subject
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="emailSubject"
                type="text"
                placeholder="Email subject"
                name="emailSubject"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full px-2 mb-4">
              <label
                className="block text-[#0ef] text-sm font-bold mb-2"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="Your message"
                name="message"
                required
              ></textarea>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-[#0ef] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
          {toastMessage && (
            <div
              className={`toast-message flex flex-row items-center justify-center rounded p-2 m-4 ${
                toastType === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {toastMessage}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
