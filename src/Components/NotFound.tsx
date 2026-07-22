import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-cream-50 text-center">
      <h1 className="text-6xl font-bold text-gold-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-maroon-950 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 bg-gold-500 text-maroon-950 font-semibold rounded-full hover:bg-gold-600 transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;