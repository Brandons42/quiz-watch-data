const { height, margin, width } = require('./measurements');

module.exports = (id, xAxis, xLabel, yAxis, yLabel, heat) => {
	const svg = d3
		.select('#' + id)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	svg
		.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('height', height)
		.attr('width', width)
		.style('fill', '#EBEBEB');

	if (heat) {
		const fills = ['B7F0AD', 'D2FF96', 'E8D33F', 'D17B0F', '832232'];

		const sectionLabels = [
			'Very strong',
			'Strong',
			'Moderate',
			'Weak',
			'Very weak'
		];

		for (let q = 0; q < 5; q++) {
			svg
				.append('rect')
				.attr('x', 0)
				.attr('y', (height * q) / 5)
				.attr('height', height / 5)
				.attr('width', width)
				.style('fill', `#${fills[q]}44`);

			svg
				.append('text')
				.attr('class', 'section-label')
				.attr('dominant-baseline', 'middle')
				.attr('text-anchor', 'middle')
				.attr('transform', 'rotate(90)')
				.attr('x', (height * (q * 2 + 1)) / 10)
				.attr('y', -width - 25)
				.text(sectionLabels[q]);

			svg
				.append('text')
				.attr('class', 'section-label')
				.attr('dominant-baseline', 'middle')
				.attr('text-anchor', 'middle')
				.attr('transform', 'rotate(90)')
				.attr('x', (height * (q * 2 + 1)) / 10)
				.attr('y', -width - 10)
				.text('correlation');
		}
	}

	svg
		.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(xAxis).tickSize(-height).ticks(9))
		.select('.domain')
		.remove();

	svg
		.append('text')
		.attr('class', 'label')
		.attr('dominant-baseline', 'middle')
		.attr('text-anchor', 'middle')
		.attr('x', width / 2)
		.attr('y', height + margin.top + 20)
		.text(xLabel);

	svg
		.append('g')
		.call(d3.axisLeft(yAxis).tickSize(-width).ticks(6))
		.select('.domain')
		.remove();

	svg
		.append('text')
		.attr('class', 'label')
		.attr('dominant-baseline', 'middle')
		.attr('text-anchor', 'middle')
		.attr('transform', 'rotate(-90)')
		.attr('x', -margin.top - height / 2)
		.attr('y', -margin.left + 25)
		.text(yLabel);

	return svg;
};
