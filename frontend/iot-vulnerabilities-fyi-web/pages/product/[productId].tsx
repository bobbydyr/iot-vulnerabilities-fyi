import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Loading, Text } from '@nextui-org/react'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from "framer-motion";
import VersionDetails from '@/components/VersionDetails'
import BackArrowComponent from '@/components/BackArrowComponent'
import { useRouter } from 'next/router'
import { get_all_devices, get_vulnerabilities_by_device } from '@/utilities/ApiManager'
import { Product, Vulnerability } from '@/utilities/types'



const productVersions = [
  {
    "version": "V1.0",
    "vulnerabilities": [
      "Weak authentication and authorization mechanisms that allow unauthorized access to sensitive data or control of the device.",
      "Lack of encryption or inadequate encryption methods, which can leave data transmissions vulnerable to interception or tampering.",
      "Insecure network connections or improperly configured firewalls, which may permit network intrusion or man-in-the-middle attacks."
    ]
  },
  {
    "version": "V2.0",
    "vulnerabilities": [
      "Exploitable firmware or software bugs that can be used to bypass security controls or gain unauthorized access to the device.",
      "Malicious firmware or software that is installed on the device during manufacturing or in the supply chain process.",
      "Physical vulnerabilities, such as easy-to-break casing or external ports, can allow attackers to physically access the device and tamper with it."
    ]
  },
  {
    "version": "V3.0",
    "vulnerabilities": [
      "Eavesdropping vulnerabilities that allow attackers to intercept data transmissions between the device and other connected devices or networks.",
      "Lack of security updates or patches, which can leave known vulnerabilities unaddressed and expose the device to exploits.",
      "Incompetent or sloppy design that allows unauthorized access to device features, data, or control functions."
    ]
  },
]



export default function ProductPage() {
  const [selectedId, setSelectedId] = useState<null | string>(null)
  const [openVersionModal, setOpenVersionModal] = useState(false)
  const {productId} = useRouter().query;
  const [vulnerabilitiesData, setVulnerabilitiesData] = useState<Vulnerability[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [vulLoading, setVulLoading] = useState(true);


  const getVulnerabilitiesByDevice = async (id: number) => {
    setVulLoading(true);
    const vulnerabilities = await get_vulnerabilities_by_device(id);
    setVulLoading(false);
    console.log(vulnerabilities);
    if (vulnerabilities) {
      setVulnerabilitiesData(vulnerabilities['message']);
    }
  }

  const getSelectedDevice = async (productId_: number) => {
    const productsRaw = await get_all_devices();
    if (productsRaw) {
      const products = productsRaw['message'];
      setSelectedProduct(products.filter((item: Product) => item.id === productId_)[0])
    }
  }

  useEffect(() => {
    if (productId) {
      getVulnerabilitiesByDevice(Number(productId));
      getSelectedDevice(Number(productId));
    }
  }, [productId])


  return (
    <>
      <Layout>
        <div className='w-full flex flex-col justify-center items-center gap-[100px] py-[100px] px-[80px]'>

          <div className='w-full'>
            <BackArrowComponent />
                        
            <div className=' text-[30px] font-[600] text-black/60 my-[20px]'>
              {selectedProduct?.deviceName}
            </div>


            <div className='w-full flex flex-row justify-start items-center flex-wrap bg-slate-100 rounded-[20px]  gap-[30px] p-[20px]'>
              
              {
                vulLoading ? (
                  <Loading 
                    size='md'
                    color='primary'
                  />
                ) : null
              }

              {vulnerabilitiesData && vulnerabilitiesData?.slice(0, 100).map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      className='p-4 flex flex-col justify-center items-left bg-slate-200 font-[500] rounded-[20px] hover:bg-slate-300 transition-all'
                    >
                      <span className='my-[20px] font-bold text-[18px]'>
                        Vulnerability ID: {item.cveID}
                      </span>
                      <span>{item.summary}</span>
                      <div className='p-1 mt-4 bg-pink-200 w-[200px] flex justify-center items-center rounded-xl text-sm'>
                        {item.cveID}
                      </div>

                      <span className='my-[20px] text-[16px]'>
                        More Details on
                        <a 
                          className='text-blue-500 hover:text-blue-700 transition-all'
                          href={`https://nvd.nist.gov/vuln/detail/${item.cveID}`}> NIST</a>
                      </span>
                    </div>
                  </div>
                )
              })}


              {(!vulLoading && vulnerabilitiesData.length ==0 ) ?? 
                <div>No Data</div>
              }
            </div>
 
          </div>
        </div>

        {openVersionModal ? (
          <VersionDetails 
            visibleState={[openVersionModal, setOpenVersionModal]} 
            data={{
              "version": "V1.0",
              "vulnerabilities": [
                "Weak authentication and authorization mechanisms that allow unauthorized access to sensitive data or control of the device.",
                "Lack of encryption or inadequate encryption methods, which can leave data transmissions vulnerable to interception or tampering.",
                "Insecure network connections or improperly configured firewalls, which may permit network intrusion or man-in-the-middle attacks."
              ]
            }}  
          />
        ) :null}


      </Layout>
    </>
  )
}
