const createGraph = require('./createGraph');
const getDays = require('./getDays');
const getR = require('./getR');
const { height, width } = require('./measurements');

const x = d3.scaleLinear().domain([0, 28]).range([0, width]);

const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);

const svg = createGraph('r', x, 'x Days', y, 'R');

const drawR = limit => {
	const rs = [];

	for (let q = 0; q < 29; q++) {
		rs.push({
			x: q,
			y: getR(getDays(q))
		});
	}

	console.log(rs);

	svg
		.append('path')
		.datum(rs)
		.attr('fill', 'none')
		.attr('stroke', 'steelblue')
		.attr('stroke-width', 1.5)
		.attr(
			'd',
			d3
				.line()
				.x(d => x(d.x))
				.y(d => y(d.y))
		);

	svg
		.append('g')
		.attr('class', 'dots')
		.datum(rs[limit])
		.append('circle')
		.attr('cx', d => x(d.x))
		.attr('cy', d => y(d.y))
		.attr('r', 20);
};

module.exports = drawR;
