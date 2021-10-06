import React, { useEffect, useState } from 'react';
import { questions } from './data/Questions.js';
import { IconContext } from "react-icons";
import { FaTwitter, FaDiscord } from 'react-icons/fa';

export default function App() {
	//Questions and house reveal setters
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showQuiz, setShowQuiz] = useState(false);
	const [showHouse, setShowHouse] = useState(false);

	// Total score per house setters
	const [totalGryffindor, setGryffindor] = useState(0);
	const [totalSlytherin, setSlytherin] = useState(0);
	const [totalRavenclaw, setRavenclaw] = useState(0);
	const [totalHufflepuff, setHufflepuff] = useState(0);

	//Final result setter
	const [house, setHouse] = useState("Muggle");

	//Sorting function
	const answerHandler = (gryffindor, slytherin, ravenclaw, hufflepuff) => {
		setGryffindor(totalGryffindor + gryffindor);
		setSlytherin(totalSlytherin + slytherin);
		setRavenclaw(totalRavenclaw + ravenclaw);
		setHufflepuff(totalHufflepuff + hufflepuff);

		switch (Math.max(totalGryffindor, totalSlytherin, totalRavenclaw, totalHufflepuff)) {
			case totalGryffindor: setHouse("Gryffindor")
				break;
			case totalSlytherin: setHouse("Slytherin")
				break;
			case totalRavenclaw: setHouse("Ravenclaw")
				break;
			case totalHufflepuff: setHouse("Hufflepuff")
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

	const [banner, setBanner] = useState('')
	const changeBanner = () => {
		if (house === 'Gryffindor' && showHouse===true) {
			setBanner(require("./assets/banners/Gryffindor.jpg"));}
		if (house === 'Slytherin' && showHouse===true) {
			setBanner(require("./assets/banners/Slytherin.jpg"));}
		if (house === 'Ravenclaw' && showHouse===true) {
			setBanner(require("./assets/banners/Ravenclaw.jpg"));}
		if (house === 'Hufflepuff' && showHouse===true) {
			setBanner(require("./assets/banners/Hufflepuff.jpg"));}
	};
	// Always check which house has most points in order to reveal the respective banner
	useEffect(() => {
		changeBanner()
	});

	return (
		<div>
		<div className='main-title'>The Sorting Hat</div>
		<div className='app' style={{borderRadius:'7px', backgroundPosition: '50%', backgroundBlendMode:'normal', backgroundImage: `url(${banner})`}}>
			{showQuiz ? (
			<div>
			{showHouse ? (
				<div className='score-section'>
					You belong in
					<br/>
					<p className='house'>{house}</p>
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
						{questions[currentQuestion].options.map((option) => (
							<button onClick={() => {answerHandler(option.gryffindor, option.slytherin, option.ravenclaw, option.hufflepuff);}}>{option.optionText}</button>
						))}
					</div>
				</div>

				</>
			)} </div>
		) : (
		<>
				<div className='intro-part'>
					<div className='intro-text'>
						Welcome to the Grand Hall! To find out which house you belong in, you'll be asked a series of questions about various topics, and you must answer as truthfully as you can.
						By the end, the hat will decide and tell you where you belong. <br/>Good luck!
					</div>
					<div className='intro-exp'>
						This is more of a dev project than an actual quiz, it's made for fun, but feel free to drop by and say hi via the links below :) Enjoy!
					</div>
					<button className='start-button button-loader' onClick={() => setShowQuiz(true)}>Start</button>
				</div>
		</>
		)}
		</div>
			<div>
				<IconContext.Provider value={{ className: "twitter" }}>
					<div>
					<a href="https://twitter.com/qarnax"><FaTwitter /></a>
					</div>
				</IconContext.Provider>
				<IconContext.Provider value={{ className: "discord" }}>
					<div>
					<a href="https://discord.gg/VhPZV3csKn"><FaDiscord /></a>
					</div>
				</IconContext.Provider>
			</div>
		</div>
	);
}
