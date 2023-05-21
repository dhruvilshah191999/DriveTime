/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import "@/app/globals.css";
import "@/app/home.css";
import home from "@/public/assets/home.png";
import driveTime from "@/public/assets/DriveTime.svg";
import camera from "@/public/assets/camera.png";
import upload from "@/public/assets/upload.png";
import Image from "next/image";
import { firstCapital, getDocumentName } from "@/utils/common-functions";
import useStore from "@/store/useStore";
import loader from "@/public/assets/Eclipse.svg";
import { GetServerSideProps } from "next";

function CategoryPage({ category }: { category: string }) {
  const { applicant } = useStore();
  const router = useRouter();

  React.useEffect(() => {
    if (applicant) {
      if (!applicant.categories[category]) {
        router.push("/");
      }
    }
  }, [applicant]);

  const renderColor = (str: string) => {
    switch (str) {
      case "missing":
        return "#1976D2";
      case "inProgress":
        return "#ED6C02";
      case "underReview":
        return "#2E7D32";
      default:
        return "#1976D2";
    }
  };

  return (
    <Layout>
      {!applicant ? (
        <div className="flex items-center justify-center min-h-screen">
          <Image src={loader} alt="/" />
        </div>
      ) : (
        <>
          {applicant.categories[category] && (
            <>
              <div>
                <Head>
                  <title>Category Page</title>
                  <meta
                    property="og:title"
                    content="My page title"
                    key="title"
                  />
                </Head>
              </div>
              <div className="p-[20px]">
                <div className="flex relative w-[100%]">
                  <div className="flex items-center justify-center">
                    <Image
                      src={home}
                      alt="/"
                      width={30}
                      height={30}
                      className="cursor-pointer"
                      onClick={() => router.push("/")}
                    />
                    <p className="ml-[10px] mt-[3px] font-semibold text-[14px] text-[black]">
                      {" "}
                      <span className="">&#62;</span> {firstCapital(category)}
                    </p>
                  </div>
                  <div className="absolute top-[-10px] right-0">
                    <Image src={driveTime} alt="/" />
                  </div>
                </div>
                <div className="mt-[60px]">
                  <div className="bg-[white] rounded-[12px] min-h-[50px] w-[100%] p-[25px]">
                    <div className="relative flex">
                      <p className="cardTitle font-bold">
                        {firstCapital(category)}
                      </p>
                      <p
                        className={`bg-[${renderColor(
                          applicant?.categories[category]?.status
                        )}] status absolute right-0`}
                      >
                        {" "}
                        {applicant?.categories[category]?.status === "missing"
                          ? "New"
                          : firstCapital(
                              applicant?.categories[category]?.status
                            )}
                      </p>
                    </div>
                    <div className=" mt-[20px] flex items-center">
                      <div className="bg-[#008350] w-[12px] h-[12px] rounded-[50%]"></div>
                      <p className="text-[14px] ml-[15px] text-[black] font-medium">
                        Verify Your Identity
                      </p>
                    </div>
                  </div>
                  <div className="mt-[24px]">
                    <h1 className="text-black text-[24px] font-semibold">
                      Upload <span className="underline">any</span> of these
                      documents
                    </h1>
                  </div>
                  <section className="mt-[20px]">
                    {applicant.categories[category]?.documents &&
                      Object.keys(
                        applicant.categories[category]?.documents
                      ).map((document, i) => (
                        <>
                          <div className="document-container">
                            <p>{getDocumentName(document)}</p>
                            <div className="button-group">
                              <Image src={camera} alt="camera" />
                              <Image src={upload} alt="upload" />
                            </div>
                          </div>
                          {i !==
                            Object.keys(
                              applicant.categories[category]?.documents
                            )?.length -
                              1 && (
                            <div className="document-line">
                              <div className="line"></div>
                              <p>or</p>
                              <div className="line"></div>
                            </div>
                          )}
                        </>
                      ))}
                  </section>
                  <section className="mt-[30px] mb-[10px]">
                    <div className="border-[1px] border-solid border-[#008350] w-[100%] p-[20px] rounded-[6px] text-center">
                      <p className="text-[#008350] text-[16px] font-[500]">
                        Skip for later
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
}

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const category = ctx.params?.category as string;
  if (!category) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      category: category[0],
    },
  };
};
