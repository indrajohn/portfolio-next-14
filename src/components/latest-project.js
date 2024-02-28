"use client";
import Image from "next/image";
import Link from "next/link";

function PortfolioPage() {
  const portfolioList = [
    {
      id: 1,
      name: "Euna Italian Restaurant",
      slug: "euna-italian-restaurant",
      img: "/img/portfolio/euna.png",
      alt: "Euna Italian Restaurant",
      link: "https://demo-euna.indrajohn.tech/",
      desc: "Euna Italian Restaurant is a destination for authentic Italian cuisine, strategically located in the culinary landscape of New Zealand. The restaurant aims to offer a gastronomic experience that transcends the norm, fusing traditional Italian recipes with a touch of modern flair. I had the honor of spearheading a multidimensional project that encompassed brand development, website creation, digital marketing, and customer experience enhancement for Euna.",
      frontend: "Front end : Wordpress",
      backend: "Backend: Wordpress",
    },
    {
      id: 2,
      name: "Armada Orient Furniture",
      slug: "armada-orient-furniture",
      img: "/img/portfolio/armadaorient.png",
      alt: "Armada Orient",
      link: "https://armadaorient.com/",
      desc: "In this project, I collaborated with Armada Orient Furniture, a boutique supplier based in Solo, Indonesia, to build their digital presence and streamline their customer experience. Leveraging the company's core values of personalized service and cultural richness, the project involved showcasing their diverse product lines—from antiques and recycled timber to handicrafts and building materials—on an intuitive platform. Additionally, we optimized their supply chain logistics, helping both the company and their clients focus more on what they do best: selling and purchasing quality, authentic furniture and home accessories. This project served as a perfect blend of traditional craftsmanship and modern business solutions.",
      frontend: "Front end : Wordpress",
      backend: "Backend: Wordpress",
    },
    {
      id: 3,
      name: "GBI Miracle Service Sydney",
      slug: "gbi-miracle-services-sydney",
      img: "/img/portfolio/gbi_miracle_service_sydney.png",
      alt: "GBI Miracle Service Sydney",
      link: "https://www.gbimssydney.org.au/",
      desc: "GBI Miracle Service Sydney is a faith-based organization offering various religious services, community outreach programs, and spiritual growth opportunities. For this project, my team and I were commissioned to bolster the organization's digital presence, improve their online communication, and provide technical solutions for a more seamless virtual service experience. ",
      frontend: "Front end : Next Js",
      backend: "Backend: Java (Spring boot)",
    },
    {
      id: 4,
      name: "Hana Bank Indonesia",
      slug: "hana-bank-indonesia",
      img: "/img/portfolio/hana_bank.png",
      alt: "Hana Bank Indonesia",
      link: "https://www.hanabank.co.id/",
      desc: "Hana Bank Indonesia, a prominent financial institution in Indonesia, embarked on an ambitious digital transformation journey to modernize its services and foster greater customer engagement. I had the privilege to lead a team of experts dedicated to redesigning the bank's digital ecosystem, focusing on user experience, mobile banking solutions, and cybersecurity enhancements.",
      frontend: "Front end and CMS : Next js",
      backend: "Backend: Java (Spring boot)",
    },
    {
      id: 5,
      name: "Indra Wedding",
      slug: "indra-wedding",
      img: "/img/portfolio/indra_wedding.png",
      alt: "Indra Wedding",
      link: "https://wedding.indrajohn.com.au/",
      desc: "Indra Wedding is not just a website; it's a digital chronicle of a lifetime event. Serving as a comprehensive platform for my own wedding, the site aimed to streamline the planning process, keep guests informed, and create a lasting memento of this significant milestone. From RSVPs and event schedules to a gallery of cherished moments, Indra Wedding encapsulates the joy and excitement of matrimony in the modern age.",
      frontend: "Front end: Next js",
      backend: "Backend: Next js (Prisma)",
    },
    {
      id: 6,
      name: "Murni Wedding",
      slug: "murni-wedding",
      img: "/img/portfolio/murni_wedding.png",
      alt: "Murni Wedding",
      link: "https://murniwedding.indrajohn.com.au/",
      desc: "Murni Wedding served as the digital centerpiece for the wedding of my wife's sister. The website was designed to encapsulate the elegance and significance of the event while providing all the essential details for guests. From RSVP management and event scheduling to heartfelt stories and photo galleries, the platform became a one-stop source for all things related to this joyful occasion.",
      frontend: "Front end: Next js",
      backend: "Backend: Next js (Prisma)",
    },
  ];
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
                  className="border-white/40 border-2 rounded-lg w-full shadow-lg group"
                >
                  <div className="relative w-full h-full min-h-[250px] max-h-[400px]">
                    <Image
                      src={_portfolio.img || ""}
                      width={500}
                      height={500}
                      className="object-cover absolute top-0 left-0 w-full h-full min-h-[250px] max-h-[400px]"
                      alt={_portfolio.alt || ""}
                    />
                    <div className="absolute z-50 w-full h-0 bottom-0 left-0 bg-[#1f242d]/90 overflow-hidden duration-1000 transform group-hover:h-full">
                      <div className="flex flex-col items-center justify-center h-full px-4 my-auto">
                        <div>
                          <h1 className="text-xl lg:text-2xl">
                            {_portfolio.name}
                          </h1>
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
                              target="_blank"
                              className="p-2  flex items-center justify-center  rounded border-2 border-slate-600 hover:bg-slate-600"
                            >
                              Go To Website
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
