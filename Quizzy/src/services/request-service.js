const getUrl = (category, difficulty, amount) =>
  `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;

const decodeHtml = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getLiveBattleQuestions = async (category1, category2) => {
  const questions1 = await getQuizQuestions(category1, "medium", 5);

  await delay(5000);

  const questions2 = await getQuizQuestions(category2, "medium", 5);

  return shuffleArray([...questions1, ...questions2]);
};
