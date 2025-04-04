"use client";
import Image from "next/image";
import { motion } from "framer-motion";

function AboutMePage() {
  return (
    <section
      id="about"
      className="h-screen md:mt-48"
      data-aos="zoom-in"
      data-aos-duration="1500"
    >
      <div className="w-full flex">
        <div className="md:octagon-container w-0 md:w-1/2 h-1/2 ">
          <div className="md:octagon-container-two md:w-1/2 h-1/2 md:ml-auto md:mr-auto">
            <div className="md:octagon-image-wrapper ">
              <Image
                src="/img/photo_profile-transparent.png"
                width={500}
                height={500}
                priority
                alt="Picture of the author"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 text-slate-300 flex">
          <div className="flex items-center h-full justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex flex-col">
              <div className="flex">
                <h1 className="text-3xl font-bold">
                  About
                  <span className="text-3xl font-bold text-[#0ef] mx-2">
                    Me
                  </span>
                </h1>
              </div>

              <span className="mt-3 text-justify text-xl">
                As an accomplished Fullstack Developer with over 3 years of
                expertise in API development, database configuration, and
                proficiency in Node.js, WordPress, and React.js, I prioritize
                performance and security in all my projects. I excel in
                implementing microservices architectures using Next.js for
                frontend and Spring Boot REST API with Spring Cloud Gateway for
                backend. With expertise in Redis caching and JWT authentication,
                I bring solid foundation in DevOps practices to automate
                testing, streamline application builds, and deploy with
                efficiency.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMePage;
