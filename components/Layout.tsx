import Image from "next/image";
import "../app/home.css";
import gray from "../public/assets/gray.jpg";
import loader from "../public/assets/Eclipse.svg";
import useStore from "@/store/useStore";
import React from "react";
import { convertMobileNumber } from "@/utils/common-functions";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { fetchApplicant, applicant } = useStore();

  React.useEffect(() => {
    fetchApplicant();
  }, []);

  return (
    <main>
      {!applicant ? (
        <div className="flex items-center justify-center min-h-screen">
          <Image src={loader} alt="/" />
        </div>
      ) : (
        <>
          <div className="main-container">
            <div className="container-1 max-md:hidden">
              <Image src={gray} alt="/" />
            </div>
            <div className="bg-[#F7F7F7] flex items-center justify-center w-[100%] relative pb-[30px] max-md:pb-[0px]">
              <div className="w-[70%] bg-[#ECECEC] mt-[-150px] rounded-[5px] max-md:mt-[0px] max-md:w-[100%]">
                {children}
              </div>
            </div>
            <div className="bg-[#E3E3E3] h-[10px]"></div>
          </div>
          <footer>
            <div className="bg-[#F7F7F7] flex items-center justify-center flex-col py-[10px]">
              <p>Question? Call {applicant?.branding?.name}.</p>
              <p className="text-[#008350] font-bold mb-[20px]">
                {convertMobileNumber(applicant?.branding?.phone)}
              </p>
              <p>Your progress will be saved automatically.</p>
            </div>
            <div className="bg-black flex items-center justify-center flex-col py-[20px]">
              <p className="text-[#C2C2C2] font-[10px] pb-[5px]">
                {applicant?.branding?.name}, LLC.
              </p>
              <p className="text-[white] font-bold mb-[10px]">
                <a href={applicant?.branding?.privacy_link} target="_blank">
                  GLBA Privacy Policy
                </a>{" "}
                |{" "}
                <a
                  href={applicant?.branding?.terms_of_service_link}
                  target="_blank"
                >
                  Terms of Use
                </a>
              </p>
              <p className="text-[#C2C2C2] font-[10px]">
                © Copyright Informed, Inc. {new Date().getFullYear()}. All
                rights reserved.
              </p>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
