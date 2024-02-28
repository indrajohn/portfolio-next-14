"use client";
import Image from "next/image";

function SkillPage() {
  return (
    <section id="skill" data-aos="zoom-in-down" data-aos-duration="1500">
      <div className="w-full flex">
        <div className="w-full text-white flex">
          <div className="m-8 flex text-center flex-col">
            <div className="flex mx-auto">
              <h1 className="text-3xl font-bold">
                My
                <span className="text-3xl font-bold text-[#0ef] mx-2">
                  Skills
                </span>
              </h1>
            </div>

            <div className="mx-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 mx-auto p-12 h-[300px]">
                <div className="vertical-line"></div>
                <div className="border-white/40 border-2 rounded-lg p-1 shadow-lg">
                  <div className="bg-slate-700 text-white">
                    <div className="w-full h-full">
                      <h1>Web Developer</h1>
                    </div>
                  </div>
                </div>
                <div className="vertical-line"></div>
                <div className="border-white/40 border-2 rounded-lg p-1 shadow-lg">
                  <Image
                    src="/img/portfolio2.jpg"
                    width={500}
                    height={500}
                    alt="Portfolio 2"
                  />
                </div>

                <div className="border-white/40 border-2 rounded-lg p-1 shadow-lg">
                  <Image
                    src="/img/portfolio3.jpg"
                    width={500}
                    height={500}
                    alt="Portfolio 3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillPage;
