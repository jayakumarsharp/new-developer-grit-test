"use strict"
/*

	Intro screen 
		Start -> Question
	Question screen
		validate input, store answer
		-> next question
		Last question -> Results
	Results
		show grit test score: (add all answers and compute mean)
		Try again -> Intro

*/

$(document).ready(function (){

	$('#startButton').click(function () {
		$('section.intro').hide();
		$('section.results').hide();
		$('section.questions').show();
		firstQuestion();
	});

	$('ul.answers').on('click', 'input', function () {
		recordAnswer(this.value);
		if (!nextQuestion()) {
			setUpResultScreen();
			$('section.intro').hide();
			$('section.questions').hide();
			$('section.results').show();
		}
	});

	$('#againButton').click(function () {
		$('section.results').hide();
		$('section.questions').hide();
		$('section.intro').show();
	});

});

var answers;
var questionCounter;

function firstQuestion() {
	answers = [];
	questionCounter = 0;
	setUpQuestionScreen();
}

function nextQuestion() {
// Returns false when there are no more questions.
	++questionCounter;
	if (questionCounter >= quizData.length) {
		return false;
	}
	setUpQuestionScreen();
	return true;
}

function setUpQuestionScreen() {
	var q = quizData[questionCounter];
	$('#prompt').text(q.prompt);
	$('span.count').text(questionCounter + 1);
	$('span.totalCount').text(quizData.length);

	$('ul.answers').empty();

	for (var i=0; i<q.answers.length; ++i) {
		$('ul.answers').append(
			'<li>' +
				'<input type="radio" class="option" name="option" value="' + i + '">' +
				q.answers[i].text +
			'</li>'
		);
	}
}

function recordAnswer(answer) {
// Just stuff the answer into quizData with corresponding question.
	quizData[questionCounter].answer = answer;
}

function setUpResultScreen() {
	var total = 0;
	$('section.results ul').empty();
	quizData.forEach(function (data) {
		$('section.results ul').append(
			'<li>' + 
				'<p>' + data.prompt + '</p>' +
				'<p>' + data.answers[data.answer].text + '</p>' +
			'</li>'
		);
		total += data.answers[data.answer].score;
	});
	$('#result').text((total / quizData.length).toFixed(2));
}