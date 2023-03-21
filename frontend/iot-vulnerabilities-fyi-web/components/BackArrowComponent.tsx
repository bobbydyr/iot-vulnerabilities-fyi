import { useRouter } from 'next/router'
import React from 'react'
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

type Props = {
  href?: string
}

const BackArrowComponent = ({href}: Props) => {
  const {push} = useRouter()
  return (
    <button 
      className='w-[100px] h-[50px] px-3 rounded-full bg-slate-100 flex flex-row justify-around items-center text-gray-600 hover:text-black hover:bg-slate-200 transition-all'
      onClick={() => {
        if (href) {
          push(href)
        } else {
          window.history.back()
        }
      }}
    >
      <HiOutlineArrowNarrowLeft className='text-[24px]'/>
      Back
    </button>
  )
}

export default BackArrowComponent