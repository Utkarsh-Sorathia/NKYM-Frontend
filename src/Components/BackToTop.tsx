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

  // Common style classes shared by all three floating buttons — keep this the
  // single source of truth for their size so they can't drift out of sync.
  const iconBase =
    "w-9 h-9 rounded-full shadow-lg flex items-center justify-center transition-colors duration-300";

  return (
    <>
      {/* Social Media Icons — always visible. Shift up once Back to Top
          appears so the two don't stack on top of each other. */}
      <div
        className={`fixed right-6 z-40 flex flex-col gap-2 transition-all duration-300 ${
          visible ? "bottom-17" : "bottom-6"
        }`}
      >
        <a
          href="https://www.instagram.com/nkym__cha__maharaja?igsh=MXU3ODBscWttb3Rrdg=="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={`${iconBase} bg-pink-500 hover:bg-pink-600 text-white`}
        >
          <FaInstagram className="w-4 h-4" />
        </a>
        <a
          href="https://www.facebook.com/share/1BHJjVyQeK/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className={`${iconBase} bg-blue-600 hover:bg-blue-700 text-white`}
        >
          <FaFacebookF className="w-4 h-4" />
        </a>
      </div>

      {/* Back to Top Button */}
      {visible && (
        <button
          aria-label="Back to top"
          onClick={handleClick}
          className={`${iconBase} fixed bottom-6 right-6 z-50 bg-gold-500 hover:bg-gold-600 text-maroon-950`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
