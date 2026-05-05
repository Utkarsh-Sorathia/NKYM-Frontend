import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa6";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => setMobileOpen(!mobileOpen);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    target: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);

    const headerHeight = document.querySelector("header")?.offsetHeight || 80;

    if (target === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const el = document.querySelector(target);
    if (el) {
      const yOffset =
        el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Title */}
        <a href="#" className="flex items-center group" onClick={(e) => handleSmoothScroll(e, "#")}>
          <img src="/icon.png" alt="Ganesh Logo" className="h-14 w-14 sm:h-16 sm:w-16 transition-transform duration-300 group-hover:scale-110" />
          <div className="ml-3">
            <h1 className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
              scrolled ? "text-amber-600" : "text-white"
            }`}>
              Natkhat Kanudo Yuvak Mandal
            </h1>
            <p className={`text-[10px] sm:text-xs transition-colors duration-300 ${
              scrolled ? "text-gray-600" : "text-gray-200"
            }`}>Est. 2012</p>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <a
                href="#"
                className={`nav-link font-semibold transition-colors duration-300 ${
                  scrolled 
                    ? "text-gray-700 hover:text-amber-600" 
                    : "text-white hover:text-amber-300"
                }`}
                onClick={(e) => handleSmoothScroll(e, "#")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`nav-link font-semibold transition-colors duration-300 ${
                  scrolled 
                    ? "text-gray-700 hover:text-amber-600" 
                    : "text-white hover:text-amber-300"
                }`}
                onClick={(e) => handleSmoothScroll(e, "#about")}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className={`nav-link font-semibold transition-colors duration-300 ${
                  scrolled 
                    ? "text-gray-700 hover:text-amber-600" 
                    : "text-white hover:text-amber-300"
                }`}
                onClick={(e) => handleSmoothScroll(e, "#gallery")}
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#events"
                className={`nav-link font-semibold transition-colors duration-300 ${
                  scrolled 
                    ? "text-gray-700 hover:text-amber-600" 
                    : "text-white hover:text-amber-300"
                }`}
                onClick={(e) => handleSmoothScroll(e, "#events")}
              >
                Events
              </a>
            </li>
          </ul>
        </nav>

        {/* Hamburger Button */}
        <button
          className={`md:hidden text-2xl transition-colors duration-300 ${
            scrolled ? "text-amber-600" : "text-white"
          }`}
          onClick={handleMenuToggle}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${mobileOpen ? "block" : "hidden"
          } bg-white shadow-lg absolute top-full left-0 right-0`}
      >
        <ul className="px-4 py-2">
          <li className="py-3 border-b border-gray-100">
            <a
              href="#"
              className="block text-amber-600 font-medium"
              onClick={(e) => handleSmoothScroll(e, "#")}
            >
              Home
            </a>
          </li>
          <li className="py-3 border-b border-gray-100">
            <a
              href="#about"
              className="block text-gray-700 hover:text-amber-600 font-medium"
              onClick={(e) => handleSmoothScroll(e, "#about")}
            >
              About Us
            </a>
          </li>
          <li className="py-3 border-b border-gray-100">
            <a
              href="#gallery"
              className="block text-gray-700 hover:text-amber-600 font-medium"
              onClick={(e) => handleSmoothScroll(e, "#gallery")}
            >
              Gallery
            </a>
          </li>
          <li className="py-3 border-b border-gray-100">
            <a
              href="#events"
              className="block text-gray-700 hover:text-amber-600 font-medium"
              onClick={(e) => handleSmoothScroll(e, "#events")}
            >
              Events
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
