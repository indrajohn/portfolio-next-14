import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLayoutProvider } from "@/context/myContext";

function PortfolioDetailsComponent({ slug }) {
  const { portfolioList } = useLayoutProvider();
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomedImageSrc, setZoomedImageSrc] = useState("");

  useEffect(() => {
    const project = portfolioList.find((p) => p.slug === slug);
    if (project) {
      setCurrentProject(project);
      setCurrentImageIndex(0); // Resets to the first image when a new project is loaded
    } else {
      setCurrentProject(null); // Ensure no previous project data persists
    }
  }, [slug, portfolioList]);

  useEffect(() => {
    if (currentProject?.imgList) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === currentProject.imgList.length - 1 ? 0 : prevIndex + 1
        );
      }, 9000); // Rotate images every 9 seconds
      return () => clearInterval(interval);
    }
  }, [currentProject]);

  if (!currentProject || !currentProject.imgList?.length) {
    return <div>Loading...</div>;
  }

  const openModal = (imgSrc) => {
    setIsModalOpen(true);
    setZoomedImageSrc(imgSrc);
  };
  const safeImage =
    currentProject.imgList[currentImageIndex] || currentProject.imgList[0]; // Fallback to the first image if index is out of bounds

  const closeModal = () => setIsModalOpen(false);

  const moveToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const imageVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  return (
    <section className="h-screen p-8 flex">
      <div className="w-full md:w-1/2 h-full flex justify-center items-center relative">
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
            className="w-full flex justify-center"
          >
            <Image
              src={safeImage.img}
              alt={safeImage.alt}
              width={500}
              height={500}
              priority
            />
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
              className="bg-white p-2"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            >
              <div className="overflow-hidden">
                <img
                  src={zoomedImageSrc}
                  alt="Zoomed"
                  className="max-h-[80vh] max-w-[80vw] cursor-zoom-in hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      <div className="w-full md:w-1/2 text-white flex">
        <div className="flex items-center h-full justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{currentProject.name}</h1>
            <span className="mt-3">{currentProject.desc}</span>
            <span className="mt-3">{currentProject.frontend}</span>
            <span className="mt-3">{currentProject.backend}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioDetailsComponent;
