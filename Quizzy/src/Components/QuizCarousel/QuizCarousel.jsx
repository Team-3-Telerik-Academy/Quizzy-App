import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import SingleQuiz from "../SingleQuiz/SingleQuiz";
import PropTypes from "prop-types";

/**
 * Renders a carousel of quizzes.
 *
 * @component
 * @param {Object[]} quizzes - An array of quiz objects.
 * @param {number} value - The current value of the carousel.
 * @param {Function} fn - The function to handle carousel events.
 * @param {string} [width] - The width of the carousel. Defaults to "94.6vw".
 * @returns {JSX.Element} The rendered QuizCarousel component.
 */
const QuizCarousel = ({ quizzes, value, fn, width }) => {
  return (
    <>
      <style>
        {`
          .mySwiper .swiper-pagination-bullets {
            bottom: 6vh !important;
          }
        `}
      </style>
      <Swiper
        style={{
          height: "80vh",
          width: width || "94.6vw",
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
            <SingleQuiz quiz={quiz} value={value} fn={fn} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

QuizCarousel.propTypes = {
  quizzes: PropTypes.array.isRequired,
  value: PropTypes.string,
  fn: PropTypes.func,
  width: PropTypes.string,
};

export default QuizCarousel;
