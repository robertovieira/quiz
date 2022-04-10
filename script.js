// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Functions
function showQuestion(){
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        // arredondando para baixo, pois alguns navegadores nao gostam de porcentagem quebrada 23.838182381283%
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';

        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

        document.querySelector('.questionArea').style.display = 'block';
    } else {
        // acabram as questoes
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (clickedOption === questions[currentQuestion].answer) {
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    // resetando as informacoes da tela
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';

    // preenchendo as informacoes
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim, em?!';
        document.querySelector('.scorePct').style.color = '#f00';
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito Bom!';
        document.querySelector('.scorePct').style.color = '#ff0';
    } else {
        document.querySelector('.scoreText1').innerHTML = 'Excelente!';
        document.querySelector('.scorePct').style.color = '#0d630d';
    }

    // exibindo as novas informacoes
    document.querySelector('.scoreArea').style.display = 'block';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}