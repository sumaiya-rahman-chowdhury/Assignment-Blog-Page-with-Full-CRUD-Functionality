// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


type Images = {
  images?: string[];
};
function Slider({ images }: Images) {
  console.log("this is from slider", images);
  return (
    <div>
      <Swiper
        slidesPerView={2.5}
        spaceBetween={3}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {images?.map((image) => {
          return (
            <SwiperSlide>
              <img src={image} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Slider;
