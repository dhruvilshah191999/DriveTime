/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import imageLoader from "@/imageLoader";
import "./home.css";
import Layout from "@/components/Layout";
import useStore from "@/store/useStore";
import Image from "next/image";
import React from "react";
import { firstCapital } from "@/utils/common-functions";
import Link from "next/link";

const Home: React.FC = (): JSX.Element => {
  const { applicant } = useStore();

  const renderColor = (str: string) => {
    switch (str) {
      case "missing":
        return "bg-[#1976D2]";
      case "inProgress":
        return "bg-[#ED6C02]";
      case "underReview":
        return "bg-[#2E7D32]";
      default:
        return "bg-[#1976D2]";
    }
  };
  return (
    <Layout>
      {applicant && (
        <div className="p-[16px]">
          <div className="flex items-center justify-center flex-col">
            <Image
              loader={imageLoader}
              unoptimized
              src={applicant?.vehicle_info?.image_url}
              alt="/"
              height={148}
              width={322}
            />
            <h1 className="font-[600] text-[22px] mt-[10px] w-[80%] text-center leading-[28px]">
              Help {applicant?.branding?.name} finalize your application.
            </h1>
            <p className="font-[400] text-[16px] mt-[20px] w-[80%] text-center leading-[21px]">
              Tap or click the cards below to verify the information needed by{" "}
              {applicant?.branding?.name}
            </p>
          </div>
          <div className="mt-[60px] flex items-center justify-center flex-col">
            {applicant?.categories &&
              Object.keys(applicant.categories)?.length > 0 &&
              Object.keys(applicant?.categories)?.map((category, i) => (
                <Link
                  href={`/category/${category}`}
                  className="verifyCard"
                  key={i}
                >
                  <p className="cardTitle float-left">
                    {firstCapital(category)}
                  </p>
                  <p
                    className={`${renderColor(
                      applicant?.categories[category]?.status
                    )} status float-right`}
                  >
                    {applicant?.categories[category]?.status === "missing"
                      ? "New"
                      : firstCapital(applicant.categories[category]?.status)}
                  </p>
                </Link>
              ))}
          </div>
          <div className="text-center mt-[25px] mb-[20px] text-[13px]">
            <p>
              By proceeding, I agree to {applicant?.branding?.name}’s{" "}
              <a
                className="text-[#008350] font-[600]"
                href={applicant?.branding?.privacy_link}
                target="_blank"
              >
                GLBA Privacy Policy
              </a>{" "}
              and{" "}
              <a
                className="text-[#008350] font-[600]"
                href={applicant?.branding?.terms_of_service_link}
                target="_blank"
              >
                Terms of Use
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
