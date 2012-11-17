function Challenge(type) {
	this.type = Challenge.types.MONSTER //type;
	this.challengeQuizQuestions = quizQuestions[this.type].slice(0);

	this.getNextRun = function() {
		
		if(this.challengeQuizQuestions.length == 0) {
	        this.challengeQuizQuestions = quizQuestions[this.type].slice(0);
			return false;
		}

		var questionNumber = Math.floor(Math.random() * (this.challengeQuizQuestions.length - 1));
		this.chosenOne = this.challengeQuizQuestions.splice(questionNumber,1)[0];
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
quizQuestions[Challenge.types.TRAP].push(new quizQuestion("What is the prime number after 13?",["15","19","21","17"],3));
quizQuestions[Challenge.types.TRAP].push(new quizQuestion("Which two primes are consecutive?",["15 19","13 19","23 29","27 29"],2));
quizQuestions[Challenge.types.TRAP].push(new quizQuestion("What is 4 to the power of 0?",["0","1","4","16"],1));
quizQuestions[Challenge.types.TRAP].push(new quizQuestion("Which is next in the sequence 2,5,11?",["23","25","33","22"],0));

quizQuestions[Challenge.types.MONSTER] = [];
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("Which polygon has 7 sides?",["Hexagon","Heptagon","Decagon","Pentagon"],1));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("How many sides does a Dodecagon have?",["12","10","7","9"],0));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("Which is bigger?",["7 + 8","10 - 7","19 - 2","5 + 9"],2));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("Which is smaller?",["9 * 3","2 * 11","5 * 3","4 * 6"],2));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("Which one is not equal to the square root of 49?",["2 * 3 + 1","17 - 4 * 2","10 - 6 + 3","4 + 3 * 1"],1));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("What is the prime number after 13?",["15","19","21","17"],3));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("Which two primes are consecutive?",["15 19","13 19","23 29","27 29"],2));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("What is 4 to the power of 0?",["0","1","4","16"],1));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("Which is next in the sequence 2,5,11?",["23","25","33","22"],0));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("(19 + x) / 5 = 6\nx = ?",["14","20","11","6"],2));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("4 * (x - 8) = 36\nx = ?",["17","19","20","16"],0));
quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("(x + 7) - (4 * x) = 1\nx = ?",["4","2","3","5"],1));

//quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("Which polygon is similar to a square of side 6?",["A quadrilateral with the same perimeter.","A quadrilateral with the same area.","A quadrilateral with the same angles.","A square with the side 35,5 cm."],3));
//quizQuestions[Challenge.types.MONSTER].push(new quizQuestion("Which two triangles(A and B) are not similar?",["A has two angles equal to two angles of B.", "A and B are two isosceles triangles.", "A and B have the three sides alike.", "A and B share one angle and part of its two adjacent sides."],1));

quizQuestions[Challenge.types.BOSS] = [];
quizQuestions[Challenge.types.BOSS].push(new quizQuestion("Which is bigger?",["7 + 8","10 - 7","19 - 2","5 + 9"],2));
quizQuestions[Challenge.types.BOSS].push(new quizQuestion("Which is smaller?",["9 * 3","2 * 11","5 * 3","4 * 6"],3));
quizQuestions[Challenge.types.BOSS].push(new quizQuestion("Which one is not equal to the square root of 49?",["2 * 3 + 1","17 - 4 * 2","10 - 6 + 3","4 + 3 * 1"],1));

quizQuestions[Challenge.types.ITEM] = [];
quizQuestions[Challenge.types.ITEM].push(new quizQuestion("(19 + x) / 5 = 6",["14","20","11","6"],2));
quizQuestions[Challenge.types.ITEM].push(new quizQuestion("4 * (x - 8) = 36",["17","19","20","16"],0));
quizQuestions[Challenge.types.ITEM].push(new quizQuestion("(x + 7) - (4 * x) = 1",["4","2","3","5"],1));
quizQuestions[Challenge.types.ITEM].push(new quizQuestion("x * 4 + 3 = 19",["3","4","6","5"],1));
