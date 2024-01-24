import { Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";

interface SwiperHorizontalProps {
  children: React.ReactNode;
}

export function SwiperHorizontal({ children }: SwiperHorizontalProps) {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={3}
        spaceBetween={16}
        pagination={{ dynamicBullets: true }}
        modules={[Pagination]}
        breakpoints={{
          360: {
            slidesPerView: 4,
          },
          480: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 8,
          },
        }}
        style={{ paddingBottom: 24, paddingInline: 16 }}
      >
        {children}
      </Swiper>
    </div>
  );
}
