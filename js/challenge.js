function Challenge(type) {
	this.type = type;
	this.challengeQuizQuestions = quizQuestions[this.type];

	this.getNextRun = function() {
		
		if(this.challengeQuizQuestions.length == 0) {
			return false;
		}

		var questionNumber = Math.floor(Math.random() * (this.challengeQuizQuestions.length));
		this.chosenOne = this.challengeQuizQuestions.pop(questionNumber);
		return true;
	}

	this.isAnswerCorrect = function (answer) {
		return this.chosenOne.correctAnswer == answer;
	}

	this.getQuestion = function() {
		return this.chosenOne.question;
	}
	this.getMultipleChoice = function () {
		return this.chosenOne.multipleChoice;
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
quizQuestions[Challenge.types.TRAP].push(new quizQuestion("De que cor é o cavalo verde de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 1));
quizQuestions[Challenge.types.TRAP].push(new quizQuestion("De que cor é o cavalo azul de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 0));
quizQuestions[Challenge.types.TRAP].push(new quizQuestion("De que cor é o cavalo preto de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 3));
quizQuestions[Challenge.types.MONSTER] = [];
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("De que cor é o cavalo branco de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 2));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("De que cor é o cavalo verde de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 1));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("De que cor é o cavalo azul de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 0));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("De que cor é o cavalo preto de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 3));
quizQuestions[Challenge.types.BOSS] = [];
quizQuestions[Challenge.types.BOSS].push(new quizQuestion("De que cor é o cavalo branco de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 2));
quizQuestions[Challenge.types.BOSS].push(new quizQuestion("De que cor é o cavalo verde de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 1));
quizQuestions[Challenge.types.BOSS].push(new quizQuestion("De que cor é o cavalo azul de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 0));
quizQuestions[Challenge.types.BOSS].push(new quizQuestion("De que cor é o cavalo preto de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 3));
quizQuestions[Challenge.types.ITEM] = [];
quizQuestions[Challenge.types.ITEM].push(new quizQuestion("De que cor é o cavalo branco de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 2));
quizQuestions[Challenge.types.ITEM].push(new quizQuestion("De que cor é o cavalo verde de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 1));
quizQuestions[Challenge.types.ITEM].push(new quizQuestion("De que cor é o cavalo azul de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 0));
quizQuestions[Challenge.types.ITEM].push(new quizQuestion("De que cor é o cavalo preto de Napoleao?", ['Azul', 'Verde', 'Branco', 'Preto'], 3));