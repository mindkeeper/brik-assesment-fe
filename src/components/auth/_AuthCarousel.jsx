import React, { useMemo } from "react";
import carousel1 from "../../assets/images/carousel1.jpg";
import carousel2 from "../../assets/images/carousel2.jpg";
import carousel3 from "../../assets/images/carousel3.jpg";
import { Carousel } from "antd";
export default function AuthCarousel() {
  const images = useMemo(
    () => [{ src: carousel1 }, { src: carousel2 }, { src: carousel3 }],
    []
  );
  return (
    <Carousel autoplay dots={false}>
      {images.map((image, index) => (
        <div key={index} className="h-[calc(100vh-4rem)] relative text-white">
          <div className="absolute z-20 h-full w-full bg-black opacity-50">
            <img
              src={image.src}
              alt={`carousel-${index}`}
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
}
