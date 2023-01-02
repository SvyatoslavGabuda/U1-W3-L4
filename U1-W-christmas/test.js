const questions = [
  {
    question: "1?",
    correct_answer: "1",
    incorrect_answers: ["2", "3", "4"],
  },
  {
    question: "2?",
    correct_answer: "1",
    incorrect_answers: ["2", "3", "4"],
  },
  {
    question: "3?",
    correct_answer: "1",
    incorrect_answers: ["2", "3", "4"],
  },
  {
    question: "4?",
    correct_answer: "1",
    incorrect_answers: ["2", "3", "4"],
  },
  {
    question: "5?",
    correct_answer: "1",
    incorrect_answers: ["2", "3", "4"],
  },
  {
    question: "6?",
    correct_answer: "1",
    incorrect_answers: ["2", "3", "4"],
  },
];

const numeroDomande = 10;
const arr1 = [];
for (let i = 0; i < numeroDomande; i++) {
  const numRandom = Math.floor(Math.random() * 101);
  arr1[i] = numRandom;
}
const arr2 = [];
for (let i = 0; i < numeroDomande; i++) {
  const numRandom = Math.floor(Math.random() * 101);
  arr2[i] = numRandom;
}
const domanda = [];
const rispostaGiusta = [];
const risposteSbagliate = [];
const risposteSbagliate2 = [];
const risposteSbagliate3 = [];

for (let i = 0; i < arr1.length; i++) {
  switch (true) {
    case arr1[i] % arr2[i] === 0:
      domanda[i] = "Quanto fa " + arr1[i] + " / " + arr2[i] + " ?";
      rispostaGiusta[i] = arr1[i] / arr2[i];
      risposteSbagliate[i] = (arr1[i] / arr2[i]) * 2 - 15;
      risposteSbagliate2[i] = (arr1[i] / arr2[i]) * 3 - 100;
      risposteSbagliate3[i] = (arr1[i] - arr2[i]) * 3 - 40;
      break;
    case arr1[i] - arr2[i] > 0:
      domanda[i] = "Quanto fa " + arr1[i] + " - " + arr2[i] + " ?";
      rispostaGiusta[i] = arr1[i] - arr2[i];
      risposteSbagliate[i] = (arr1[i] - arr2[i]) * 2 - 15;
      risposteSbagliate2[i] = (arr1[i] - arr2[i]) * 3 - 100;
      risposteSbagliate3[i] = (arr1[i] - arr2[i]) * 3 - 40;
      break;

    case arr1[i] * arr2[i] <= 2000:
      domanda[i] = "Quanto fa " + arr1[i] + " * " + arr2[i] + " ?";
      rispostaGiusta[i] = arr1[i] * arr2[i];
      risposteSbagliate[i] = arr1[i] * arr2[i] * 2 - 15;
      risposteSbagliate2[i] = arr1[i] * arr2[i] * 3 - 100;
      risposteSbagliate3[i] = (arr1[i] + arr2[i]) * 4;
      break;
    default:
      domanda[i] = "Quanto fa " + arr1[i] + " + " + arr2[i] + " ?";
      rispostaGiusta[i] = arr1[i] + arr2[i];
      risposteSbagliate[i] = (arr1[i] + arr2[i]) * 2 - 15;
      risposteSbagliate2[i] = (arr1[i] + arr2[i]) * 3 - 100;
      risposteSbagliate3[i] = (arr1[i] - arr2[i]) * 3 - 40;
  }
}

const domandeRandom = domanda.map((cur, index) => {
  return {
    domanda: cur,
    rispostaGiusta: rispostaGiusta[index],
    risposteSbagliate: [
      risposteSbagliate[index],
      risposteSbagliate2[index],
      risposteSbagliate3[index],
    ],
  };
});

// console.log(arr1);
// console.log(arr2);
// console.log(domanda);
// console.log(rispostaGiusta);
// console.log("risp" + risposteSbagliate);
// console.log(domandeRandom);

const startbtn = document.getElementById("testbtn");
const main = document.querySelector("main");
const header = document.querySelector("header");
const section = document.querySelector("section");

const testStart = function () {
  main.classList.add("hide");
  header.classList.add("hide");
  section.classList.remove("hide");
  takeNextQuestion();
};

startbtn.addEventListener("click", testStart);

const testContainer = document.getElementById("testContainer");
const testQuestion = document.getElementById("testQuestion");
const testAnswers = document.getElementById("answer");
const nextBtn = document.getElementById("nextBtn");

let numCorrectAnswers = 0;
let numINcorrectAnswers = 0;
let index = 0;
let tentativo = 1;

nextBtn.addEventListener("click", () => {
  index++;
  takeNextQuestion();
});

const takeNextQuestion = function () {
  reset();
  takequestion(domandeRandom);
};

const reset = function () {
  nextBtn.classList.add("hide");
  while (testAnswers.firstChild) {
    testAnswers.removeChild(testAnswers.firstChild);
  }
};

const takequestion = function (questions) {
  testQuestion.innerText = questions[index].domanda;
  const correctAnswer = [];
  correctAnswer.push(questions[index].rispostaGiusta);
  const answersArr = correctAnswer.concat(questions[index].risposteSbagliate);

  answersArr.forEach((ans) => {
    const bottone = document.createElement("button");
    bottone.innerText = ans;
    bottone.classList.add("btnAnswer");
    bottone.addEventListener("click", answer);
    testAnswers.appendChild(bottone);
  });
};

const answer = function (e) {
  const answeredBtn = e.target;
  const createdBtn = document.querySelectorAll("#answer .btnAnswer");
  createdBtn.forEach((btn) => btn.classList.remove("selectedBtn"));
  answeredBtn.classList.add("selectedBtn");
  if (answeredBtn.innerText == domandeRandom[index].rispostaGiusta) {
    numCorrectAnswers++;
  } else {
    numINcorrectAnswers++;
  }
  if (index + 1 < domandeRandom.length) {
    nextBtn.classList.remove("hide");
  } else {
    const risultato = document.createElement("h2");

    risultato.innerText = "le vostre risposte giuste sono" + numCorrectAnswers;
    testContainer.appendChild(risultato);
    const btnFinish = document.createElement("button");
    btnFinish.onclick = () => {
      main.classList.remove("hide");
      header.classList.remove("hide");
      section.classList.add("hide");
      reset();
    };
    btnFinish.innerText = "FINISH";
    testContainer.appendChild(btnFinish);
    const today = document.querySelector(".oggi");
    const paragrafoRis = document.createElement("p");
    paragrafoRis.innerText =
      "test n: " + tentativo + " risultato: " + numCorrectAnswers;
    today.appendChild(paragrafoRis);
    today.classList.add("tasked");
    tentativo++;
  }
};
