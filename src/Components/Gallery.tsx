import { Helmet } from "react-helmet";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import type { GalleryItem } from "./Admin/Gallery/types"; // Adjust the import path as necessary

const Gallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchGallery = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/gallery/all`
      );
      setGallery(response.data.gallery); // backend must return gallery array with id fields
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
      <Helmet>
        <title>Gallery | Natkhat Kanudo Yuvak Mandal</title>
        <meta name="description" content="Explore memories from previous celebrations and events of Natkhat Kanudo Yuvak Mandal." />
        <meta property="og:title" content="Gallery | Natkhat Kanudo Yuvak Mandal" />
        <meta property="og:description" content="Explore memories from previous celebrations and events of Natkhat Kanudo Yuvak Mandal." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={gallery.length ? gallery[0].src : "https://nkym.vercel.app/icon.png"} />
        <meta property="og:url" content="https://nkym.vercel.app/gallery" />
      </Helmet>
      <section
        id="gallery"
        className="py-20 bg-amber-50 scroll-mt-64 sm:scroll-mt-0"
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
                  className="gallery-item rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={image.src}
                    alt={image.name || `Gallery image ${i + 1}`}
                    className="w-full h-64 object-contain hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{image.name}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
