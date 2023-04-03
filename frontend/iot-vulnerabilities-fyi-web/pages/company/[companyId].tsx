import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Text } from '@nextui-org/react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { HiArrowNarrowLeft } from "react-icons/hi";
import BackArrowComponent from '@/components/BackArrowComponent'




const amazonProducts = [
  "Echo", "kindle", 
]



export default function Company() {
  const {push} = useRouter()

  return (
    <>
      <Layout>
        <div className='w-full flex flex-col justify-center items-center gap-[100px] py-[100px] px-[80px]'>

          <div className='w-full'>
            <BackArrowComponent />
            
            <div className=' text-[30px] font-[600] text-black/60 my-[20px]'>
              Amazon
            </div>
            <div className='w-full flex flex-row justify-start items-center flex-wrap bg-slate-100 rounded-[20px]  gap-[30px] p-[20px]'>
              {amazonProducts.slice(0, 10).map((item, index) => {
                return (
                  <button 
                    key={index} 
                    className='w-[150px] h-[150px] flex flex-col justify-center items-center bg-slate-200 font-[500] rounded-[20px] hover:bg-slate-300 transition-all'
                    onClick={() => {
                      push("/product/1")
                    }}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </div>
        </div>


      </Layout>
    </>
  )
}
