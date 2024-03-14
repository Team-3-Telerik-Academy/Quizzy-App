import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import SingleQuiz from "../SingleQuiz/SingleQuiz";
import PropTypes from "prop-types";

const QuizCarousel = ({ quizzes, value }) => {
  return (
    <>
      <style>
        {`
          .mySwiper .swiper-pagination-bullets {
            bottom: 10vh !important;
          }
        `}
      </style>
      <Swiper
        style={{
          height: "85vh",
          width: "94.6vw",
          paddingTop: "30px",
          margin: "0",
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {quizzes.map((quiz) => (
          <SwiperSlide
            key={quiz.id}
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "330px",
              height: "450px",
            }}
          >
            <SingleQuiz quiz={quiz} value={value} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

QuizCarousel.propTypes = {
  quizzes: PropTypes.array.isRequired,
  value: PropTypes.string,
};

export default QuizCarousel;
