// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import imgOne from '../assets/images/Img.png'
import imgTwo from '../assets/images/Img (1).png'
import imgThree from '../assets/images/Img (2).png'
function Slider() {
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
        <SwiperSlide>
            <img src={imgOne} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={imgTwo} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={imgThree} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Slider