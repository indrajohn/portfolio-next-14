"use client";
import Image from "next/image";

function Hero() {
  return (
    <section id="home" data-aos="zoom-in" data-aos-duration="1500">
      <div className="w-full h-[calc(100vh-64px)] flex">
        <div className="w-full md:w-1/2 text-slate-300 flex">
          <div className="flex items-center h-full justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col space-y-4">
              <h2
                className="text-xl font-bold"
                data-aos="zoom-out-down"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1500"
              >
                Hello, It&apos;s me
              </h2>
              <h1
                className="text-4xl md:text-5xl font-bold"
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1500"
              >
                Yoseph Indra John Saputra
              </h1>
              <h2
                className="text-2xl md:text-2xl font-bold"
                data-aos="zoom-out-down"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1500"
              >
                Full stack Developer | API Development | Node.js | React.js
              </h2>
              <span
                className="mt-3"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                I have over 5 years+ of development experience, including
                working as a fullstack developer. I can build and consume APIs,
                set up databases, and love Node.js, WordPress, React.js.
              </span>
              <span className="flex text-[20px]">
                <a
                  className="border-2 border-[#0ef] rounded-full ease-in duration-300 hover:cursor-pointer p-1 mx-1 inline-flex justify-center hover:bg-[#90CAF9]"
                  href="https://www.facebook.com/indra.jhon.1"
                  target="_blank"
                  data-aos="fade-left"
                  data-aos-duration={`900`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="text-[#0ef]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z"
                    />
                  </svg>
                </a>
                <a
                  className="border-2 border-[#0ef] rounded-full ease-in duration-300 hover:cursor-pointer p-1 mx-1 inline-flex justify-center hover:bg-[#90CAF9]"
                  href="https://www.instagram.com/indrajohn92"
                  target="_blank"
                  data-aos="fade-left"
                  data-aos-duration={`1500`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="text-[#0ef]"
                  >
                    <path
                      fill="currentColor"
                      d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"
                    />
                  </svg>
                </a>
                <a
                  className="border-2 border-[#0ef] rounded-full ease-in duration-300 hover:cursor-pointer p-1 mx-1 inline-flex justify-center hover:bg-[#90CAF9]"
                  href="https://www.linkedin.com/in/indrajohn/"
                  target="_blank"
                  data-aos="fade-left"
                  data-aos-duration={`2000`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="text-[#0ef]"
                  >
                    <path
                      fill="currentColor"
                      d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z"
                    />
                  </svg>
                </a>
                <a
                  className="border-2 border-[#0ef] rounded-full ease-in duration-300 hover:cursor-pointer p-1 mx-1 inline-flex justify-center hover:bg-[#90CAF9]"
                  href="https://github.com/indrajohn"
                  target="_blank"
                  data-aos="fade-left"
                  data-aos-duration={`3000`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="text-[#0ef]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                    />
                  </svg>
                </a>
              </span>
              <div className="my-6">
                <a
                  href="/YosephIndraJohnSaputraResume.pdf"
                  download
                  className="bg-[#0ef] rounded-lg text-[#1f242d] px-4 py-3 text-md font-bold"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-0 md:w-1/2 h-1/2">
          <div className="flex justify-center">
            <Image
              src="/img/photo_profile_transparent.png"
              width={500}
              height={500}
              priority
              className="animate-up-down"
              alt="Picture of the author"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
