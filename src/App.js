import React, { useEffect, useState } from 'react';
import { questions } from './data/Questions.js';

export default function App() {
	//Questions and house reveal setters
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showTest, setShowTest] = useState(false);
	const [showHouse, setShowHouse] = useState(false);
	
	// Total score per house setters
	const [totalRed, setRed] = useState(0);
	const [totalGreen, setGreen] = useState(0);
	const [totalBlue, setBlue] = useState(0);

	//Final result setter
	const [personality, setPersonality] = useState("kharya");

	//Sorting function
	const handleAnswerOptionClick = (red, green, blue) => {
		setRed(totalRed + red);
		setGreen(totalGreen + green);
		setBlue(totalBlue + blue);

		switch (Math.max(totalRed, totalGreen, totalBlue)) {
			case totalRed: setPersonality("Red")
				break;
			case totalGreen: setPersonality("Green")
				break;
			case totalBlue: setPersonality("Blue")
				break;
			default:
				break; 
		};

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowHouse(true);
		}
	};
	
	const [backColor, setBackColor] = useState('')
	const changeColor = () => {
		if (personality === 'Red' && showHouse===true) {
		setBackColor(require("./assets/banners/Gryffindor.jpg"));}
	};
	
	useEffect(() => {
		changeColor()
	});

	return (
		<div>
		<div className='main-title'>The Sorting Hat</div>
		<div className='app' style={{borderRadius:'7px', backgroundPosition: '50%', backgroundBlendMode:'normal', backgroundImage: `url(${backColor})`}}>
			{showTest ? (
			<div>
			{showHouse ? (
				<div className='score-section'>
					You're a 
					<br/>
					<p className='personality'>Griffondor</p> 
				</div>
				
			) : (
				<>
				<div className='part-two'>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
					{changeColor()}
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => {handleAnswerOptionClick(answerOption.red, answerOption.green, answerOption.blue);}}>{answerOption.answerText}</button>
						))}
					</div>
				</div>
					
				</>
			)} </div>
		) : (
		<>
				<div className='intro-part'>
					<div className='intro-text'>
						Welcome to the Grand Hall!
						You'll be asked a series of questions about various topics, and you must answer as truthfully as you can. By the end, the hat shall decide where you belong and tell you which house is yours. <br/>Good luck!	
					</div>
					<button className='start-button button-loader' onClick={() => setShowTest(true)}>Start</button>
				</div>
		</>
		)}
		</div>
		</div>
	);
}
