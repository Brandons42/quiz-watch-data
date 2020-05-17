const symbols = require('./symbols');

const svgs = [...document.getElementById('symbols').children].map(
	div => div.children[0]
);

for (let q = 0; q < 7; q++) {
	d3.select(svgs[q])
		.append('svg')
		.attr('overflow', 'visible')
		.attr('x', '50%')
		.attr('y', '50%')
		.append('path')
		.attr('d', d3.symbol().type(symbols[q]).size(1000));
}
