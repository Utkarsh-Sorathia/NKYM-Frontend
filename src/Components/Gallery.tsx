import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import type { GalleryItem } from "./Admin/Gallery/types";

const Gallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % gallery.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + gallery.length) % gallery.length);
    }
  };

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/gallery/all`
      );

      const sortedGallery = response.data.gallery.sort(
        (a: GalleryItem, b: GalleryItem) => {
          const yearA = parseInt(a.name.match(/\d{4}/)?.[0] || "0");
          const yearB = parseInt(b.name.match(/\d{4}/)?.[0] || "0");
          return yearB - yearA;
        }
      );

      setGallery(sortedGallery);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <>
      <section id="gallery" className="py-12 bg-amber-50 scroll-mt-16 sm:scroll-mt-0 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-amber-600 mb-4"
            >
              Our Gallery
            </motion.h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Memories from our previous celebrations and events
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-amber-600 font-medium">
              Loading memories...
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {gallery.map((image, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer bg-white"
                  onClick={() => openModal(i)}
                >
                  <img
                    src={image.src}
                    alt={image.name || `Gallery image ${i + 1}`}
                    className="object-cover w-full h-84 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-3 py-2">
                    <h3 className="text-white text-sm font-medium truncate">
                      {image.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
            onClick={closeModal}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors z-50"
              onClick={closeModal}
            >
              <FaXmark size={32} />
            </button>

            <button
              className="absolute left-4 p-2 text-white/50 hover:text-white transition-colors z-50"
              onClick={prevImage}
            >
              <FaChevronLeft size={48} />
            </button>

            <button
              className="absolute right-4 p-2 text-white/50 hover:text-white transition-colors z-50"
              onClick={nextImage}
            >
              <FaChevronRight size={48} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[selectedIndex].src}
                alt={gallery[selectedIndex].name}
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
              />
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mt-6 text-white"
              >
                <h3 className="text-2xl font-bold">{gallery[selectedIndex].name}</h3>
                <p className="text-white/60 mt-2">Image {selectedIndex + 1} of {gallery.length}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
