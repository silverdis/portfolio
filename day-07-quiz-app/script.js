// 1. 퀴즈 데이터 배열
const quizData = [
  {
    question: "대한민국의 수도는 어디인가요?",
    choices: ["서울", "부산", "인천", "대전"],
    answer: 0
  },
  {
    question: "HTML의 약자는 무엇인가요?",
    choices: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Transfer Markup Language",
      "Hyperlink and Text Markup Language"
    ],
    answer: 0
  },
  {
    question: "다음 중 자바스크립트 변수 선언 키워드가 아닌 것은?",
    choices: ["var", "let", "const", "def"],
    answer: 3
  },
  {
    question: "CSS에서 글자색을 지정하는 속성은?",
    choices: ["font-size", "color", "background", "text-align"],
    answer: 1
  }
];

// 문제 순서를 랜덤하게 섞어서 사용할 배열
let shuffledQuiz = [];

// Fisher-Yates 알고리즘으로 배열을 랜덤하게 섞음
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


// 2. 첫 번째 문제를 화면에 표시하는 함수
let selectedChoice = null; // 사용자가 선택한 답의 인덱스 저장
let currentQuestion = 0; // 현재 문제 번호
let score = 0; // 맞힌 문제 개수

function showQuestion(index) {
  const q = shuffledQuiz[index];
  const questionElem = document.getElementById('question');
  const choicesElem = document.getElementById('choices');
  const nextBtn = document.getElementById('next-btn');
  
  // 질문 표시
  questionElem.textContent = q.question;

  // 선택지 버튼 초기화
  choicesElem.innerHTML = '';
  selectedChoice = null; // 새 문제에서는 선택 초기화
  nextBtn.disabled = true; // 선택 전에는 다음 버튼 비활성화

  // 결과 메시지 숨기기
  let resultMsg = document.getElementById('result-msg');
  if (!resultMsg) {
    resultMsg = document.createElement('div');
    resultMsg.id = 'result-msg';
    resultMsg.style.display = 'none';
    resultMsg.style.margin = '14px 0 0 0';
    resultMsg.style.fontWeight = 'bold';
    resultMsg.style.fontSize = '1.08em';
    resultMsg.style.transition = 'opacity 0.2s';
    document.getElementById('quiz-container').appendChild(resultMsg);
  }
  resultMsg.style.display = 'none';
  resultMsg.textContent = '';

  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.type = 'button';
    btn.className = '';
    btn.setAttribute('data-choice', i);
    btn.addEventListener('click', function() {
      // 모든 버튼의 selected 클래스 제거
      Array.from(choicesElem.children).forEach(b => b.classList.remove('selected'));
      // 현재 버튼에만 selected 클래스 추가
      btn.classList.add('selected');
      // 선택한 답 인덱스 저장
      selectedChoice = i;
      nextBtn.disabled = false; // 선택하면 다음 버튼 활성화
    });
    choicesElem.appendChild(btn);
  });
}


// 3. 페이지가 열리면 첫 문제 표시
window.addEventListener('DOMContentLoaded', function() {
  shuffledQuiz = shuffleArray(quizData);
  showQuestion(0);
});

// 4. 다음 버튼 동작 구현
const nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', function() {
  // 1. 답 선택 여부 확인
  if (selectedChoice === null) {
    // 선택하지 않으면 아무 일도 안 함
    return;
  }
  // 2. 정답 비교
  const isCorrect = selectedChoice === shuffledQuiz[currentQuestion].answer;
  if (isCorrect) {
    // 3. 정답이면 점수 증가
    score++;
  }

  // 결과 메시지 표시
  const resultMsg = document.getElementById('result-msg');
  resultMsg.textContent = isCorrect ? '정답입니다! 😊' : '오답입니다! 😢';
  resultMsg.style.color = isCorrect ? '#44bd32' : '#e84118';
  resultMsg.style.display = 'block';
  resultMsg.style.opacity = '1';

  // 버튼 연타 방지
  nextBtn.disabled = true;

  // 1초 후 다음 문제로 이동
  setTimeout(() => {
    // 4. 다음 문제로 이동
    currentQuestion++;
    // 5. 남은 문제가 있으면 다음 문제 표시
    if (currentQuestion < shuffledQuiz.length) {
      showQuestion(currentQuestion);
    } else {
      // 6. 모든 문제를 다 풀었으면 결과 화면 표시
      showScore();
    }
  }, 1000);
});

function showScore() {
  // 퀴즈 화면 숨기기
  document.getElementById('quiz-container').style.display = 'none';
  // 점수 화면 보이기
  const scoreElem = document.getElementById('score');
  scoreElem.style.display = 'block';
  // 점수 텍스트만 별도 영역에 표시
  let scoreText = document.getElementById('score-text');
  if (!scoreText) {
    scoreText = document.createElement('div');
    scoreText.id = 'score-text';
    scoreText.style.fontSize = '1.2em';
    scoreText.style.marginBottom = '10px';
    scoreElem.insertBefore(scoreText, scoreElem.firstChild);
  }
  scoreText.innerHTML = `최종 점수 확인<br>맞힌 개수: <strong>${score}</strong> / ${shuffledQuiz.length}`;
  // 다시 풀기 버튼 이벤트 연결
  const retryBtn = document.getElementById('retry-btn');
  if (retryBtn) {
    retryBtn.onclick = restartQuiz;
    retryBtn.style.display = 'inline-block';
  }
}

function restartQuiz() {
  score = 0;
  currentQuestion = 0;
  selectedChoice = null;
  shuffledQuiz = shuffleArray(quizData); // 다시 섞기
  document.getElementById('score').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'flex';
  showQuestion(0);
}

