import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLayoutProvider } from "@/context/myContext";

function PortfolioDetailsComponent({ slug }) {
  const { portfolioList } = useLayoutProvider();
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const project = portfolioList.find((p) => p.slug === slug);
    if (project) {
      setCurrentProject(project);
    }
  }, [slug, portfolioList]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  const cycleImages = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      return direction > 0
        ? (prevIndex + 1) % currentProject.imgList.length
        : prevIndex - 1 < 0
        ? currentProject.imgList.length - 1
        : prevIndex - 1;
    });
  };

  if (!currentProject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      <AnimatePresence initial={false} custom={1}>
        <motion.div
          key={currentImageIndex}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 40 },
            opacity: { duration: 0.5 },
          }}
          className="absolute w-full flex justify-center"
        >
          {/* Remove layout="fixed" if it causes issues */}
          <Image
            src={currentProject.imgList[currentImageIndex].img}
            alt={currentProject.imgList[currentImageIndex].alt}
            width={500}
            height={500}
            priority
          />
        </motion.div>
      </AnimatePresence>
      <button
        onClick={() => cycleImages(-1)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white z-20"
        aria-label="Previous Image"
      >
        {"<"}
      </button>
      <button
        onClick={() => cycleImages(1)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white z-20"
        aria-label="Next Image"
      >
        {">"}
      </button>
    </div>
  );
}

export default PortfolioDetailsComponent;
