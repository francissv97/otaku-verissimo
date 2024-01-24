import { Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface SwiperSectionHomeProps {
  children: React.ReactNode;
}

export function SwiperSectionHome({ children }: SwiperSectionHomeProps) {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={16}
      pagination={{ dynamicBullets: true }}
      modules={[Pagination]}
      breakpoints={{
        360: {
          slidesPerView: 3,
        },
        480: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 5,
        },
        1024: {
          slidesPerView: 6,
        },
      }}
      style={{ paddingBottom: 24, paddingInline: 16 }}
    >
      {children}
    </Swiper>
  );
}
