import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Text } from '@nextui-org/react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'


const companies = [
  "Amazon", "Xiaomi", "Google", "Apple", "Microsoft", "Samsung", "Huawei", "Facebook", "Intel", "Qualcomm", "Cisco", "Nvidia", "Dell", "VMware", "Oracle", "IBM", "HP", "Cisco", "Toshiba", "Sony", "LG", "ZTE", "Lenovo", "Broadcom", "Hewlett Packard", "Hewlett-Packard", "Hewlett Packard Enterprise", "Hewlett-Packa"
]

const products = [
  "Echo", "Xiaomi Camera", "Google Home", "Apple HomePod", "Microsoft Surface", "Samsung Galaxy", "Huawei Mate", "Facebook Portal", "Intel Core", "Qualcomm Snapdragon", "Cisco Webex", "Nvidia GeForce", "Dell XPS", "VMware vSphere", "Oracle Database", "IBM Cloud", "HP Elite", "Cisco Webex", "Toshiba Satellite", "Sony PlayStation", "LG G", "ZTE Axon", "Lenovo ThinkPad", "Broadcom BCM", "Hewlett Packard", "Hewlett-Packard", "Hewlett Packard Enterprise", "Hewlett-Packa"
]

export default function Home() {
  const { push } = useRouter()

  return (
    <>
      <Layout>
        <div className='w-full flex flex-col justify-center items-center gap-[100px] py-[100px] px-[80px]'>

          <div className='w-full'>
            <div className='p-4 bg-slate-100 rounded-[20px] flex flex-row justify-center items-center text-gray-500'>
              Post a new vulnerability here 
              <button className='px-5 py-2 bg-slate-200 mx-2 rounded-full hover:bg-slate-300 transition-all'>
                Create
              </button>
            </div>
            <div className=' text-[30px] font-[600] text-black/60 my-[20px]'>
              View by companies
            </div>
            <div className='w-full flex flex-row justify-start items-center flex-wrap bg-slate-100 rounded-[20px]  gap-[30px] p-[20px]'>
              {companies.slice(0, 10).map((item, index) => {
                return (
                  <button 
                    key={index} 
                    className='w-[150px] h-[150px] flex flex-col justify-center items-center bg-slate-200 font-[500] rounded-[20px] hover:bg-slate-300 transition-all'
                    onClick={() => {
                      push("/company/1")
                    }}
                  >
                    {item}
                  </button>
                )
              })}
            </div>


            <div className=' text-[30px] font-[600] text-black/60 my-[20px]'>
              View by products
            </div>
            <div className='w-full flex flex-row justify-start items-center flex-wrap bg-slate-100 rounded-[20px]  gap-[30px] p-[20px]'>
              {products.slice(0, 10).map((item, index) => {
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
