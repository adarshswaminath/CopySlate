import Link from "next/link";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

function Page() {
  return (
    <div className="p-6 min-h-screen side-jump">
      <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">About The Project</h3>
        <h2 className="m-3 flex gap-4 items-center">
          <Link href="https://github.com/adarshswaminath/CopySlate">
            <AiFillGithub className="text-2xl hover:text-[#8902f5]" />
          </Link>
          <Link href="https://twitter.com/AdarshS002">
            <AiFillTwitterCircle className="text-2xl hover:text-[#8902f5]" />
          </Link>
        </h2>
        </div>
        <p className="text-lg text-gray-200">
          Experience messaging like never before with CopySlate! Craft your
          own custom messages and generate short-lived links for sharing.
          CopySlate is built on a modern and efficient technology stack that
          ensures a seamless and engaging messaging experience. We leverage
          Next.js, a powerful React framework, for server-side rendering and
          dynamic routing, enhancing user interactions and loading times. Our
          styling is powered by Tailwind CSS, a utility-first framework that
          ensures consistent and responsive designs across devices. We store and
          manage message data using MongoDB with Prisma, simplifying database
          interactions and ensuring type-safe queries through TypeScript. This
          robust stack guarantees a user-friendly interface, efficient data
          management, and a structured, type-safe codebase. Join us in making
          CopySlate even better by contributing your ideas, raising issues,
          and collaborating to enhance the messaging experience for all.<Link href="/create-message" className="text-[#8902f5]">Create Message</Link>
        </p>
      </div>
    </div>
  );
}

export default Page;