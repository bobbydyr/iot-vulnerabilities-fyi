import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Loading, Text } from '@nextui-org/react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { type } from 'os'
import { fetchData, get_all_companies, get_all_devices } from '@/utilities/ApiManager'
import { Company, Product } from '@/utilities/types'


const companies = [
  "Amazon", "Xiaomi", "Google", "Apple", "Microsoft", "Samsung", "Huawei", "Facebook", "Intel", "Qualcomm", "Cisco", "Nvidia", "Dell", "VMware", "Oracle", "IBM", "HP", "Cisco", "Toshiba", "Sony", "LG", "ZTE", "Lenovo", "Broadcom", "Hewlett Packard", "Hewlett-Packard", "Hewlett Packard Enterprise", "Hewlett-Packa"
]

const products = [
  "Echo", "Xiaomi Camera", "Google Home", "Apple HomePod", "Microsoft Surface", "Samsung Galaxy", "Huawei Mate", "Facebook Portal", "Intel Core", "Qualcomm Snapdragon", "Cisco Webex", "Nvidia GeForce", "Dell XPS", "VMware vSphere", "Oracle Database", "IBM Cloud", "HP Elite", "Cisco Webex", "Toshiba Satellite", "Sony PlayStation", "LG G", "ZTE Axon", "Lenovo ThinkPad", "Broadcom BCM", "Hewlett Packard", "Hewlett-Packard", "Hewlett Packard Enterprise", "Hewlett-Packa"
]


export default function Home() {
  const { push } = useRouter()
  const [companiesData, setCompaniesData] = useState<Company[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);

  const getAllDevices = async () => {
    const products = await get_all_devices();
    if (products) {
      setProductsData(products['message']);
    }
  }

  const getAllCompanies = async () => {
    const companies = await get_all_companies();
    if (companies) {
      setCompaniesData(companies['message']);
    }
  }

  useEffect(() => {
    getAllCompanies();
    getAllDevices();
  }, [])


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
              {companiesData.length == 0 ? (
                  <Loading
                    size='md'
                    color='primary'
                  />
                ) : null
              }

              {companiesData && companiesData?.slice(0, 100).map((item, index) => {
                return (
                  <button 
                    key={index} 
                    className='w-[150px] h-[150px] flex flex-col justify-center items-center bg-slate-200 font-[500] rounded-[20px] hover:bg-slate-300 transition-all p-2'
                    onClick={() => {
                      push(`/company/${item.id}`)
                    }}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>


            <div className=' text-[30px] font-[600] text-black/60 my-[20px]'>
              View by products
            </div>
            <div className='w-full flex flex-row justify-start items-center flex-wrap bg-slate-100 rounded-[20px]  gap-[30px] p-[20px]'>
              {productsData.length == 0 ? (
                  <Loading
                    size='md'
                    color='primary'
                  />
                ) : null
              }
              {productsData && productsData.slice(0, 100).map((item, index) => {
                return (
                  <button 
                    key={index} 
                    className='w-[150px] h-[150px] flex flex-col justify-center items-center bg-slate-200 font-[500] rounded-[20px] hover:bg-slate-300 transition-all p-2'
                    onClick={() => {
                      push(`/product/${item.id}`)
                    }}
                  >
                    {item.deviceName}
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
