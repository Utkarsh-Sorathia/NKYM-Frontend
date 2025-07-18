import axios from "axios";
import React, { useEffect, useState } from "react";
import type { GalleryItem } from "./Admin/Gallery/types"; // Adjust as needed

const Gallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const openModal = (image: GalleryItem) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
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

  return (
    <>
      <section
        id="gallery"
        className="py-12 bg-amber-50 scroll-mt-16 sm:scroll-mt-0"
      >
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-4">
              Our Gallery
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Memories from our previous celebrations and events
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="p-8 text-center text-blue-600">
                Loading gallery...
              </div>
            ) : (
              gallery.map((image, i) => (
                <div
                  key={i}
                  className="gallery-item rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => openModal(image)}
                >
                  <img
                    src={image.src}
                    alt={image.name || `Gallery image ${i + 1}`}
                    className="object-cover w-full h-84 hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Year {image.name}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full p-4">
            <button
              className="absolute top-2 right-2 text-black rounded-full p-2 hover:text-gray-700 transition"
              onClick={closeModal}
              aria-label="Close image modal"
            >
              ✖
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              className="object-contain mx-auto max-h-[80vh] rounded"
            />
            <div className="text-center mt-4 text-lg font-semibold">
              {selectedImage.name}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
