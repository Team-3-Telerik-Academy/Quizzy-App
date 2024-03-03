const getUrl = (category, difficulty, amount = 10) => `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;

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
}

export const getQuizQuestions = async (category, difficulty) => {
    const response = await fetch(getUrl(category, difficulty));
    if (response.ok) {
        const data = await response.json();

        const question = data.results.map(el => ({
            title: decodeHtml(el.question),
            correctAnswer: decodeHtml(el.correct_answer),
            answers: shuffleArray([...el.incorrect_answers.map(el => decodeHtml(el)), decodeHtml(el.correct_answer)]), generated: true,
            points: 1,
        }));

        return question;
    }
}