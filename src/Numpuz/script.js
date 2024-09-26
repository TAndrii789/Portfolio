let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
let testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];

const wrapper = document.querySelector(".wrapper");
const items = document.getElementsByClassName("grid-item");

const minutesDiv = document.querySelector(".minutes");
const secondsDiv = document.querySelector(".seconds");
const hundredthsSecondsDiv = document.querySelector(".hundredthsSeconds");
const timerSvg = document.querySelector(".svg");
const colons = document.getElementsByClassName("colon");
const btnStart = document.getElementById("btnStart");
const btnReset = document.getElementById("btnReset");
let interval;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let dropFrom;
let dropTo;

const shuffle = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

function fillNumbers(arr) {
	for (let i = 0; i < arr.length; i++) {
		let div = document.createElement("div");
		if (i < 4) {
			div.setAttribute("alt", `0 ${i}`);
		} else if (i > 3 && i < 8) {
			div.setAttribute("alt", `1 ${i - 4}`);
		} else if (i > 7 && i < 12) {
			div.setAttribute("alt", `2 ${i - 8}`);
		} else if (i > 11 && i < 16) {
			div.setAttribute("alt", `3 ${i - 12}`);
		}
		if (arr[i] !== "") {
			div.innerText = arr[i];
			div.setAttribute("id", `${i}`);
			div.setAttribute("class", "grid-item drag");
			div.setAttribute("draggable", "true");
		} else {
			div.setAttribute("id", `${i}`);
			div.setAttribute("class", "grid-item drop-zone");
		}
		wrapper.appendChild(div);
	}
}
shuffle(numArray);
fillNumbers(numArray);

const startTimer = () => {
	milliseconds++;
	if (milliseconds <= 99) {
		hundredthsSecondsDiv.innerHTML = "0" + milliseconds;
	}
	if (milliseconds == 100) {
		hundredthsSecondsDiv.innerHTML = "00";
	}

	if (milliseconds > 9) {
		hundredthsSecondsDiv.innerHTML = milliseconds;
	}

	if (milliseconds > 99) {
		seconds++;
		secondsDiv.innerHTML = "0" + seconds;
		milliseconds = 0;
		hundredthsSecondsDiv.innerHTML = "0" + milliseconds;
	}
	if (seconds > 9) {
		secondsDiv.innerHTML = seconds;
	}
	if (seconds > 59) {
		minutes++;
		minutesDiv.innerHTML = "0" + minutes;

		seconds = 0;
		secondsDiv.innerHTML = "0" + seconds;
	}
	if (minutes > 9) {
		minutesDiv.innerHTML = minutes;
	}
};

btnStart.addEventListener("click", () => {
	timerSvg.classList.add("animationSvg");
	clearInterval(interval);
	interval = setInterval(startTimer, 10);
});

btnReset.addEventListener("click", () => {
	location.reload();
});

let dropZone = document.querySelector(".drop-zone");
let altDropZone = dropZone.attributes.alt.nodeValue.split(" ");
let rowDropZone = Number(altDropZone[0]);
let columnDropZone = Number(altDropZone[1]);

let timer = 0;

wrapper.addEventListener("mousedown", (e) => {
	dropFrom = e.target;
	e.target.addEventListener("dragstart", () => {});
	if (timer === 0) {
		timerSvg.classList.add("animationSvg");
		clearInterval(interval);
		interval = setInterval(startTimer, 10);
		timer++;
	}
});

wrapper.addEventListener("dragover", (e) => {
	e.preventDefault();
});

wrapper.addEventListener("drop", (e) => {
	e.preventDefault();
	dropTo = e.target;
});

function changePosition(arr, from, to) {
	arr.splice(to, 0, arr.splice(from, 1)[0]);
	return arr;
}

function moveElementVertical(array, fromIndex, toIndex) {
	let temp = array[fromIndex];
	array[fromIndex] = array[toIndex];
	array[toIndex] = temp;
}

