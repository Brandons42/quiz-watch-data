const createGraph = require('./createGraph');
const symbols = require('./symbols');
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
		'832232',
		'D17B0F',
		'E8D33F',
		'EDFF7A',
		'D2FF96',
		'B7F0AD',
		'C3DFE0',
		'26377c',
		'0B0033',
		'370031'
	];

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
		.style('fill', d => '#' + months[d.month]);
};

module.exports = drawScatter;