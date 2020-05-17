const { height, margin, width } = require('./measurements');

module.exports = (id, xAxis, xLabel, yAxis, yLabel) => {
	const svg = d3
		.select('#' + id)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	svg
		.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(xAxis))
		.style('fill', '#678');

	svg
		.append('text')
		.attr('text-anchor', 'end')
		.attr('x', width / 2 + margin.left)
		.attr('y', height + margin.top + 20)
		.text(xLabel);

	svg.append('g').call(d3.axisLeft(yAxis)).style('fill', '#678');

	svg
		.append('text')
		.attr('text-anchor', 'end')
		.attr('transform', 'rotate(-90)')
		.attr('y', -margin.left + 20)
		.attr('x', -margin.top - height / 2 + 20)
		.text(yLabel);

	return svg;
};
