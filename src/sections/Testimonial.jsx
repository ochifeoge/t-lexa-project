import React, { useEffect, useState } from "react";
import { TestimonialCard } from "../components/TestimonialCard";

// import Swiper core and required modules
import { Pagination, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/bundle";

const Testimonial = () => {
  const getSlidesPerView = () => {
    return window.innerWidth < 750 ? 1 : 2;
  };
  const [slidesPerView, setSlidesperView] = useState(getSlidesPerView());

  useEffect(() => {
    const handleResize = () => {
      setSlidesperView(getSlidesPerView());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container p-10 my-10">
      <h2 className="text-4xl text-center mb-10 ">Customer Reviews</h2>
      <Swiper
        // install Swiper modules
        modules={[Pagination, A11y]}
        spaceBetween={80}
        slidesPerView={slidesPerView}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonial;
