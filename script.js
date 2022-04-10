// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;
let canClick = true;

showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Functions
function showQuestion(){
    showWarning('', '');

    document.querySelector('.progressCorrect').classList.remove('infoProgressAnimation');
    document.querySelector('.progressIncorrect').classList.remove('infoProgressAnimation');

    document.querySelector('.progressCorrect').innerHTML = `<i class="uil uil-check-circle"></i> ${correctAnswers}`;
    document.querySelector('.progressIncorrect').innerHTML = `<i class="uil uil-times-circle"></i> ${currentQuestion - correctAnswers}`;
    document.querySelector('.progressRemainder').innerHTML = `<i class="uil uil-list-ul"></i> ${questions.length - currentQuestion}`;

    // infoProgress.innerHTML = `Acertou: ${correctAnswers} | Errou: ${currentQuestion - correctAnswers} | Faltam: ${(questions.length - currentQuestion}`;

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

    if (canClick) {
        canClick = false;

        let incorrectAnswerElement = e.target;
        let clickedOption = parseInt(incorrectAnswerElement.getAttribute('data-op'));

        let correctAnswerElement = document.querySelector(`div[data-op="${questions[currentQuestion].answer}"]`);

        if (clickedOption === questions[currentQuestion].answer) {
            correctAnswers++;        

            showWarning('Resposta correta!', 'success');
            correctAnswerElement.style.border = "3px solid green";
            correctAnswerElement.style.backgroundColor = '#fff';
            
            document.querySelector('.progressCorrect').classList.add('infoProgressAnimation');
        } else {
            showWarning('Resposta errada!', 'error');
            correctAnswerElement.style.border = "3px solid green";
            incorrectAnswerElement.style.border = "3px solid red";

            correctAnswerElement.style.backgroundColor = '#fff';
            incorrectAnswerElement.style.backgroundColor = '#fff';

            document.querySelector('.progressIncorrect').classList.add('infoProgressAnimation');
        }

        setTimeout(() => {
            currentQuestion++;
            showQuestion();
            canClick = true;
        }, 2000);
    }
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    // resetando as informacoes da tela
    let infoProgress = document.querySelector('.infoProgress');
    infoProgress.style.display = 'none';

    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';

    // preenchendo as informacoes
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim, em?!';
        document.querySelector('.scorePct').style.color = '#B22222';
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
    canClick = true;
    showQuestion();

    let infoProgress = document.querySelector('.infoProgress');
    infoProgress.style.display = 'grid';
}

function showWarning(message, type) {
    document.querySelector('.c-loader').style.display = (type === '') ? 'none' : 'block';
    document.querySelector('.c-loader').style.borderTopColor = (type === 'success') ? 'green' : 'red';

    let warningElement = document.querySelector('.warning');
    warningElement.innerHTML = message;

    if (type === 'success') {
        warningElement.style.color = 'green';
    } else if (type === 'error'){
        warningElement.style.color = 'red';
    }
}