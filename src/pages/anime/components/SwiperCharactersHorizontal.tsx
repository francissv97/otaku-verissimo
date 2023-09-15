import { Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";

interface SwiperCharactersHorizontalProps {
  children: React.ReactNode;
}

export function SwiperCharactersHorizontal({ children }: SwiperCharactersHorizontalProps) {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={3}
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
            slidesPerView: 6,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 7,
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
