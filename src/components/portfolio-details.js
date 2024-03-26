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
  const openModal = (imgSrc) => {
    setIsModalOpen(true);
    setZoomedImageSrc(imgSrc); // Set the source of the image to be zoomed
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const project = portfolioList.find((p) => p.slug === slug);
    if (project) {
      setCurrentProject(project);
      setCurrentImageIndex(0);
    }
  }, [slug]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === currentProject?.imgList.length - 1 ? 0 : prevIndex + 1
      );
    }, 9000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [currentImageIndex, currentProject]);

  const moveToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  if (!currentProject) {
    return <div>Loading...</div>;
  }

  const sliderVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <section className="h-screen p-8">
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-1/2 flex justify-center items-center">
          <div>
            <motion.div
              variants={sliderVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="cursor-pointer"
              transition={{
                x: { type: "spring", stiffness: 100, damping: 100 },
                opacity: { duration: 2 },
              }}
              key={currentImageIndex}
            >
              <Image
                onClick={() => openModal(currentProject.imgList[0].img)}
                src={currentProject.imgList[currentImageIndex].img}
                alt={currentProject.imgList[currentImageIndex].alt}
                width={500}
                height={500}
                priority
              />
            </motion.div>
            <div className="mt-4 flex justify-center items-center">
              {currentProject.imgList.map((_, index) => (
                <span
                  key={index}
                  onClick={() => moveToSlide(index)}
                  className={`cursor-pointer block rounded-full mx-1 ${
                    currentImageIndex === index ? "bg-blue-500" : "bg-gray-400"
                  }`}
                  style={{ width: "10px", height: "10px" }}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isModalOpen && (
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
                {/* Using a div container for the zoom effect */}
                <div className="overflow-hidden">
                  <img
                    src={zoomedImageSrc}
                    alt="Zoomed"
                    className="max-h-[80vh] max-w-[80vw] cursor-zoom-in hover:scale-110 transition-transform duration-300 ease-in-out"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
      </div>
    </section>
  );
}

export default PortfolioDetailsComponent;
