//State and Global Variables

var questions = [{
		questionTitle: 'Who is the lead Singer of Maroon 5?',
		answer1: 'Jared Leto',
		answer2: 'Adam Levine',
		answer3: 'Charlie Puth ',
		answer4: 'Wiz Khalifa',
		correctAnswer: 'Adam Levine'
},{
		questionTitle: 'Which band sang the hits "Brokenhearted"?',
		answer1: 'Arctic Monkeys',
		answer2: 'Oasis',
		answer3: 'Foo Fighters',
		answer4: 'Karmin',
		correctAnswer: 'Karmin'
},{
		questionTitle: 'Who duets with Meghan Trainor on the song "Marvin Gaye"?',
		answer1: 'Charlie Puth',
		answer2: 'John Legend',
		answer3: 'Blake Shelton',
		answer4: 'Justin Bieber',
		correctAnswer: 'Charlie Puth'
},{
		questionTitle: 'Who sang the hits "Love Yourself"?', 
		answer1: 'Ed Sheeran',
		answer2: 'Charlie Puth',
		answer3: 'Justin Bieber',
		answer4: 'Usher',
		correctAnswer: 'Justin Bieber'
},{
		questionTitle: 'Who sang the hits "Superstition"?', 
		answer1: 'Maurice White',
		answer2: 'Steven Tyler',
		answer3: 'Jon Bon Jovi',
		answer4: 'Stevie Wonder',
		correctAnswer: 'Stevie Wonder'
}];

var index = 0;

var correctCount = 0;

var questionTemplate  ='<div class="questionBox">'+
						'<p class="js-questionTitle"></p>'+

						'<form id="question" class="js-question">'+
      						'<input type="radio" name="answer" class="js-answer1" value="" required> <label id="js-label1"></label>'+
      						'<input type="radio" name="answer" class="js-answer2" value="" required> <label id="js-label2"></label>'+
      						'<input type="radio" name="answer" class="js-answer3" value="" required> <label id="js-label3"></label>'+
      						'<input type="radio" name="answer" class="js-answer4" value="" required> <label id="js-label4"></label>'+
      						'<input id="answerValue" type="submit" name="answer">'+
    					'</form>'+
    				'</div>';

var questionNumberTemplate 	='<li class="questionNumber js-questionNumber"></li>';

var correctStatusTemplate	='<li class="correctStatus js-correctStatus"></li>';

var finalPageTemplate  = '<h1>Congratulations you get <span class="js-numberOfCorrectsFinalPage"></span> out of 5 questions right!</h1>';			


//State Alterations
function addIndex(index){
	index = index + 1;
}

//render to DOM

function renderQuestion(questions, questionTemplate, index){
	var questionElement = $(questionTemplate);
	questionElement.find('.js-questionTitle').text(questions[index].questionTitle);
	questionElement.find('#js-label1').text(questions[index].answer1);
	questionElement.find('#js-label2').text(questions[index].answer2);
	questionElement.find('#js-label3').text(questions[index].answer3);
	questionElement.find('#js-label4').text(questions[index].answer4);
	questionElement.find('.js-answer1').val(questions[index].answer1);
	questionElement.find('.js-answer2').val(questions[index].answer2);
	questionElement.find('.js-answer3').val(questions[index].answer3);
	questionElement.find('.js-answer4').val(questions[index].answer4);
	$('.questionContainer').html(questionElement); 
}

function renderQuestionNumber(questionNumberTemplate, index){
	var questionNumber = index + 1;
	var questionNumberElement = $(questionNumberTemplate);
	questionNumberElement.text('Question number ' + questionNumber);
	$('.js-displayStatus').html(questionNumberElement);
}

function renderCorrectStatus(question, correctStatusTemplate, index, answerValue, correctCount){
	var numberAttempted = index;
	var correctStatusElement = $(correctStatusTemplate);
	if(correctCount <= 1){
		correctStatusElement.text( correctCount + ' correct out of ' + numberAttempted +' attempted!');
	}
	else{
		correctStatusElement.text( correctCount + ' corrects out of ' + numberAttempted +' attempted!');
	}
	$('.js-displayStatus').append(correctStatusElement);
}

function renderFinalPage(finalPageTemplate, correctCount){
	var finalPageElement = $(finalPageTemplate);
	$('.js-displayStatus').html(' ');
	finalPageElement.find('.js-numberOfCorrectsFinalPage').text(correctCount);
	$('.questionContainer').html(finalPageElement);
}

//event listeners

function registerFormHandler(corectCount){
	$('#question').submit(function(event){
		event.preventDefault();
		var answerValue = $("#question input[type='radio']:checked").val();
		if(answerValue === questions[index].correctAnswer){
			correctCount = correctCount + 1;
			alert('Congratulations your answer is correct!') 
		}
		else{
			alert('Your answer is Incorrect. The correct answer should be ' + questions[index].correctAnswer)
		}
		index = index + 1;
		if(index < 5){
			render();
		}
		else{
			renderFinalPage(finalPageTemplate, correctCount);
		}	
	})
}

function render(){
	var answerValue = $("#question input[type='radio']:checked").val();
	renderQuestion(questions, questionTemplate, index);
	renderQuestionNumber(questionNumberTemplate, index);
	renderCorrectStatus(question, questionNumberTemplate, index, answerValue, correctCount);
	registerFormHandler();
}

//Event Listeners
$(document).ready(function(){
	render();
})




