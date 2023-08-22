"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FaRegCopy } from "react-icons/fa";
import { usePathname } from "next/navigation";
import ParticlesBg from "particles-bg";
import { useRouter } from "next/navigation";

function formatMessage(message) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const formattedMessage = message.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank className="underline decoration-[#8902f5]">${url}</a>`;
  });

  return formattedMessage;
}

function Page() {
  const router = useRouter();
  const [message, setMessage] = useState("Loading...");
  const pathname = usePathname();
  const api = "/api/user/" + pathname.substring(1);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(message);
    alert("Message copied to clipboard");
  }, [message]);

  useEffect(() => {
    fetch(api)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.post && data.post.message !== null) {
          setMessage(data.post.message);
        } else {
          router.push("/create-message");
          console.log("data");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("The path is expired...");
        setTimeout(() => {
          router.push("/create-message");
        }, 100);
      });
  }, []);

  const shouldRenderParticles =
    message !== "The path is expired..." && message !== "Loading...";

  return (
    <div className="p-3">
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg h-auto relative">
        <div className="justify-between top-2 right-2 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-red-500 w-3 h-3 rounded-full"></div>
            <div className="bg-yellow-500 w-3 h-3 rounded-full"></div>
            <div className="bg-green-500 w-3 h-3 rounded-full"></div>
          </div>
          <button
            onClick={copyToClipboard}
            className="hover:text-gray-300"
            title="Copy Message"
          >
            <FaRegCopy />
          </button>
        </div>
        <div className="flex items-center gap-3 mb-2">
          {/* Use dangerouslySetInnerHTML to render formatted message */}
          <div
            className="text-white break-all mt-6"
            dangerouslySetInnerHTML={{ __html: formatMessage(message) }}
          ></div>
        </div>
      </div>
      {/* Use shouldRenderParticles to conditionally render particles */}
      {shouldRenderParticles && <ParticlesBg num={200} type="lines" bg={true} />}
    </div>
  );
}

export default Page;
