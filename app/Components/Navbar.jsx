"use client"
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

function Navbar() {
  const [show, setShow] = useState(false); // State to control mobile menu visibility

  return (
    <div className='p-2 flex justify-between items-center bg-black/10 bg:blur backdrop-blur sticky top-0 left-0'>
      <div className='flex items-center'>
        <Link href='/' className='font-bold text-xl'>
        CopySlate
        </Link>
      </div>
      <Link href="/about" className='px-4 py-1.5 bg-gradient-to-r from-[#ca03f2] to-[#8902f5] rounded-full font-bold'>
            About
          </Link>
    </div>
  );
}

export default Navbar;
