import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Loading, Text } from '@nextui-org/react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { HiArrowNarrowLeft } from "react-icons/hi";
import BackArrowComponent from '@/components/BackArrowComponent'
import { Company, Product } from '@/utilities/types'
import { useEffect, useState } from 'react'
import { get_all_companies, get_devices_by_company } from '@/utilities/ApiManager'




const amazonProducts = [
  "Echo", "kindle", 
]


export default function CompanyPage() {
  const {push} = useRouter()
  const {companyId} = useRouter().query;
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [companiesData, setCompaniesData] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company>();

  const getDevicesByCompany = async (company_id: number) => {
    setProductsLoading(true);
    const products = await get_devices_by_company(company_id);
    setProductsLoading(false);
    console.log(products);
    setProductsData(products['message']);
  }

  const getAllCompanies = async (companyId_: number) => {
    const companies = await get_all_companies();
    setSelectedCompany(companies['message'].find((item: Company) => item.id == companyId_));
  }


  useEffect(() => {
    if (companyId) {
      getAllCompanies(Number(companyId));
      getDevicesByCompany(Number(companyId));
    }
  }, [companyId])


  return (
    <>
      <Layout>
        <div className='w-full flex flex-col justify-center items-center gap-[100px] py-[100px] px-[80px]'>

          <div className='w-full'>
            <BackArrowComponent />
            
            <div className=' text-[30px] font-[600] text-black/60 my-[20px]'>
              {selectedCompany?.name}
            </div>
            <div className='w-full flex flex-row justify-start items-center flex-wrap bg-slate-100 rounded-[20px]  gap-[30px] p-[20px]'>
              {productsData.length == 0 ? (
                  <Loading
                    size='md'
                    color='primary'
                  />
                ) : null
              }

              {productsData && productsData?.slice(0, 100).map((item, index) => {
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

              {(!productsLoading && productsData.length ==0 ) ?? 
                <div>No Data</div>
              }

            </div>
          </div>
        </div>


      </Layout>
    </>
  )
}
