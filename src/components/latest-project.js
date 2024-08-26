"use client";
import { useLayoutProvider } from "@/context/myContext";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function PortfolioPage() {
  const { portfolioList, setChatBoxOpen } = useLayoutProvider();
  return (
    <section id="portfolio" data-aos="zoom-down" data-aos-duration="1500">
      <div className="w-full flex">
        <div className="w-full text-white flex">
          <div className="m-8 flex text-center flex-col items-center justify-center w-full">
            <div className="flex mx-auto mb-8">
              <h1 className="text-3xl font-bold">
                Latest
                <span className="text-3xl font-bold text-[#0ef] mx-2">
                  Project
                </span>
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mx-auto gap-4 w-full">
              {portfolioList.map((_portfolio, index) => (
                <div
                  key={index}
                  className="border-white/40 border-2 rounded-lg w-full shadow-lg group z-0"
                >
                  <div className="relative w-full h-full min-h-[250px] max-h-[400px] overflow-hidden">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 100, damping: 100 },
                        opacity: { duration: 2 },
                      }}
                      className="absolute inset-0 w-full h-full overflow-hidden"
                    >
                      <div
                        className="flex flex-col"
                        style={{
                          animation: `vertical-scroll 150s linear infinite`,
                        }}
                      >
                        <Image
                          src={_portfolio.imgList[0].img || ""}
                          width={500}
                          height={500}
                          className="object-cover w-full h-full"
                          alt={_portfolio.imgList[0].alt || ""}
                        />
                        <Image
                          src={_portfolio.imgList[0].img || ""}
                          width={500}
                          height={500}
                          className="object-cover w-full h-full"
                          alt={_portfolio.imgList[0].alt || ""}
                        />
                      </div>
                    </motion.div>

                    <div className="absolute z-0 w-full h-[60%] bottom-0 left-0 bg-[#1f242d]/90 overflow-hidden duration-1000 transform group-hover:h-full">
                      <div className="flex flex-col items-center justify-center h-full px-4 my-auto">
                        <div>
                          <h1 className="text-xl lg:text-2xl">
                            {_portfolio.name}
                          </h1>
                          <h1 className="text-md">{_portfolio.spec}</h1>
                          <div className="grid grid-cols-2 gap-4">
                            <Link
                              href={`/portfolio/details/${_portfolio.slug}`}
                              className="p-2 flex items-center justify-center rounded border-2 border-slate-600 hover:bg-slate-600"
                            >
                              Details
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 72 72"
                              >
                                <path
                                  fill="#FFF"
                                  d="M51.065 43.916V10.979H18.937v49.76h16.062"
                                />
                                <circle
                                  cx="43.167"
                                  cy="52.167"
                                  r="11.129"
                                  fill="#D0CFCE"
                                />
                                <g
                                  fill="none"
                                  stroke="#000"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeMiterlimit="10"
                                  strokeWidth="2"
                                >
                                  <path d="M51.065 43.916V10.979H18.937v49.76h16.062M23.667 16.02H32m-8.333 8.48h22m-22 3.771h22m-22 3.77h22m-22 3.771h22m-22 3.771h22M36.38 43.35H23.67m9.58 3.77h-9.58m8.45 3.77h-8.45" />
                                  <circle cx="43.167" cy="52.167" r="11.129" />
                                  <path d="m51.065 60.739l5.467 5.467M33.439 48.453h13.436m-14.703 5.386h14.703" />
                                </g>
                              </svg>
                            </Link>
                            <Link
                              href={_portfolio.link || "/"}
                              target={_portfolio.chatbot ? "" : "_blank"}
                              onClick={() => {
                                if (_portfolio.chatbot) {
                                  setChatBoxOpen(true);
                                }
                              }}
                              className="p-2 flex items-center justify-center rounded border-2 border-slate-600 hover:bg-slate-600"
                            >
                              {_portfolio.chatbot ? "Try" : "Go To Website"}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H5v12h12v-6h2zM13 3v2h4.586l-7.793 7.793l1.414 1.414L19 6.414V11h2V3h-8z"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioPage;
