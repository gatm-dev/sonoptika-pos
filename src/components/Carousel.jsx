import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import Banner1 from "../assets/b1.png";
import Banner2 from "../assets/b2.png";

const Carousel = () => {
  return (
    <>
      <Swiper
        pagination={{
          type: "bullets",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
      >
        <SwiperSlide>
          <img src={Banner1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner2} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
