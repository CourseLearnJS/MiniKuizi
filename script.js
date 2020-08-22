const startButton = document.getElementById('start-btn')
const questionDiv = document.getElementById('question-div')
const nextButton = document.getElementById('next-btn')
const questionElement = document.getElementById('question')
const answerElement = document.getElementById('answer')

let allQuestions, currentQuestionIndex
let results = [];

const startGame = (e) => {
    startButton.classList.add('hide')
    questionDiv.classList.remove('hide')
    allQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0;
    startButton.addEventListener('click', getResult)
    nextQuestion()
}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})


const showQuestions = (question) => {
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
            const button = document.createElement("button")
            button.innerText = answer.text
            button.classList.add('btn')
            button.classList.add('answerBtn')
            if(answer.correct) {
                button.dataset.correct = answer.correct
            }

            button.addEventListener('click', answerQuestion)
            button.addEventListener('click', alert)
            button.addEventListener('click', getResult)
            answerElement.appendChild(button)
    });
    document.getElementById('result').innerText = ''
}

const nextQuestion = () => {
    removeClass(document.body)
    resetQuestion()
    document.getElementById('alert').innerText = ''
    document.getElementById('result').innerText = ''
    showQuestions(allQuestions[currentQuestionIndex])
}
 

const resetQuestion = () => {
    nextButton.classList.add('hide')
    while(answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild)
    }
}

const answerQuestion = (e) => {
    const selectedAnswer = e.target
    const correct = selectedAnswer.dataset.correct
    changeClass( document.body, correct)
    Array.from(answerElement.children).forEach(button => {
        changeClass(button, button.dataset.correct)
        button.setAttribute("disabled", "true")
    })
    
    if(allQuestions.length > currentQuestionIndex + 1 )
    {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Rifillo'
        startButton.classList.remove('hide')
        document.getElementById('result').innerText = `Numri total i pikëve: ${getResult(e)}`
    }
    
}



const alert = (e) => {

    if(e.target.classList.contains('correct')){
        document.getElementById('alert').innerText = 'Saktë 😊'
    } else {
        document.getElementById('alert').innerText = 'Gabim 😔'
    }
}

const changeClass = (element, correct) => {
    removeClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }    
}



const removeClass = (element) => {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const getResult = (e) => {

    if(e.target.classList.contains('correct'))
    {
        results.push(1);
    } 

    if(e.target.classList.contains('start-btn'))
    {
        results = []
    }

    let sum = results.reduce((a,b) => {
        return a+b
    }, 0)

    return sum
}

const questions = [
    {
        question: '1) 2+2',
        answer: [
            { text: '4', correct: true},
            { text: '22', correct: false}
        ]
    },

    {
        question: '2) 2+3',
        answer: [
            { text: '55', correct: false},
            { text: '5', correct: true}
        ]
    }
]