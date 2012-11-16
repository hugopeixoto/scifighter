function Challenge(type) {
	this.type = type;

	var questionNumber = Math.floor(Math.random() * (quizQuestions[this.type].length));
	this.question = quizQuestions[this.type][questionNumber].question;
	this.multipleChoice = quizQuestions[this.type][questionNumber].multipleChoice;
	
	var correctAnswer = quizQuestions[this.type][questionNumber].correctAnswer;
	this.isAnswerCorrect = function (answer) {
		return correctAnswer == answer;
	}
}

function quizQuestion(question, multipleChoice, correctAnswer) {
	this.question = question;
	this.multipleChoice = multipleChoice;
	this.correctAnswer = correctAnswer;
}

Challenge.types = {
	TRAP: 1,
	MONSTER: 2,
	BOSS: 3,
	ITEM: 4
}

var quizQuestions = {};
quizQuestions[Challenge.types.TRAP] = [];
quizQuestions[Challenge.types.TRAP].push(new quizQuestion("De que cor é o cavalo branco de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 2));
quizQuestions[Challenge.types.MONSTER] = [];
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("De que cor é o cavalo branco de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 2));
quizQuestions[Challenge.types.BOSS] = [];
quizQuestions[Challenge.types.BOSS].push(new quizQuestion("De que cor é o cavalo branco de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 2));
quizQuestions[Challenge.types.ITEM] = [];
quizQuestions[Challenge.types.ITEM].push(new quizQuestion("De que cor é o cavalo branco de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 2));