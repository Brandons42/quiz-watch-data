const createGraph = require('./createGraph');
const getDays = require('./getDays');
const getR = require('./getR');
const { height, width } = require('./measurements');

const x = d3.scaleLinear().domain([0, 28]).range([0, width]);

const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);

const svg = createGraph(
	'r',
	x,
	'n Days',
	y,
	'Correlational Coefficient (R)',
	true
);

const drawR = (limit, months) => {
	const rs = [];

	for (let q = 0; q < 29; q++) {
		rs.push({
			x: q,
			y: getR(getDays(q, months))
		});
	}

	svg
		.append('path')
		.datum(rs)
		.attr('id', 'r-line')
		.attr(
			'd',
			d3
				.line()
				.x(d => x(d.x))
				.y(d => y(d.y > 0 ? d.y : 0))
		)
		.attr('fill', 'none')
		.attr('stroke', '#26377c')
		.attr('stroke-width', 5);

	svg
		.append('circle')
		.attr('class', 'dots')
		.attr('cx', x(rs[limit].x))
		.attr('cy', y(rs[limit].y > 0 ? rs[limit].y : 0))
		.attr('fill', '#26377c')
		.attr('r', 12);
};

module.exports = drawR;
