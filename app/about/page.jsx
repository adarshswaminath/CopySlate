import Link from "next/link";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

function Page() {
  return (
    <div className="p-6 min-h-screen side-jump">
      <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h3 className="font-bold text-xl md:text-2xl mb-4 md:mb-0">
            About The Project
          </h3>
          <div className="flex gap-4 items-center">
            <Link href="https://github.com/adarshswaminath/CopySlate">
              <AiFillGithub className="text-2xl hover:text-[#8902f5] hover:animate-bounce transition duration-300" />
            </Link>
            <Link href="https://twitter.com/AdarshS002">
              <AiFillTwitterCircle className="text-2xl hover:text-[#8902f5] hover:animate-bounce transition duration-300" />
            </Link>
          </div>
        </div>
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 mt-4">
          Introducing CopySlate, the innovative solution for personalized
          instant online text sharing. With CopySlate, you not only get the
          power to instantly share text globally but also the ability to create
          your own unique link for a personalized touch. Simply visit{" "}
          <a
            href="/"
            className="underline decoration-[#8902f5]"
            target="_blank"
          >
            copyslate.vercel.app
          </a>
          , input your text, generate your personalized URL on the spot,
          customize it with your chosen link name (e.g.,
          copyslate.vercel.app/your_custom_link), and effortlessly share it via
          email, messaging apps, or social media. Recipients can access your
          shared text from anywhere using their web browser. Experience the
          future of text sharing now and enhance your online communication with
          CopySlate.
        </p>
      </div>
    </div>
  );
}

export default Page;