wrapper.addEventListener("dragend", (e) => {
	let altDropToArr = dropTo.attributes.alt.nodeValue.split(" ");
	let rowTo = Number(altDropToArr[0]);
	let columnTo = Number(altDropToArr[1]);

	let altDropFromArr = dropFrom.attributes.alt.nodeValue.split(" ");
	let row = Number(altDropFromArr[0]);
	let column = Number(altDropFromArr[1]);

	let dropId;
	let oldId;
	let newId;
	let ii;
	let i = rowDropZone;
	let num = 0;
	let arrNew = [];

	function itemDown() {
		ii = i + 1;
		dropId = Number(dropZone.id);
		newId = dropId + 4;
		moveElementVertical(numArray, dropZone.id, dropId + 4);
		arrNew = numArray.slice();
		numArray = arrNew;
		wrapper.innerHTML = "";
		fillNumbers(numArray);
		dropZone.id = newId;
		if (num === 0) {
			oldId = dropId;
			num++;
		}
		if (ii >= row) {
			items[oldId].id = oldId;
			num = 0;
		}
		rowDropZone += 1;
	}

	function itemUp() {
		dropId = Number(dropZone.id);
		newId = dropId - 4;
		ii = i - 1;
		moveElementVertical(numArray, dropZone.id, dropId - 4);
		arrNew = numArray.slice();
		numArray = arrNew;
		wrapper.innerHTML = "";
		fillNumbers(numArray);
		dropZone.id = newId;
		if (num === 0) {
			oldId = dropId;
			num++;
		}
		if (ii <= row) {
			items[oldId].id = oldId;
			num = 0;
		}
		rowDropZone -= 1;
	}

	function updateAlt() {
		dropZone.setAttribute("alt", `${row} ${column}`);
		rowDropZone = row;
		columnDropZone = column;
	}

	if (dropFrom !== dropTo) {
		if (columnDropZone === column && dropTo !== wrapper) {
			if (dropTo.innerText !== "" && columnTo === column) {
				if (rowDropZone < 2) {
					for (let i = rowDropZone; i < row; i++) {
						itemDown();
					}
				} else {
					for (let i = rowDropZone; i > row; i--) {
						itemUp();
					}
				}
			} else if (dropTo.innerText === "" && columnTo === column) {
				if (row > rowDropZone) {
					itemDown();
				} else if (row < rowDropZone) {
					itemUp();
				}
			}
		} else if (rowDropZone === row && dropTo !== wrapper) {
			if (dropTo.innerText === "") {
				changePosition(numArray, dropFrom.id, dropZone.id);
				newId = dropFrom.id;
				dropZone.id = newId;
			} else {
				if (columnDropZone < 2) {
					if (columnTo < column) {
						changePosition(numArray, dropZone.id, dropFrom.id);
						newId = dropFrom.id;
						dropZone.id = newId;
					}
				} else {
					if (columnTo > column) {
						changePosition(numArray, dropZone.id, dropFrom.id);
						newId = dropFrom.id;
						dropZone.id = newId;
					}
				}
			}
			wrapper.innerHTML = "";
			fillNumbers(numArray);
			updateAlt();
		}
	}
	let checkArr = 0;
	for (j = 0; j < items.length; j++)
		if (testArr[j] == items[j].innerText) {
			checkArr++;
		}
	if (checkArr === 16) {
		clearInterval(interval);
		timerSvg.classList.remove("animationSvg");
		function openPopup() {
			popup.classList.add("open-popup");
		}
		function closePopup() {
			popup.classList.remove("open-popup");
		}
		const okBtn = document.querySelector(".ok-btn");

		window.addEventListener("resize", resizeCanvas);
		window.addEventListener("DOMContentLoaded", onLoad);
		onLoad();

		openPopup();
		okBtn.addEventListener("click", (e) => {
			closePopup();
			location.reload();
		});
	}
});

//// pyro

const probability = 0.04;
let canvas,
	ctx,
	w,
	h,
	particles = [],
	xPoint,
	yPoint,
	displayText = false;

function onLoad() {
	canvas = document.getElementById("canvas");
	canvas.style.display = "block";
	ctx = canvas.getContext("2d");
	resizeCanvas();
	window.requestAnimationFrame(updateWorld);
	// window.setTimeout(() => {
	// 	displayText = true;
	// }, 3000);
}

function resizeCanvas() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
}

function updateWorld() {
	update();
	paint();
	window.requestAnimationFrame(updateWorld);
}

function update() {
	if (particles.length < 500 && Math.random() < probability) {
		createFirework();
	}
	particles = particles.filter((particle) => particle.move());
}

function paint() {
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgba(0,0,0,0.07)";
	ctx.fillRect(0, 0, w, h);
	ctx.globalCompositeOperation = "lighter";
	particles.forEach((particle) => particle.draw(ctx));

	if (displayText) {
		ctx.fillStyle = getRandomColor();
		ctx.font = "italic bold 50px 'Dancing Script', cursive";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
	}
}

function createFirework() {
	xPoint = Math.random() * (w - 200) + 100;
	yPoint = Math.random() * (h - 200) + 100;
	const nFire = Math.random() * 50 + 100;
	const c = getRandomFireworkColor();

	for (let i = 0; i < nFire; i++) {
		const particle = new Particle(c);
		particles.push(particle);
	}
}

function Particle(color) {
	this.w = this.h = Math.random() * 4 + 1;
	this.x = xPoint - this.w / 2;
	this.y = yPoint - this.h / 2;
	this.vx = (Math.random() - 0.5) * 10;
	this.vy = (Math.random() - 0.5) * 10;
	this.alpha = Math.random() * 0.5 + 0.5;
	this.color = color;
}

Particle.prototype = {
	gravity: 0.05,
	move: function () {
		this.x += this.vx;
		this.vy += this.gravity;
		this.y += this.vy;
		this.alpha -= 0.01;
		return !(
			this.x <= -this.w ||
			this.x >= w ||
			this.y >= h ||
			this.alpha <= 0
		);
	},
	draw: function (c) {
		c.save();
		c.beginPath();
		c.translate(this.x + this.w / 2, this.y + this.h / 2);
		c.arc(0, 0, this.w, 0, Math.PI * 2);
		c.fillStyle = this.color;
		c.globalAlpha = this.alpha;
		c.closePath();
		c.fill();
		c.restore();
	},
};

function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function getRandomFireworkColor() {
	const colors = ["#FF5252", "#FFD740", "#64B5F6", "#69F0AE", "#FF4081"];
	return colors[Math.floor(Math.random() * colors.length)];
}
