"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../utils/motion";

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
    <section id="contact" className="my-12 md:my-12 py-2 relative container mx-auto px-6 sm:px-8 lg:px-12">
      <motion.h5
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-10 drop-shadow-lg text-center"
      >
        Contact
      </motion.h5>
      <motion.div
        variants={slideInFromRight(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 z-10"
      >
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-[#ADB7BE] text-lg sm:text-xl lg:text-2xl mb-6 max-w-md drop-shadow-md">
            I&apos;m currently looking for new opportunities, my inbox is always open.
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          <div className="socials flex flex-row gap-6 mt-6">
            <Link href="https://github.com/bhanurx100" className="hover:opacity-80 transition-opacity">
              <Image src="/github.svg" alt="Github Icon" width={43} height={40} />
            </Link>
            <Link href="https://linkedin.com/in/bhanurx100" className="hover:opacity-80 transition-opacity">
              <Image src="/linkedin.svg" alt="Linkedin Icon" width={40} height={40} />
            </Link>
            <Link href="https://leetcode.com/Bhanucode/" className="hover:opacity-80 transition-opacity">
              <Image src="/leetcode.svg" alt="Leetcode Icon" width={40} height={40} />
            </Link>
            <Link href="https://x.com/Bhanu_rx100" className="hover:opacity-80 transition-opacity">
              <Image src="/x.svg" alt="X Icon" width={50} height={40} />
            </Link>
          </div>
        </div>
        <div>
          {emailSubmitted ? (
            <div className="text-green-500 text-sm mt-2 drop-shadow-md text-center">
              <p className="text-lg font-semibold">Thank you for your message!</p>
              <p>I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div>
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
              <div>
                <label
                  htmlFor="subject"
                  className="text-white block mb-2 text-sm font-medium drop-shadow-md"
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
              <div>
                <label
                  htmlFor="message"
                  className="text-white block mb-2 text-sm font-medium drop-shadow-md"
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
      </motion.div>
    </section>
  );
};

export default EmailSection;