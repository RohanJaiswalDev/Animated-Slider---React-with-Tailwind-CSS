import { useState, useEffect } from 'react';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

//** Import your images...
import img1 from './assets/img/img1.jpg';
import img2 from './assets/img/img2.jpg';
import img3 from './assets/img/img3.jpg';
import img4 from './assets/img/img4.jpg';
import img5 from './assets/img/img5.jpg';

const images = [
  { src: img1, name: 'Design - 1' },
  { src: img2, name: 'Design - 2' },
  { src: img3, name: 'Design - 3' },
  { src: img4, name: 'Design - 4' },
  { src: img5, name: 'Design - 5' },
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //** Set background theme color and key controls...
  useEffect(() => {
    document.body.classList.add('bg-black', 'text-white');

    //** Also work keyboard left & right arrow keys...
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('bg-black', 'text-white');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  //** Arrow button handlers...
  const handlePrev = () => {
    let newIndex;
    if (currentIndex === 0) {
      newIndex = images.length - 1;
    } else {
      newIndex = currentIndex - 1;
    }
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    let newIndex;
    if (currentIndex === images.length - 1) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }
    setCurrentIndex(newIndex);
  };

  //** Card hover changes background...
  const handleCardHover = (index) => {
    setCurrentIndex(index);
  };

  return (
    <main className="h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-screen"
        style={{ backgroundImage: `url(${images[currentIndex].src})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-opacity-50"></div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex justify-between items-center p-4 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold">Slider.React.Dev</h2>
        {!isMobile && (
          <div className="flex items-center space-x-6 lg:space-x-8">
            <span className="link-effect cursor-pointer hover:text-gray-300 transition">Home</span>
            <span className="link-effect cursor-pointer hover:text-gray-300 transition">About</span>
            <span className="link-effect cursor-pointer hover:text-gray-300 transition">Contact</span>
            <span className="link-effect cursor-pointer hover:text-gray-300 transition">Services</span>
          </div>
        )}
        <div className="link-effect cursor-pointer hover:text-gray-300 transition">
          <FaSearch size={isMobile ? 16 : 20} />
        </div>
      </nav>

      {/* Info Box */}
      <div className="relative z-10 flex flex-col justify-between h-[calc(100vh-200px)] md:h-auto md:flex-row items-start md:items-center p-4 md:p-8 mt-8 md:mt-0">
        <div className="w-full md:w-2/5 mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6">
            Slider <span className="block sm:inline">{images[currentIndex].name}</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6">
            This responsive React slider features smooth transitions, keyboard navigation, and mobile touch controls.
            The dynamic background changes with each selection, while thumbnail previews provide intuitive browsing.
            Built with modern web technologies for optimal performance.
          </p>
        </div>

        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 self-center md:self-auto">
          <button
            className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white rounded-full flex justify-center items-center cursor-pointer hover:bg-white hover:text-black transition focus:outline-none"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <FaArrowLeft size={isMobile ? 16 : 20} />
          </button>
          <button
            className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white rounded-full flex justify-center items-center cursor-pointer hover:bg-white hover:text-black transition focus:outline-none"
            onClick={handleNext}
            aria-label="Next image"
          >
            <FaArrowRight size={isMobile ? 16 : 20} />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="absolute bottom-4 md:bottom-8 left-0 right-0 z-20 flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 p-2 md:p-4 overflow-x-auto">
        {images.map((image, index) => (
          <div
            key={index}
            onMouseEnter={() => !isMobile && handleCardHover(index)}
            onClick={() => isMobile && handleCardHover(index)}
            className={`relative z-20 h-40 w-28 sm:h-56 sm:w-36 md:h-64 md:w-44 lg:h-72 lg:w-52 xl:h-80 xl:w-56 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${currentIndex === index
              ? 'scale-105 sm:scale-110 mx-2 sm:mx-3 md:mx-4 lg:mx-6 xl:mx-8 brightness-100'
              : 'hover:brightness-100 brightness-70'
              }`}
          >
            <img
              src={image.src}
              alt={`img${index + 1}`}
              className="h-full w-full object-cover object-center transition duration-300"
            />
            <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-xs sm:text-sm md:text-base">
              {image.name}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;