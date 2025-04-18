"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./Carousel.module.scss";
import { sampleAnnouncements } from "./dummydata";
import Card from "./Card/Card";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef, useState } from "react";

function Carousel() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Swiper
      className={styles.carousel}
      modules={[Navigation, Pagination, EffectCoverflow, Autoplay, Keyboard]}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
      keyboard={{ enabled: true, onlyInViewport: true }}
      loop={true}
      spaceBetween={30}
      grabCursor={true}
      effect="coverflow"
      centeredSlides={true}
      initialSlide={2}
      speed={500}
      preventClicks={true}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 0,
        stretch: 80,
        depth: 220,
        modifier: 1,
        slideShadows: true,
      }}
      navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
      onInit={(swiper) => {
        // @ts-expect-error "already done"

        swiper.params.navigation.prevEl = prevRef.current;
        // @ts-expect-error "already done"

        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
      pagination={{ clickable: true }}
      breakpoints={{
        0: {
          slidesPerView: 1.2,
          coverflowEffect: { stretch: 0, depth: 120, rotate: 0 },
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2.3,
          coverflowEffect: { stretch: 40, depth: 180, rotate: 0 },
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          coverflowEffect: { stretch: 80, depth: 220, rotate: 0 },
          spaceBetween: 30,
        },
      }}
    >
      <button
        ref={prevRef}
        className={`${styles.navButton} ${styles.prevButton}`}
      >
        <FiChevronLeft />
      </button>
      <button
        ref={nextRef}
        className={`${styles.navButton} ${styles.nextButton}`}
      >
        <FiChevronRight />
      </button>
      {sampleAnnouncements.map((announcement, idx) => (
        <SwiperSlide key={announcement.id} className={styles.slide}>
          <Card isActive={activeIdx === idx} {...announcement} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
