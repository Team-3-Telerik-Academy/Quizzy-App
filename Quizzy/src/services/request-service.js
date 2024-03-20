/**
 * Constructs the URL for making a request to the Open Trivia Database API.
 *
 * @param {string} category - The category of the trivia questions.
 * @param {string} difficulty - The difficulty level of the trivia questions.
 * @param {number} amount - The number of trivia questions to retrieve.
 * @returns {string} The constructed URL for the API request.
 */
const getUrl = (category, difficulty, amount) =>
  `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;

/**
 * Decodes HTML entities in a string.
 *
 * @param {string} html - The HTML string to decode.
 * @returns {string} The decoded string.
 */
const decodeHtml = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

/**
 * Shuffles the elements of an array in place.
 *
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} - The shuffled array.
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Fetches quiz questions from an API based on the specified category, difficulty, and amount.
 * @param {string} category - The category of the quiz questions.
 * @param {string} difficulty - The difficulty level of the quiz questions.
 * @param {number} [amount=10] - The number of quiz questions to fetch (default is 10).
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of quiz question objects.
 */
export const getQuizQuestions = async (category, difficulty, amount = 10) => {
  const response = await fetch(getUrl(category, difficulty, amount));
  if (response.ok) {
    const data = await response.json();

    const questions = data.results.map((el) => ({
      title: decodeHtml(el.question),
      correctAnswer: decodeHtml(el.correct_answer),
      answers: shuffleArray([
        ...el.incorrect_answers.map((el) => decodeHtml(el)),
        decodeHtml(el.correct_answer),
      ]),
      generated: true,
      points: 1,
    }));

    return questions;
  }
};