import { Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface SwiperSectionHomeProps {
  children: React.ReactNode;
}

export function SwiperSectionHome({ children }: SwiperSectionHomeProps) {
  return (
    <div className="px-4">
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{ dynamicBullets: true }}
        modules={[Pagination]}
        breakpoints={{
          360: {
            slidesPerView: 3,
            spaceBetween: 14,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
        style={{ paddingBottom: 24 }}
      >
        {children}
      </Swiper>
    </div>
  );
}
