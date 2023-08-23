"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { BiLinkExternal } from "react-icons/bi";
import QRCode from "qrcode.react";
import { saveAs } from "file-saver";
import { FaRegCopy } from "react-icons/fa";
import copy from "copy-to-clipboard";



function Page() {
  const [path, setPath] = useState("");
  const [textarea, setTextarea] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const clearSubmitMessage = () => {
    setSubmitMessage(null);
  };
  // function to post data in db
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(expireDate);
    if (path.trim() === "" || textarea.trim() === "" || expireDate === "") {
      handleSubmissionResult("Fields cannot be empty.", false);
    } else {
      setIsSubmitting(true);
      const data = {
        route: path,
        message: textarea,
        expireDate: expireDate,
      };

      try {
        const response = await axios.post("/api/user", data);
        handleSubmissionResult(
          `Success! You can visit: ${window.location.origin}/${path}`,
          true
        );
      } catch (error) {
        console.log(error.message);
        handleSubmissionResult(
          "Something went wrong. The Path already exists. Please try again.",
          false
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  // message handler
  const handleSubmissionResult = (message, success) => {
    setSubmitMessage(message);
    setIsSuccess(success);
  };

  let expireDateList = [
    { label: "Select Time", duration: 0 },
    { label: "5 minutes", duration: 5 },
    { label: "10 minutes", duration: 10 },
    { label: "30 minutes", duration: 30 },
    { label: "1 hour", duration: 60 },
    { label: "One Day", duration: 24 },
    { label: "One Week", duration: 7 },
    { label: "One Month", duration: 31 },
  ];

  // download qrcode
  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.toBlob((blob) => {
        saveAs(blob, `${path}.png`);
      });
    }
  };
  const urlCopytoClipBoard = useCallback(() => {
   copy(`${window.location.origin}/${path}`)
   alert("Link Copied In Clip Board") 
  })
  return (
    <div className=" bg-black flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/2">
        {submitMessage && (
          <div
            className={`shadow-lg shadow-[#8902f5] p-4 rounded-lg mb-4 ${
              isSuccess ? "bg-[#ca03f2] text-white" : "bg-red-400 text-white"
            }`}
          >
            <div className="flex justify-between">
            <button className="mb-2" onClick={clearSubmitMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <FaRegCopy onClick={urlCopytoClipBoard} className="cursor-pointer"/>
            </div>
            <p className="font-semibold">{submitMessage}</p>
          </div>
        )}
        {/* if form submitted succes diplay qr and hide form */}
        {isSuccess ? (
          <div className="flex flex-col justify-center items-center">
            <QRCode
              title={`${window.location.origin}/${path}`}
              value={`${window.location.origin}/${path}`}
              bgColor="#000"
              fgColor="#fff"
              size={256}
            />
            <p className="mt-4 text-purple-500 text-center cursor-pointer">
              <a
                href={`/${path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold"
              >
                View <BiLinkExternal className="inline-block w-4 h-4" />
              </a>
            </p>
            <button
              className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring"
              onClick={downloadQRCode}
            >
              Download QR Code
            </button>
          </div>
        ) : (
          <div className="relative group side-jump">
            <div className="absolute -inset-2 bg-gradient-to-br from-[#ca03f2] to-[#8902f5] blur-sm opacity-75 group-focus:opacity-100 rounded-lg"></div>
            <form onSubmit={handleFormSubmit} className="relative side-jump space-y-4 bg-black p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="path" className="text-gray-400">
                  e.g: code
                </label>
                <input
                  type="text"
                  name="path"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  className="w-full p-3 border bg-black text-gray-300 focus:outline-none border-purple-500"
                  placeholder="Path name (e.g., code)"
                />
              </div>
              <div>
                <label htmlFor="expire" className="text-gray-400">
                  Destroy after
                </label>
                <select
                  name="expire"
                  onChange={(e) => setExpireDate(e.target.value)}
                  className="w-full  p-3 py-3.5 border bg-black text-gray-300 border-purple-500 rounded-sm"
                >
                  {expireDateList.map((value, id) => (
                    <option key={id} value={value.duration}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <textarea
              value={textarea}
              onChange={(e) => setTextarea(e.target.value)}
              className="w-full p-3 border  bg-black text-gray-300 border-purple-500"
              rows="5"
              placeholder="Your message"
            />
            {isSuccess && submitMessage && (
              <p className="mt-4 text-purple-500 text-center cursor-pointer">
                <a
                  href={`/${path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold"
                >
                  View <BiLinkExternal className="inline-block w-4 h-4" />
                </a>
              </p>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 focus:outline-none focus:ring"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
