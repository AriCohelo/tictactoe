let player1Active = false;
let player2Active = false;

const game = (() => {
	const playerMove = function (event) {
		let clickedCell = event.target;
		if (player1Active === true) {
			clickedCell.innerHTML = 'o';
			player1Active = false;
			player2Active = true;
			boardStatus();
		} else if (player2Active === true) {
			clickedCell.innerHTML = 'x';
			player2Active = false;
			player1Active = true;
			boardStatus();
		}
	};
	const boardStatus = function () {
		cells = [];
		for (let i = 1; i <= 9; i++) {
			cells[i] = document.querySelector(`.cell${i}`);
		}
		const winningCombos = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
			[1, 5, 9],
			[3, 5, 7],
		];
		for (const combo of winningCombos) {
			const [a, b, c] = combo;
			if (
				cells[a].innerHTML === 'x' &&
				cells[b].innerHTML === 'x' &&
				cells[c].innerHTML === 'x'
			) {
				alert('Player 2 Wins!');
				return;
			}
		}
		for (const combo of winningCombos) {
			const [a, b, c] = combo;
			if (
				cells[a].innerHTML === 'o' &&
				cells[b].innerHTML === 'o' &&
				cells[c].innerHTML === 'o'
			) {
				alert('Player 1 Wins!');
				return;
			}
		}
	};
	return {
		playerMove,
	};
})();

let player2 = document.querySelector('.player2');
let player1 = document.querySelector('.player1');

const playerCreator = (() => {
	const createPlayer = (playerElement) => {
		const playerName = prompt('What is your name?');
		playerElement.innerHTML = playerName;
		gameboard.boardLoader();
	};
	const player1Creator = () => {
		createPlayer(player1);
	};
	const player2Creator = () => {
		createPlayer(player2);
	};
	return {
		player1Creator,
		player2Creator,
	};
})();

player1.addEventListener('click', playerCreator.player1Creator);
player2.addEventListener('click', playerCreator.player2Creator);

const gameboard = (() => {
	const boardCreator = function () {
		const boardContainer = document.getElementById('boardContainer');
		for (let i = 1; i < 10; i++) {
			const cell = document.createElement('div');
			boardContainer
				.appendChild(cell)
				.setAttribute('class', `boardCell cell${[i]}`);
			cell.addEventListener('click', game.playerMove);
		}
	};
	const boardLoader = () => {
		if (player1.innerHTML !== '' && player2.innerHTML !== '') {
			gameboard.boardCreator();
			player1Active = true;
		}
	};
	return {
		boardCreator,
		boardLoader,
	};
})();
