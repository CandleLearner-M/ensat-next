"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./Carousel.module.scss";
import { sampleAnnouncements } from "./dummydata";
import Card from "./Card/Card";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from "react";

function Carousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Swiper
      className={styles.carousel}
      modules={[Navigation, Pagination, EffectCoverflow]}
      spaceBetween={30}
      grabCursor={true}
      effect="coverflow"
      centeredSlides={true}
      initialSlide={2}
      speed={600}
      preventClicks={true}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 0,
        stretch: 80,
        depth: 350,
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
    >
      <button
        ref={prevRef}
        className={`${styles.navButton} ${styles.prevButton}`}
        // aria-label={t("prevButtonLabel")}
      >
        <FiChevronLeft />
      </button>
      <button
        ref={nextRef}
        className={`${styles.navButton} ${styles.nextButton}`}
        // aria-label={t("nextButtonLabel")}
      >
        <FiChevronRight />
      </button>
      {sampleAnnouncements.map((announcement) => (
        <SwiperSlide key={announcement.id} className={styles.slide}>
          <Card />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
