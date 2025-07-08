import { useState } from "react";
import { FaBars } from "react-icons/fa6";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Title */}
        <a href="#" className="flex items-center" onClick={(e) => handleSmoothScroll(e, "#")}>
          <img src="/icon.png" alt="Ganesh Logo" className="h-16 w-16" />
          <div className="ml-3">
            <h1 className="text-xl font-bold text-amber-600">
              Natkhat Kanudo Yuvak Mandal
            </h1>
            <p className="text-xs text-gray-600">Est. 2012</p>
          </div>
        </a>
        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <a
                href="#"
                className="nav-link active-nav text-amber-600 font-medium"
                onClick={(e) => handleSmoothScroll(e, "#")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="nav-link hover:text-amber-600 font-medium"
                onClick={(e) => handleSmoothScroll(e, "#about")}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className="nav-link hover:text-amber-600 font-medium"
                onClick={(e) => handleSmoothScroll(e, "#gallery")}
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#events"
                className="nav-link hover:text-amber-600 font-medium"
                onClick={(e) => handleSmoothScroll(e, "#events")}
              >
                Events
              </a>
            </li>
          </ul>
        </nav>
        {/* Hamburger Button */}
        <button
          className="md:hidden text-amber-600 text-2xl"
          onClick={handleMenuToggle}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden ${mobileOpen ? "block" : "hidden"
          } bg-white shadow-lg`}
      >
        <ul className="px-4 py-2">
          <li className="py-2 border-b border-gray-100">
            <a
              href="#"
              className="block mobile-nav-link text-amber-600 font-medium"
              onClick={(e) => handleSmoothScroll(e, "#")}
            >
              Home
            </a>
          </li>
          <li className="py-2 border-b border-gray-100">
            <a
              href="#about"
              className="block mobile-nav-link hover:text-amber-600 font-medium"
              onClick={(e) => handleSmoothScroll(e, "#about")}
            >
              About Us
            </a>
          </li>
          <li className="py-2 border-b border-gray-100">
            <a
              href="#gallery"
              className="block mobile-nav-link hover:text-amber-600 font-medium"
              onClick={(e) => handleSmoothScroll(e, "#gallery")}
            >
              Gallery
            </a>
          </li>
          <li className="py-2 border-b border-gray-100">
            <a
              href="#events"
              className="block mobile-nav-link hover:text-amber-600 font-medium"
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
