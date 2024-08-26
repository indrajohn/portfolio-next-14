import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLayoutProvider } from "@/context/myContext";
import Link from "next/link";

function PortfolioDetailsComponent({ slug }) {
  const { portfolioList, setChatBoxOpen } = useLayoutProvider();
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomedImageSrc, setZoomedImageSrc] = useState("");

  useEffect(() => {
    const project = portfolioList.find((p) => p.slug === slug);
    if (project) {
      setCurrentProject(project);
      setCurrentImageIndex(0);
    } else {
      setCurrentProject(null);
    }
  }, [slug, portfolioList]);

  useEffect(() => {
    if (currentProject?.imgList) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === currentProject.imgList.length - 1 ? 0 : prevIndex + 1
        );
      }, 9000);
      return () => clearInterval(interval);
    }
  }, [currentProject]);

  const openModal = (imgSrc) => {
    setIsModalOpen(true);
    setZoomedImageSrc(imgSrc);
  };

  const closeModal = () => setIsModalOpen(false);

  const moveToSlide = (index) => {
    if (!currentProject?.imgList) return;
    if (index < 0) {
      setCurrentImageIndex(currentProject.imgList.length - 1);
    } else if (index >= currentProject.imgList.length) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(index);
    }
  };

  const imageVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  if (!currentProject || !currentProject.imgList?.length) {
    return <div>Loading...</div>;
  }

  const safeImage =
    currentProject.imgList[currentImageIndex] || currentProject.imgList[0];

  return (
    <section className="h-screen p-8 flex">
      <div className="w-full md:w-1/2 h-full flex justify-center items-center relative overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            onClick={() => openModal(safeImage.img)}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full h-full overflow-hidden flex justify-center relative"
          >
            {/* Container for infinite scroll */}
            <div className="flex flex-col animate-scroll">
              {/* Duplicate the image to create a seamless scroll effect */}
              <Image
                src={safeImage.img}
                alt={safeImage.alt}
                width={250}
                height={250}
                priority
                className="w-full"
              />
              <Image
                src={safeImage.img}
                alt={safeImage.alt}
                width={250}
                height={250}
                priority
                className="w-full"
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={() => moveToSlide(currentImageIndex - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-white z-20 text-4xl"
          aria-label="Previous Image"
        >
          {"<"}
        </button>
        <button
          onClick={() => moveToSlide(currentImageIndex + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white z-20 text-4xl"
          aria-label="Next Image"
        >
          {">"}
        </button>
      </div>
      {isModalOpen && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white p-2 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden">
                <img
                  src={zoomedImageSrc}
                  alt="Zoomed"
                  className=" max-w-[80vw] cursor-zoom-in hover:scale-110 transition-transform duration-300 ease-in-out object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      <div className="w-full md:w-1/2 text-white flex">
        <div className="flex items-center h-full justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{currentProject.name}</h1>
            <span className="mt-3">{currentProject.desc}</span>
            <span className="mt-3">{currentProject.frontend}</span>
            <span className="mt-3">{currentProject.backend}</span>
            <span className="mt-3">{currentProject.spec}</span>
            <Link
              href={currentProject.link || "/"}
              target={currentProject.chatbot ? "" : "_blank"}
              onClick={() => {
                if (currentProject.chatbot) {
                  setChatBoxOpen(true);
                }
              }}
              className="p-2 flex items-center justify-center rounded border-2 border-slate-600 hover:bg-slate-600"
            >
              {currentProject.chatbot ? "Try" : "Go To Website"}
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
    </section>
  );
}

export default PortfolioDetailsComponent;
