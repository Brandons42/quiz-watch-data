const createGraph = require('./createGraph');
const { height, width } = require('./measurements');

const x = d3.scaleLinear().domain([0, 140]).range([0, width]);

const y = d3.scaleLinear().domain([0, 7000]).range([height, 0]);

const svg = createGraph(
	'scatter',
	x,
	'Tournaments within next x days (indicated on slider)',
	y,
	'Questions answered within the day'
);

const drawScatter = days => {
	const months = [
		'000',
		'111',
		'222',
		'333',
		'444',
		'555',
		'777',
		'888',
		'999',
		'aaa',
		'bbb'
	];

	const symbol = d3.symbol().size(20);

	const symbols = [
		d3.symbolCircle,
		d3.symbolSquare,
		d3.symbolDiamond,
		d3.symbolTriangle,
		d3.symbolCross,
		d3.symbolWye,
		d3.symbolStar
	];

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
		.style('fill', d => '#' + months[d.month]);
};

module.exports = drawScatter;
