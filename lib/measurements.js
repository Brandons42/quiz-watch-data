const margin = { top: 50, right: 45, bottom: 50, left: 75 };

module.exports.margin = margin;

const docWidth =
	document.body.clientWidth / (document.body.clientWidth > 1100 ? 2 : 1);

module.exports.height = (docWidth * 4) / 5 - margin.top - margin.bottom;

module.exports.width = docWidth - margin.left - margin.right;
