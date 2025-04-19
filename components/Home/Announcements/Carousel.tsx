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
import { Swiper as SwiperCore } from "swiper/types";

import fallbackImg from "@/assets/fallback.png";

import styles from "./Carousel.module.scss";
import Card from "./Card/Card";
import { type Announcement } from "./dummydata";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
type CarouselProps = {
  data: Announcement[];
  autoplayEnabled?: boolean;
  autoplaySpeed?: number;
  initialSlideIndex?: number;
};

function Carousel({
  data,
  autoplayEnabled = true,
  autoplaySpeed = 3500,
  initialSlideIndex = 0,
}: CarouselProps) {
  const [activeIdx, setActiveIdx] = useState(initialSlideIndex);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Reset to first slide and update active index when data changes
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(0, 0);
      setActiveIdx(0);
    }
  }, [data, swiperInstance]);

  // Update active index based on initialSlideIndex prop ONLY if swiper is ready and index differs
  useEffect(() => {
    if (swiperInstance && initialSlideIndex !== activeIdx) {
      swiperInstance.slideToLoop(initialSlideIndex, 0);
      setActiveIdx(initialSlideIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSlideIndex, swiperInstance]);

  const handleSlideClick = (index: number) => {
    if (swiperInstance && index !== swiperInstance.realIndex) {
      swiperInstance.slideToLoop(index);
    }
  };

  const autoplayConfig = autoplayEnabled
    ? {
        delay: autoplaySpeed,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    : false;

  return (
    <Swiper
      className={styles.carousel}
      modules={[Navigation, Pagination, EffectCoverflow, Autoplay, Keyboard]}
      autoplay={autoplayConfig}
      onSwiper={setSwiperInstance}
      onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
      keyboard={{ enabled: true, onlyInViewport: true }}
      loop={data.length > 4}
      spaceBetween={30}
      grabCursor={true}
      effect="coverflow"
      centeredSlides={true}
      initialSlide={initialSlideIndex}
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
      navigation={
        data.length > 1
          ? { prevEl: prevRef.current, nextEl: nextRef.current }
          : false
      }
      onInit={(swiper) => {
        if (data.length > 1 && swiper.params.navigation) {
          // Link refs only if navigation is enabled
          (swiper.params.navigation as any).prevEl = prevRef.current;
          (swiper.params.navigation as any).nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }
      }}
      pagination={data.length > 1 ? { clickable: true } : false}
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
      {data.length > 1 && (
        <>
          <button
            ref={prevRef}
            className={`${styles.navButton} ${styles.prevButton}`}
            aria-label="Previous slide"
          >
            <FiChevronLeft />
          </button>
          <button
            ref={nextRef}
            className={`${styles.navButton} ${styles.nextButton}`}
            aria-label="Next slide"
          >
            <FiChevronRight />
          </button>
        </>
      )}
      {data.map((announcement, idx) => (
        <SwiperSlide key={announcement.id} className={styles.slide}>
          <div
            onClick={() => handleSlideClick(idx)}
            style={{ width: "100%", height: "100%", cursor: idx === activeIdx ? "grab" : "pointer" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSlideClick(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
          >
            <Card
              imageSrc={announcement.imageSrc || fallbackImg}
              imageAlt={announcement.title}
              title={announcement.title}
              description={announcement.description}
              link={announcement.link}
              linkText={"Read More"}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
