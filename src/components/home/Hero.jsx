import { Carousel } from "antd";
import React, { useMemo } from "react";
import hero1 from "../../assets/images/hero1.jpg";
import hero2 from "../../assets/images/hero2.jpg";
export default function Hero() {
  const images = useMemo(() => [{ src: hero1 }, { src: hero2 }], []);
  return (
    <section>
      <Carousel autoplay autoplaySpeed={4000}>
        {images.map((image, index) => (
          <div key={index} className="p-4 h-full flex">
            <div className="block w-full max-w-[960px] mx-auto aspect-[3] relative rounded-lg overflow-hidden shadow-md">
              <img
                src={image.src}
                alt={`hero-${index}`}
                className="object-cover block w-full max-w-[960px] mx-auto aspect-[3] relative rounded-lg overflow-hidden shadow-md"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
