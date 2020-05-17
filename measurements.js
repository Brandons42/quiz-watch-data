const margin = { top: 10, right: 30, bottom: 30, left: 60 };

module.exports.margin = margin;

const docWidth =
	document.body.clientWidth / (document.body.clientWidth > 700 ? 2 : 1);

module.exports.height = docWidth - margin.top - margin.bottom;

module.exports.width = docWidth - margin.left - margin.right;
