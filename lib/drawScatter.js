const createGraph = require('./createGraph');
const monthColors = require('./monthColors');
const symbols = require('./symbols');
const { height, width } = require('./measurements');

const x = d3.scaleLinear().domain([0, 140]).range([0, width]);

const y = d3.scaleLinear().domain([0, 7000]).range([height, 0]);

const svg = createGraph(
	'scatter',
	'Figure 1: Quiz Watch Usage and Quiz Bowl Tournament Frequency',
	x,
	'Quiz Bowl Tournaments Within Next n Days (as per slider)',
	y,
	'Quiz Watch Questions Answered on Day'
);

const daysOfWeek = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

const semiTransparent = '#ffffff88';
const white = 'white';

svg
	.append('rect')
	.attr('class', 'key-top')
	.attr('height', 30)
	.attr('width', 140)
	.attr('x', width - 150)
	.attr('y', 10)
	.style('fill', semiTransparent);

svg
	.append('text')
	.attr('class', 'key-top')
	.attr('dominant-baseline', 'middle')
	.attr('text-anchor', 'middle')
	.attr('x', width - 85)
	.attr('y', 25)
	.style('font-weight', 500)
	.style('pointer-events', 'none')
	.style('text-decoration', 'underline')
	.text('Key');

svg
	.append('rect')
	.attr('class', 'key')
	.attr('height', 250)
	.attr('width', 140)
	.attr('x', width - 150)
	.attr('y', 40)
	.style('display', 'none')
	.style('fill', white);

for (let q = 0; q < 7; q++) {
	svg
		.append('path')
		.attr('class', 'key')
		.attr('d', d3.symbol().type(symbols[q]).size(300))
		.attr('transform', `translate(${width - 30},${60 + q * 35})`)
		.style('display', 'none');

	svg
		.append('text')
		.attr('class', 'key')
		.attr('dominant-baseline', 'middle')
		.attr('text-anchor', 'end')
		.attr('x', width - 50)
		.attr('y', 60 + q * 35)
		.style('display', 'none')
		.style('font-weight', 300)
		.text(daysOfWeek[q]);
}

const keyElements = document.getElementsByClassName('key');
const keyTops = document.getElementsByClassName('key-top');

let extended = false;

const toggleDisplay = () => {
	keyElements[0].style.fill = white;

	for (let q = 0; q < keyElements.length; q++) {
		keyElements[q].style.display = extended ? 'none' : 'initial';
	}

	extended = !extended;

	if (!extended && !over) {
		keyTops[0].style.fill = semiTransparent;
	}
};

let over = false;

const toggleHighlight = () => {
	over = !over;

	if (!extended) {
		if (over) {
			keyTops[0].style.fill = white;
		} else {
			keyElements[0].style.fill = semiTransparent;
			keyTops[0].style.fill = semiTransparent;
		}
	}
};

keyTops[0].onclick = toggleDisplay;
keyTops[0].onmouseleave = toggleHighlight;
keyTops[0].onmouseenter = toggleHighlight;
keyTops[1].onclick = toggleDisplay;

for (let q = 0; q < keyElements.length; q++) {
	keyElements[q].onclick = toggleDisplay;
}

const drawScatter = days => {
	const symbol = d3.symbol().size(80);

	svg
		.append('g')
		.attr('class', 'dots')
		.selectAll('dot')
		.data(days)
		.enter()
		//.append('circle')
		.append('path')
		//.attr('cx', d => x(d.tournaments))
		//.attr('cy', d => y(d.questions))
		.attr(
			'd',
			symbol.type(d => symbols[d.day])
		)
		//.attr('r', 1.5)
		.attr('transform', d => `translate(${x(d.tournaments)},${y(d.questions)})`)
		.style('fill', d => monthColors[d.month]);
};

module.exports = drawScatter;
