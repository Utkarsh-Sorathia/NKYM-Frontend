import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import type { GalleryItem } from "./Admin/Gallery/types";
import { timelineData } from "../data/timelineData";
import BackgroundPattern from "./BackgroundPattern";
import HeadingAccent from "./HeadingAccent";
import { optimizeCloudinaryUrl } from "../utils/cloudinary";

interface GalleryEntry {
  year: number;
  title: string;
  blurb: string;
  photo: GalleryItem | null;
}

const Gallery: React.FC = () => {
  const [entries, setEntries] = useState<GalleryEntry[]>([]);
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
      setSelectedIndex((selectedIndex + 1) % entries.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + entries.length) % entries.length);
    }
  };

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/gallery/all`
      );

      const photoByYear = new Map<number, GalleryItem>();
      (response.data.gallery as GalleryItem[]).forEach((item) => {
        const year = parseInt(item.name.match(/\d{4}/)?.[0] || "0");
        if (year) photoByYear.set(year, item);
      });

      const merged: GalleryEntry[] = timelineData
        .map((entry) => ({
          year: entry.year,
          title: entry.title,
          blurb: entry.blurb,
          photo: photoByYear.get(entry.year) || null,
        }))
        .sort((a, b) => b.year - a.year);

      setEntries(merged);
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

  const selected = selectedIndex !== null ? entries[selectedIndex] : null;

  return (
    <>
      <section id="gallery" className="relative py-12 bg-cream-100 scroll-mt-24 overflow-hidden">
        <BackgroundPattern />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gold-600 mb-4"
            >
              Our Gallery
            </motion.h2>
            <HeadingAccent />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base md:text-lg">
              Ten years of devotion, community, and celebration — 2017 to 2026
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden shadow-lg">
                  <div className="w-full h-84 animate-shimmer" />
                  <div className="px-3 py-2 bg-cream-200">
                    <div className="h-3 w-10 mb-2 rounded animate-shimmer" />
                    <div className="h-3 w-2/3 rounded animate-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {entries.map((entry, i) => (
                <motion.div
                  key={entry.year}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer bg-white"
                  onClick={() => openModal(i)}
                >
                  {entry.photo ? (
                    <img
                      src={optimizeCloudinaryUrl(entry.photo.src, 500)}
                      alt={entry.photo.name}
                      className="object-cover w-full h-84 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-84 bg-linear-to-br from-maroon-800 to-gold-700 flex items-center justify-center text-cream-100 font-display text-xl font-semibold tracking-wide uppercase">
                      Coming Soon
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm px-3 py-2">
                    <span className="text-gold-300 text-xs font-display font-bold">{entry.year}</span>
                    <h3 className="text-white text-sm font-medium truncate">
                      {entry.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
            onClick={closeModal}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gold-400 transition-colors z-50"
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
              {selected.photo ? (
                <img
                  src={optimizeCloudinaryUrl(selected.photo.src, 1200)}
                  alt={selected.photo.name}
                  className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
                />
              ) : (
                <div className="w-full max-w-md h-64 rounded-lg shadow-2xl bg-linear-to-br from-maroon-800 to-gold-700 flex items-center justify-center text-cream-100 font-display text-2xl font-semibold tracking-wide uppercase">
                  Coming Soon
                </div>
              )}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mt-6 text-white max-w-2xl"
              >
                <span className="text-gold-400 font-display font-bold">{selected.year}</span>
                <h3 className="text-2xl font-bold mt-1">{selected.title}</h3>
                <p className="text-white/70 mt-2">{selected.blurb}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
