"use client";
import { createContext, useContext, useMemo, useState } from "react";

const MyContext = createContext();
export function useLayoutProvider() {
  return useContext(MyContext);
}

function MyContextComponents({ children }) {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  const portfolioList = useMemo(
    () => [
      {
        id: 1,
        name: "Chatbot AI Langchain (Experimental)",
        slug: "chatbot-ai-langchain",
        imgList: [
          {
            img: "/img/portfolio/chatbot/1.png",
            alt: "Chatbot AI Langchain",
          },
          {
            img: "/img/portfolio/chatbot/2.png",
            alt: "Chatbot AI Langchain",
          },
          {
            img: "/img/portfolio/chatbot/3.png",
            alt: "Chatbot AI Langchain",
          },
          {
            img: "/img/portfolio/chatbot/1.png",
            alt: "Chatbot AI Langchain",
          },
          {
            img: "/img/portfolio/chatbot/1.png",
            alt: "Chatbot AI Langchain",
          },
        ],
        link: "",
        chatbot: true,
        desc: "I'm currently experimenting with an AI Chatbot that scrapes my portfolio website and mimics my personality and responses. The goal is to create a digital version of myself that you can interact with as if you're speaking directly to me. This is still a work in progress, but I invite you to try it out and see how closely the AI captures my style. Click the 'Try' button to experience chatting with the AI bot firsthand!",
        frontend: "FrontEnd : Next Js | React",
        backend: "Backend: Langchain | Datastax AstraDB | Open AI | Redis",
        spec: "Langchain | Datastax AstraDB | Open AI | Redis | Javascript | CSS | React",
      },
      {
        id: 2,
        name: "Euna Italian Restaurant",
        slug: "euna-italian-restaurant",
        imgList: [
          {
            img: "/img/portfolio/euna/home.png",
            alt: "Euna Italian Restaurant",
          },
          {
            img: "/img/portfolio/euna/menu.png",
            alt: "Euna Italian Restaurant",
          },
          {
            img: "/img/portfolio/euna/reservation.png",
            alt: "Euna Italian Restaurant",
          },
        ],
        link: "https://demo-euna.indrajohn.com.au",
        desc: "Euna Italian Restaurant is a destination for authentic Italian cuisine, strategically located in the culinary landscape of New Zealand. The restaurant aims to offer a gastronomic experience that transcends the norm, fusing traditional Italian recipes with a touch of modern flair. I had the honor of spearheading a multidimensional project that encompassed brand development, website creation, digital marketing, and customer experience enhancement for Euna.",
        frontend: "Front end : Wordpress",
        chatbot: false,
        backend: "Backend: Wordpress",
        spec: "PHP | Wordpress | HTML | Javascript | CSS",
      },
      {
        id: 3,
        name: "Armada Orient Furniture",
        slug: "armada-orient-furniture",
        imgList: [
          {
            img: "/img/portfolio/armadaorient/home.png",
            alt: "Armada Orient",
          },
          {
            img: "/img/portfolio/armadaorient/about_us.png",
            alt: "Armada Orient",
          },
          {
            img: "/img/portfolio/armadaorient/blog.png",
            alt: "Armada Orient",
          },
        ],
        link: "http://armadaorient.indrajohn.com.au/",
        desc: "In this project, I collaborated with Armada Orient Furniture, a boutique supplier based in Solo, Indonesia, to build their digital presence and streamline their customer experience. Leveraging the company's core values of personalized service and cultural richness, the project involved showcasing their diverse product lines—from antiques and recycled timber to handicrafts and building materials—on an intuitive platform. Additionally, we optimized their supply chain logistics, helping both the company and their clients focus more on what they do best: selling and purchasing quality, authentic furniture and home accessories. This project served as a perfect blend of traditional craftsmanship and modern business solutions.",
        frontend: "Front end : Wordpress",
        backend: "Backend: Wordpress",
        chatbot: false,
        spec: "PHP | Wordpress | HTML | Javascript | CSS",
      },
      {
        id: 4,
        name: "GBI Miracle Service Sydney",
        slug: "gbi-miracle-services-sydney",
        imgList: [
          {
            img: "/img/portfolio/gbi_miracle/home.png",
            alt: "GBI Miracle Service Sydney",
          },
          {
            img: "/img/portfolio/gbi_miracle/about.png",
            alt: "GBI Miracle Service Sydney",
          },
          {
            img: "/img/portfolio/gbi_miracle/contact_us.png",
            alt: "GBI Miracle Service Sydney",
          },
          {
            img: "/img/portfolio/gbi_miracle/gema.png",
            alt: "GBI Miracle Service Sydney",
          },
        ],

        link: "https://www.gbimssydney.org.au/",
        desc: "GBI Miracle Service Sydney is a faith-based organization offering various religious services, community outreach programs, and spiritual growth opportunities. For this project, my team and I were commissioned to bolster the organization's digital presence, improve their online communication, and provide technical solutions for a more seamless virtual service experience. ",
        frontend: "Front end : Vuejs 3",
        backend: "Backend: Laravel 11",
        chatbot: false,
        spec: "PHP | Laravel 11 | Vuejs 3 | Inertiajs | Node Js | Javascript | CSS",
      },
      {
        id: 5,
        name: "Hana Bank Indonesia",
        slug: "hana-bank-indonesia",
        imgList: [
          {
            img: "/img/portfolio/hanabank/hana_bank.png",
            alt: "Hana Bank Indonesia",
          },
          {
            img: "/img/portfolio/hanabank/about.png",
            alt: "Hana Bank Indonesia",
          },
          {
            img: "/img/portfolio/hanabank/linebank.png",
            alt: "Hana Bank Indonesia",
          },
          {
            img: "/img/portfolio/hanabank/wealth.png",
            alt: "Hana Bank Indonesia",
          },
        ],

        link: "https://www.hanabank.co.id/",
        desc: "Hana Bank Indonesia, a prominent financial institution in Indonesia, embarked on an ambitious digital transformation journey to modernize its services and foster greater customer engagement. I had the privilege to lead a team of experts dedicated to redesigning the bank's digital ecosystem, focusing on user experience, mobile banking solutions, and cybersecurity enhancements.",
        frontend: "Front end and CMS : Next js",
        backend: "Backend: Java (Spring boot)",
        chatbot: false,
        spec: "Java | Spring Boot | Next Js | React Js | Node Js | Javascript | CSS",
      },
      {
        id: 6,
        name: "Indra Wedding",
        slug: "indra-wedding",
        imgList: [
          {
            img: "/img/portfolio/indra_wedding_1.png",
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
        chatbot: false,
        spec: "Prisma | Next Js | React Js | Node Js | Javascript | CSS",
      },
      // {
      //   id: 7,
      //   name: "Murni Wedding",
      //   slug: "murni-wedding",
      //   imgList: [
      //     {
      //       img: "/img/portfolio/murni_wedding.png",
      //       alt: "Murni Wedding",
      //     },
      //     {
      //       img: "/img/portfolio/murni_wedding.png",
      //       alt: "Murni Wedding",
      //     },
      //     {
      //       img: "/img/portfolio/murni_wedding.png",
      //       alt: "Murni Wedding",
      //     },
      //   ],

      //   link: "https://murniwedding.indrajohn.com.au/",
      //   desc: "Murni Wedding served as the digital centerpiece for the wedding of my wife's sister. The website was designed to encapsulate the elegance and significance of the event while providing all the essential details for guests. From RSVP management and event scheduling to heartfelt stories and photo galleries, the platform became a one-stop source for all things related to this joyful occasion.",
      //   frontend: "Front end: Next js",
      //   backend: "Backend: Next js (Prisma)",
      //   spec: "Prisma | Next Js | React Js | Node Js | Javascript | CSS",
      // },
    ],
    []
  );

  const contextValue = useMemo(
    () => ({
      portfolioList,
      chatBoxOpen,
      setChatBoxOpen,
    }),
    [portfolioList, chatBoxOpen]
  );

  return (
    <MyContext.Provider value={contextValue}>
      <main>{children}</main>
    </MyContext.Provider>
  );
}

export default MyContextComponents;
