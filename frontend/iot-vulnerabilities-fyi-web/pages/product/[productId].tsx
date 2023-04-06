import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Text } from '@nextui-org/react'
import Layout from '@/components/Layout'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from "framer-motion";
import VersionDetails from '@/components/VersionDetails'
import BackArrowComponent from '@/components/BackArrowComponent'



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



export default function Product() {
  const [selectedId, setSelectedId] = useState<null | string>(null)
  const [openVersionModal, setOpenVersionModal] = useState(false)

  return (
    <>
      <Layout>
        <div className='w-full flex flex-col justify-center items-center gap-[100px] py-[100px] px-[80px]'>

          <div className='w-full'>
            <BackArrowComponent />

                        
            <div className=' text-[30px] font-[600] text-black/60 my-[20px]'>
              Echo
            </div>


            <div className='w-full flex flex-row justify-start items-center flex-wrap bg-slate-100 rounded-[20px]  gap-[30px] p-[20px]'>
              {productVersions.slice(0, 10).map((item, index) => {
                return (
                  <button 
                    key={index} 
                    className='w-[150px] h-[150px] flex flex-col justify-center items-center bg-slate-200 font-[500] rounded-[20px] hover:bg-slate-300 transition-all'
                    onClick={() => {
                      setOpenVersionModal(true)

                    }}
                  >
                    {item.version}
                  </button>
                )
              })}
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