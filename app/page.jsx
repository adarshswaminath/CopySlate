"use client"
import Link from "next/link";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { BiLogoGithub } from "react-icons/bi"

const Terminal = ({ message }) => {
  return (
    <div className="side-jump bg-gray-900 text-white p-4 rounded-lg shadow-lg h-44 w-96 relative">
      <div className="justify-between top-2 right-2 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-red-500 w-3 h-3 rounded-full"></div>
          <div className="bg-yellow-500 w-3 h-3 rounded-full"></div>
          <div className="bg-green-500 w-3 h-3 rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="text-white break-all mt-6">
          <TypeAnimation sequence={[`${message}`, 500]} deletionSpeed={90} />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isGet, setIsGet] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid">
        <div className="max-w-5xl p-8 mx-auto text-center">
          <h3 className="animate-jump text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d30cf3] to-[#0c6efa]">
              CopySlate
            </span>{" "}
            Share text instantly across devices with CopySlate.vercel.app. Enter data in a URL, access it anywhere
          </h3>
          <div className="flex gap-2 items-center justify-center">
          <Link href="/create-message">
            <button className="mt-6 inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:text-white hover:bg-transparent hover:border-white border transition-all duration-300 border-white">
              Create Message
            </button>
          </Link>
          <Link href="https://github.com/adarshswaminath/CopySlate">
            <button className="mt-6 flex gap-2 items-center px-8 py-3 rounded-full font-bold text-white hover:bg-transparent border-white border transition-all duration-300 ">
              Star <BiLogoGithub className="text-xl"/> 
            </button>
          </Link>
          </div>
        </div>
        {/* API */}
        <div>

          {/* Terminals */}
          <div className="grid gap-3 lg:flex items-center justify-center text-center p-3">
    
              {/* // GET */}
              <div className="flex-col items-center">
                <h3 className="font-bold text-left">POST</h3>
                <Terminal
                  message={`curl -X POST "https://copyslate.vercel.app//api/user" -H "Content-Type: application/json" -d '{
                    "message": "your message",
                    "route": "your-path",
                    "expireDate": expireDate
                    // expireDate:["5", "10", "30", "60", "7", "24", "31"]
                  }'
                  `}
                />
              </div>
     
              {/* // POST */}
              <div className="flex-col items-center">
                <h3 className="font-bold text-left">GET</h3>
                <Terminal message={`curl https://copyslate.vercel.app/api/user/{your_path_name}`} />
              </div>
       
          </div>
        </div>
      </div>
    </div>
  );
}
