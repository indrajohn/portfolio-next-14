"use client";
import { createContext, useContext, useMemo } from "react";

const MyContext = createContext();
export function useLayoutProvider() {
  return useContext(MyContext);
}
function MyContextComponents({ children }) {
  const portfolioList = [
    {
      id: 1,
      name: "Euna Italian Restaurant",
      slug: "euna-italian-restaurant",
      imgList: [
        {
          img: "/img/portfolio/euna.png",
          alt: "Euna Italian Restaurant",
        },
        {
          img: "/img/portfolio/euna.png",
          alt: "Euna Italian Restaurant",
        },
        {
          img: "/img/portfolio/euna.png",
          alt: "Euna Italian Restaurant",
        },
      ],
      link: "https://demo-euna.indrajohn.tech/",
      desc: "Euna Italian Restaurant is a destination for authentic Italian cuisine, strategically located in the culinary landscape of New Zealand. The restaurant aims to offer a gastronomic experience that transcends the norm, fusing traditional Italian recipes with a touch of modern flair. I had the honor of spearheading a multidimensional project that encompassed brand development, website creation, digital marketing, and customer experience enhancement for Euna.",
      frontend: "Front end : Wordpress",
      backend: "Backend: Wordpress",
      spec: "PHP | Wordpress | HTML | Javascript | CSS",
    },
    {
      id: 2,
      name: "Armada Orient Furniture",
      slug: "armada-orient-furniture",
      imgList: [
        {
          img: "/img/portfolio/armadaorient.png",
          alt: "Armada Orient",
        },
        {
          img: "/img/portfolio/armadaorient.png",
          alt: "Armada Orient",
        },
        {
          img: "/img/portfolio/armadaorient.png",
          alt: "Armada Orient",
        },
      ],
      link: "https://armadaorient.com/",
      desc: "In this project, I collaborated with Armada Orient Furniture, a boutique supplier based in Solo, Indonesia, to build their digital presence and streamline their customer experience. Leveraging the company's core values of personalized service and cultural richness, the project involved showcasing their diverse product lines—from antiques and recycled timber to handicrafts and building materials—on an intuitive platform. Additionally, we optimized their supply chain logistics, helping both the company and their clients focus more on what they do best: selling and purchasing quality, authentic furniture and home accessories. This project served as a perfect blend of traditional craftsmanship and modern business solutions.",
      frontend: "Front end : Wordpress",
      backend: "Backend: Wordpress",
      spec: "PHP | Wordpress | HTML | Javascript | CSS",
    },
    {
      id: 3,
      name: "GBI Miracle Service Sydney",
      slug: "gbi-miracle-services-sydney",
      imgList: [
        {
          img: "/img/portfolio/gbi_miracle_service_sydney.png",
          alt: "GBI Miracle Service Sydney",
        },
        {
          img: "/img/portfolio/gbi_miracle_service_sydney.png",
          alt: "GBI Miracle Service Sydney",
        },
        {
          img: "/img/portfolio/gbi_miracle_service_sydney.png",
          alt: "GBI Miracle Service Sydney",
        },
      ],

      link: "https://www.gbimssydney.org.au/",
      desc: "GBI Miracle Service Sydney is a faith-based organization offering various religious services, community outreach programs, and spiritual growth opportunities. For this project, my team and I were commissioned to bolster the organization's digital presence, improve their online communication, and provide technical solutions for a more seamless virtual service experience. ",
      frontend: "Front end : Vuejs 3",
      backend: "Backend: Laravel 11",
      spec: "PHP | Laravel 11 | Vuejs 3 | Inertiajs | Node Js | Javascript | CSS",
    },
    {
      id: 4,
      name: "Hana Bank Indonesia",
      slug: "hana-bank-indonesia",
      imgList: [
        {
          img: "/img/portfolio/hana_bank.png",
          alt: "Hana Bank Indonesia",
        },
        {
          img: "/img/portfolio/hana_bank.png",
          alt: "Hana Bank Indonesia",
        },
        {
          img: "/img/portfolio/hana_bank.png",
          alt: "Hana Bank Indonesia",
        },
      ],

      link: "https://www.hanabank.co.id/",
      desc: "Hana Bank Indonesia, a prominent financial institution in Indonesia, embarked on an ambitious digital transformation journey to modernize its services and foster greater customer engagement. I had the privilege to lead a team of experts dedicated to redesigning the bank's digital ecosystem, focusing on user experience, mobile banking solutions, and cybersecurity enhancements.",
      frontend: "Front end and CMS : Next js",
      backend: "Backend: Java (Spring boot)",
      spec: "Java | Spring Boot | Next Js | React Js | Node Js | Javascript | CSS",
    },
    {
      id: 5,
      name: "Indra Wedding",
      slug: "indra-wedding",
      imgList: [
        {
          img: "/img/portfolio/indra_wedding.png",
          alt: "Indra Wedding",
        },
        {
          img: "/img/portfolio/indra_wedding.png",
          alt: "Indra Wedding",
        },
        {
          img: "/img/portfolio/indra_wedding.png",
          alt: "Indra Wedding",
        },
      ],

      link: "https://wedding.indrajohn.com.au/",
      desc: "Indra Wedding is not just a website; it's a digital chronicle of a lifetime event. Serving as a comprehensive platform for my own wedding, the site aimed to streamline the planning process, keep guests informed, and create a lasting memento of this significant milestone. From RSVPs and event schedules to a gallery of cherished moments, Indra Wedding encapsulates the joy and excitement of matrimony in the modern age.",
      frontend: "Front end: Next js",
      backend: "Backend: Next js (Prisma)",
      spec: "Prisma | Next Js | React Js | Node Js | Javascript | CSS",
    },
    {
      id: 6,
      name: "Murni Wedding",
      slug: "murni-wedding",
      imgList: [
        {
          img: "/img/portfolio/murni_wedding.png",
          alt: "Murni Wedding",
        },
        {
          img: "/img/portfolio/murni_wedding.png",
          alt: "Murni Wedding",
        },
        {
          img: "/img/portfolio/murni_wedding.png",
          alt: "Murni Wedding",
        },
      ],

      link: "https://murniwedding.indrajohn.com.au/",
      desc: "Murni Wedding served as the digital centerpiece for the wedding of my wife's sister. The website was designed to encapsulate the elegance and significance of the event while providing all the essential details for guests. From RSVP management and event scheduling to heartfelt stories and photo galleries, the platform became a one-stop source for all things related to this joyful occasion.",
      frontend: "Front end: Next js",
      backend: "Backend: Next js (Prisma)",
      spec: "Prisma | Next Js | React Js | Node Js | Javascript | CSS",
    },
  ];
  const contextValue = useMemo(() => {
    return {
      portfolioList,
    };
  }, [portfolioList]);
  return (
    <MyContext.Provider value={contextValue}>
      <main>{children}</main>
    </MyContext.Provider>
  );
}
export default MyContextComponents;
