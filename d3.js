const drawR = require('./drawR');
const drawScatter = require('./drawScatter');
const getDays = require('./getDays');
const getR = require('./getR');

const output = document.getElementById('output');

drawR(7);

const initialDays = getDays(7);

drawScatter(initialDays);

output.innerHTML = `Days: 7, R: ${getR(initialDays)}`;

const slider = document.getElementById('myRange');

slider.oninput = function () {
	d3.selectAll('.dots').remove();

	const limit = parseInt(this.value);

	drawR(limit);

	const days = getDays(limit);

	drawScatter(days);

	output.innerHTML = `Days: ${this.value}, R: ${getR(days)}`;
};
