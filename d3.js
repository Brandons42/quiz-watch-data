const drawR = require('./lib/drawR');
const drawScatter = require('./lib/drawScatter');
const getDays = require('./lib/getDays');
const monthColors = require('./lib/monthColors');
//const getR = require('./lib/getR');

//const output = document.getElementById('output');

const divs = [...document.getElementById('colors').children].map(
	div => div.children[0]
);

const months = [];

for (let q = 0; q < divs.length; q++) {
	months.push(q);

	divs[q].style.backgroundColor = monthColors[q];
}

let initialized = false;

const slider = document.getElementById('slider');

const draw = redrawLine => {
	if (initialized) {
		d3.selectAll('.dots').remove();

		if (redrawLine) {
			d3.select('#r-line').remove();
		}
	} else {
		initialized = true;
	}

	const limit = parseInt(slider.value);

	drawR(limit, months);

	const days = getDays(limit, months);

	drawScatter(days);
};

draw();

const setColor = q => {
	if (months.includes(q)) {
		divs[q].style.backgroundColor = monthColors[q];
	} else {
		divs[q].style.backgroundColor = 'transparent';
	}
};

for (let q = 0; q < divs.length; q++) {
	divs[q].onclick = () => {
		if (months.includes(q)) {
			months.splice(months.indexOf(q), 1);
		} else {
			months.push(q);
		}

		setColor(q);

		draw(true);
	};

	divs[q].onmouseleave = () => setColor(q);

	divs[q].onmouseover = () =>
		(divs[q].style.backgroundColor = monthColors[q] + '44');
}

//output.innerHTML = `Days: 7, R: ${getR(initialDays)}`;

slider.oninput = draw;

//output.innerHTML = `Days: ${this.value}, R: ${getR(days)}`;
