import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Button, Loading, Modal, Switch, Text } from "@nextui-org/react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type } from "os";
import {
  fetchData,
  get_all_companies,
  get_all_devices,
} from "@/utilities/ApiManager";
import { Company, Product } from "@/utilities/types";
import { BsFilterCircle } from "react-icons/bs";

export default function CompanyIndex() {
  const { push } = useRouter();
  const [companiesData, setCompaniesData] = useState<Company[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);

  const getAllDevices = async () => {
    const products = await get_all_devices();
    if (products) {
      setProductsData(products["message"]);
    }
  };

  const getAllCompanies = async () => {
    const companies = await get_all_companies();
    if (companies) {
      setCompaniesData(companies["message"]);
      setSelectedCompanies(
        companies["message"].map((item: Company) => item.id)
      );
      console.log(selectedCompanies);
    }
  };

  useEffect(() => {
    getAllCompanies();
    getAllDevices();
  }, []);

  const closeFilterHandler = () => {
    setShowFilter(false);
    console.log("closed");
  };

  return (
    <>
      <Layout>
        <div className="w-full flex flex-col justify-center items-center gap-[100px] py-[100px] px-[80px]">
          <div className="w-full">
            <div className=" text-[30px] font-[600] text-black/60 my-[20px]">
              View by companies
            </div>
            <div className="w-full flex flex-row justify-start items-center flex-wrap bg-slate-100 rounded-[20px]  gap-[30px] p-[20px]">
              {companiesData.length == 0 ? (
                <Loading size="md" color="primary" />
              ) : null}

              {companiesData &&
                companiesData?.slice(0, 100).map((item, index) => {
                  return (
                    <button
                      key={index}
                      className="w-[150px] h-[150px] flex flex-col justify-center items-center bg-slate-200 font-[500] rounded-[20px] hover:bg-slate-300 transition-all p-2"
                      onClick={() => {
                        push(`/company/${item.id}`);
                      }}
                    >
                      {item.name}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={showFilter}
          onClose={closeFilterHandler}
          width="800px"
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Choose companies to filter
            </Text>
          </Modal.Header>
          <Modal.Body>
            {/* A checkbox what select all companies and deselect */}
            <div className="flex flex-row flex-wrap justify-start items-center gap-[10px]">
              <input
                type="checkbox"
                id="all"
                name="all"
                checked={selectedCompanies.length == companiesData.length}
                value="all"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCompanies(companiesData.map((item) => item.id));
                  } else {
                    setSelectedCompanies([]);
                  }
                }}
              />
              <label htmlFor="all">All</label>
            </div>

            <div className="p-[30px] grid grid-cols-3 gap-2 justify-center items-center">
              {companiesData.length > 0 &&
                companiesData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row flex-wrap justify-start items-center gap-[10px]"
                    >
                      <Switch
                        checked={selectedCompanies.includes(item.id)}
                        color={"primary"}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (selectedCompanies.length == 0) {
                              setSelectedCompanies([item.id]);
                            } else {
                              setSelectedCompanies([
                                ...selectedCompanies,
                                item.id,
                              ]);
                            }
                          } else {
                            setSelectedCompanies(
                              selectedCompanies.filter(
                                (item_) => item_ != item.id
                              )
                            );
                          }
                        }}
                      />

                      <label htmlFor={item.name}>{item.name}</label>
                    </div>
                  );
                })}
            </div>
          </Modal.Body>
        </Modal>
      </Layout>
    </>
  );
}
