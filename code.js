let nNavegador = true;
try {
	document.querySelector('*');
} catch {
	nNavegador = false;
}

const gameboard = (() => {
	let boardStatus = ['', '', '', '', '', '', '', '', ''];
	const reset = () => {
		boardStatus = ['', '', '', '', '', '', '', '', ''];
		if (nNavegador) {
			document
				.querySelectorAll('cells')
				.forEach((elm) => (elm.textContent = ''));
		}
	};
	const circle = (n) => {
		boardStatus[n] = 'o';
		if (nNavegador) {
			document.querySelector(`.cells[n='${n}']`).textContent = 'o';
		} else {
			render();
		}
	};
	const ex = (n) => {
		boardStatus[n] = 'x';
		if (nNavegador) {
			document.querySelector(`.cells[n='${n}']`).textContent = 'x';
		} else {
			render();
		}
	};
	const render = () => {
		console.log(`${boardStatus[0]} ${boardStatus[1]} ${boardStatus[2]}`);
		console.log(`${boardStatus[3]} ${boardStatus[4]} ${boardStatus[5]}`);
		console.log(`${boardStatus[6]} ${boardStatus[7]} ${boardStatus[8]}`);
	};
	return {
		reset,
		circle,
		ex,
		boardStatus,
	};
})();

const player = (name) => {
	return {
		name,
	};
};

const game = (() => {
	let turn = 0;
	let player1 = player('Ari');
	let player2 = player('Other');
	const gamePlay = (n) => {
		if (turn == 0) {
			gameboard.circle(n);
			turn = 1;
		} else {
			gameboard.ex(n);
			turn = 0;
		}
	};

	return {
		gamePlay,
	};
})();

function boardCreator() {
	const boardContainer = document.querySelector('#boardContainer');

	for (let i = 0; i < 9; i++) {
		const cells = document.createElement('div');
		cells.className = 'cells';
		cells.setAttribute('n', i);
		cells.addEventListener('click', () => game.gamePlay(i));
		boardContainer.appendChild(cells);
	}
}

// boardCreator();
