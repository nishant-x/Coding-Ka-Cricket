import { useEffect, useState } from "react";
import Sliderimg01 from "../../assets/Sliderimages/Sliderimg01.jpg";
import Sliderimg02 from "../../assets/Sliderimages/Sliderimg02.png";
import Sliderimg03 from "../../assets/Sliderimages/Sliderimg03.png";
import Sliderimg04 from "../../assets/Sliderimages/Sliderimg04.png";
import Sliderimg05 from "../../assets/Sliderimages/Sliderimg05.jpg";

const images = [Sliderimg02, Sliderimg01, Sliderimg03, Sliderimg04, Sliderimg05];

const Slider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevClick = () => setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
  const handleNextClick = () => setCurrentImage((prevImage) => (prevImage + 1) % images.length);

  return (
    <header className="relative h-[45vh] overflow-hidden rounded-3xl border border-slate-800" style={{ backgroundImage: `url(${images[currentImage]})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-slate-950/35" />
      <button type="button" className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/70 px-3 py-2 text-white" onClick={handlePrevClick}>‹</button>
      <button type="button" className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/70 px-3 py-2 text-white" onClick={handleNextClick}>›</button>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button key={index} type="button" className={`h-2.5 w-2.5 rounded-full ${currentImage === index ? "bg-indigo-400" : "bg-white/70"}`} onClick={() => setCurrentImage(index)} />
        ))}
      </div>
    </header>
  );
};

export default Slider;
