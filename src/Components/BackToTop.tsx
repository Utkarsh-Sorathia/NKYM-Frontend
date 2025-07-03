import { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Common style classes for social icons
  const iconBase =
    "w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-colors duration-300";

  return (
    <>
      {/* Social Media Icons */}
      <div
        className={`fixed right-8 z-40 flex flex-col gap-3 transition-all duration-300 ${
          visible ? "bottom-24" : "bottom-8"
        }`}
      >
        <a
          href="https://www.instagram.com/nkym__cha__maharaja?igsh=MXU3ODBscWttb3Rrdg=="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={`${iconBase} bg-pink-500 hover:bg-pink-600`}
        >
          <FaInstagram className="w-6 h-6" />
        </a>
        <a
          href="https://www.facebook.com/share/1BHJjVyQeK/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className={`${iconBase} bg-blue-600 hover:bg-blue-700`}
        >
          <FaFacebookF className="w-6 h-6" />
        </a>
      </div>

      {/* Back to Top Button */}
      {visible && (
        <button
          aria-label="Back to top"
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-50 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors ease-in-out duration-300 animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
};

export default BackToTop;
