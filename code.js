const gameboard = (() => {
	let boardStatus = ['', '', '', '', '', '', '', '', ''];
	const boardCreator = () => {
		const boardContainer = document.querySelector('#boardContainer');
		for (let i = 0; i < 9; i++) {
			const cells = document.createElement('div');
			cells.className = 'cells';
			cells.setAttribute('data-n', i);
			cells.addEventListener('click', () => game.gamePlay(i));
			boardContainer.appendChild(cells);
		}
	};
	const reset = () => {
		boardStatus = ['', '', '', '', '', '', '', '', ''];
		document
			.querySelectorAll('.cells')
			.forEach((elm) => (elm.textContent = ''));
	};
	const circle = (n) => {
		if (boardStatus[n] != 'o' && boardStatus[n] != 'x') {
			boardStatus[n] = 'o';
			document.querySelector(`.cells[data-n='${n}']`).textContent = 'o';
		}
	};
	const ex = (n) => {
		if (boardStatus[n] != 'o' && boardStatus[n] != 'x') {
			boardStatus[n] = 'x';
			document.querySelector(`.cells[data-n='${n}']`).textContent = 'x';
		}
	};
	const threeEquals = (c1, c2, c3) => {
		return (
			boardStatus[c1] == boardStatus[c2] &&
			boardStatus[c2] == boardStatus[c3] &&
			boardStatus[c1] != ''
		);
	};
	const boardCheck = () => {
		return (
			threeEquals(0, 1, 2) ||
			threeEquals(3, 4, 5) ||
			threeEquals(6, 7, 8) ||
			threeEquals(0, 3, 6) ||
			threeEquals(1, 4, 7) ||
			threeEquals(2, 5, 8) ||
			threeEquals(0, 4, 8) ||
			threeEquals(2, 4, 6)
		);
	};
	const tie = () => {
		return boardStatus.every((element) => element !== '') && !boardCheck();
	};
	return {
		threeEquals,
		boardStatus,
		boardCreator,
		reset,
		circle,
		ex,
		boardCheck,
		tie,
	};
})();

const player = (name) => {
	return {
		name,
	};
};

const game = (() => {
	let turn = 0;
	let player1 = player('Player 1');
	let player2 = player('Player 2');
	const player1Tag = document.querySelector('.player1Tag');
	const player2Tag = document.querySelector('.player2Tag');
	let namePlayer2 = (jugador, tag) => {
		const person = prompt('What is your name?');
		jugador.name = person;
		tag.textContent = person;
	};
	player1Tag.addEventListener('click', () => namePlayer2(player1, player1Tag));
	player2Tag.addEventListener('click', () => namePlayer2(player2, player2Tag));

	// let namePlayer = () => {
	// 	player1Tag.addEventListener('click', () => {
	// 		const person = prompt('What is your name?');
	// 		if (person === '') {
	// 			player1Tag.textContent = 'Player 1';
	// 		} else {
	// 			player1 = player(person);
	// 			player1Tag.textContent = person;
	// 		}
	// 	});
	// 	player2Tag.addEventListener('click', () => {
	// 		const person2 = prompt('What is your name?');
	// 		if (person2 === '') {
	// 			player2Tag.textContent = 'Player 2';
	// 		} else {
	// 			player2 = player(person2);
	// 			player2Tag.textContent = person2;
	// 		}
	// 	});
	// };
	const gamePlay = (n) => {
		if (turn == 0) {
			gameboard.circle(n);
			if (gameboard.boardCheck()) {
				gameEnd(player1.name);
			} else if (gameboard.tie()) {
				tiedGame();
			}
			turn = 1;
		} else {
			gameboard.ex(n);
			if (gameboard.boardCheck()) {
				gameEnd(player2.name);
			} else if (gameboard.tie()) {
				tiedGame();
			}
			turn = 0;
		}
		game.turnGlow();
	};
	const tiedGame = () => {
		const tieDialog = document.querySelector('.tieDialog');
		const tie = document.querySelector('.tie');
		const tieReset = document.querySelector('.tieReset');
		tie.textContent = "It's a tie";
		tieDialog.showModal();
		tieReset.addEventListener('click', () => {
			tieDialog.close();
			gameboard.reset();
		});
	};
	const gameEnd = (player) => {
		const endDialog = document.querySelector('.endDialog');
		const resetBtn = document.querySelector('.resetBtn');
		const winner = document.querySelector('.winner');
		winner.textContent = `${player} Wins!`;
		endDialog.showModal();
		resetBtn.addEventListener('click', () => {
			gameboard.reset();
			endDialog.close();
			turn = 0;
			game.turnGlow();
		});
	};
	const turnGlow = () => {
		if (turn === 0) {
			player1Tag.style.border = '3px solid #6a89cc';
			player2Tag.style.border = 'none';
		} else {
			player2Tag.style.border = '3px solid #6a89cc';
			player1Tag.style.border = 'none';
		}
	};
	return {
		namePlayer2,
		gamePlay,
		tiedGame,
		gameEnd,
		turnGlow,
	};
})();
game.turnGlow();
gameboard.boardCreator();
