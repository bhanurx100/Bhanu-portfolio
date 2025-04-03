"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    try {
      const response = await fetch(endpoint, options);
      const resData = await response.json();

      if (response.status === 200) {
        console.log("Message sent:", resData);
        setEmailSubmitted(true);
      } else {
        throw new Error(resData.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setError(error.message || "Failed to send email. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative">
      <div className="z-10">
        <h5 className="text-xl font-bold text-green-300 my-2 drop-shadow-lg">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md drop-shadow-md">
          I&apos;m currently looking for new opportunities, my inbox is always open.
          Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/bhanurx100">
            <Image src="/github.svg" alt="Github Icon" width={40} height={40} />
          </Link>
          <Link href="https://linkedin.com/in/bhanurx100">
            <Image src="/linkedin.svg" alt="Linkedin Icon" width={40} height={40} />
          </Link>
          <Link href="https://leetcode.com/Bhanucode/">
            <Image src="/leetcode.svg" alt="Leetcode Icon" width={40} height={40} />
          </Link>
        </div>
      </div>
      <div>
      {emailSubmitted ? (
          <div className="text-green-500 text-sm mt-2 drop-shadow-md">
            <p className="text-lg font-semibold">Thank you for your message!</p>
            <p>I’ll get back to you soon.</p>
          </div>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium drop-shadow-md"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="bhanuprasad.0921@gmail.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium drop-shadow-md"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium drop-shadow-md"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mb-4 drop-shadow-md">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;