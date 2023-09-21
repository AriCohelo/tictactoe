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
	let namePlayer = () => {
		const player1Tag = document.querySelector('.player1Tag');
		player1Tag.addEventListener('click', () => {
			const person1 = prompt('What is your name?');
			player1 = player(person1);
			player1Tag.textContent = person1;
		});
		const player2Tag = document.querySelector('.player2Tag');
		player2Tag.addEventListener('click', () => {
			const person2 = prompt('What is your name?');
			player2 = player(person2);
			player2Tag.textContent = person2;
		});
	};
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
		});
	};
	return {
		namePlayer,
		gamePlay,
		tiedGame,
		gameEnd,
	};
})();
game.namePlayer();
gameboard.boardCreator();
