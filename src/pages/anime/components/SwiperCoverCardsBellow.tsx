import { Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";

interface SwiperCoverCardsBellowProps {
  children: React.ReactNode;
}

export function SwiperCoverCardsBellow({ children }: SwiperCoverCardsBellowProps) {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{ dynamicBullets: true }}
        modules={[Pagination]}
        breakpoints={{
          360: {
            slidesPerView: 2,
            spaceBetween: 14,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
        style={{ paddingBottom: 24, paddingInline: 16 }}
      >
        {children}
      </Swiper>
    </div>
  );
}
