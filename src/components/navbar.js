"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

function NavBar() {
  const [navbarActive, setNavBarActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [menu, setMenu] = useState([
    {
      title: "Home",
      url: "home",
      top: 0,
    },
    {
      title: "About",
      url: "about",
      top: 0,
    },
    {
      title: "Skill",
      url: "skill",
      top: 0,
    },
    {
      title: "Portfolio",
      url: "portfolio",
      top: 0,
    },
    {
      title: "Contact",
      url: "contact",
      top: 0,
    },
  ]);

  // Memoize changeNavToLastScroll
  const changeNavToLastScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      let newActiveMenu = "";
      const updatedMenu = menu.map((_menu) => {
        const element = document.getElementById(_menu.url);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY;
          if (window.scrollY >= top - 91) {
            newActiveMenu = _menu.url;
          }
          return { ..._menu, top };
        }
        return _menu;
      });
      setMenu(updatedMenu);
      setNavBarActive(newActiveMenu);
    }
  }, [menu]);

  useEffect(() => {
    changeNavToLastScroll();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setIsFixed(window.scrollY > 20);
        changeNavToLastScroll();
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [changeNavToLastScroll]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setNavBarActive("home");
  }, []);

  const scrollInto = (top) => {
    window.scrollTo(0, top - 90);
  };

  return (
    <nav
      className={`z-50 w-full ${
        isFixed
          ? "fixed bg-[#1f242d]/70 transition-all duration-300"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="font-bold text-white text-2xl"
              data-aos="fade-up"
              data-aos-duration={`900`}
            >
              Indra
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-end flex-1 menu-nav">
            <div className="w-full flex justify-end">
              <div className="flex justify-center space-x-4">
                {menu?.map((_menu, index) => (
                  <div
                    key={index}
                    onClick={() => scrollInto(_menu.top)}
                    data-aos="fade-up"
                    data-aos-easing="linear"
                    data-aos-duration={`${400 + index * 400}`}
                    className={`text-gray-300 hover:text-[#0ef] px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                      navbarActive === _menu.url ? "active" : ""
                    }`}
                  >
                    {_menu.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center justify-end flex-1">
            <button
              type="button"
              className="text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 focus:text-white px-3 py-2 rounded-md text-xl md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={`${isOpen ? "hidden" : "block"}`}
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className={`${isOpen ? "block" : "hidden"}`}
                  d="M6 18L18 6M6 6l12 12"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} md:hidden py-3`}>
          {menu?.map((_menu, index) => (
            <div
              key={index}
              onClick={() => scrollInto(_menu.url === "home" ? 0 : _menu.top)}
              className="block hover:text-[#0ef] px-4 py-2 text-base font-medium text-white"
            >
              {_menu.title}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
