const getR = days => {
	const xSum = days.reduce((acc, cur) => acc + cur.tournaments, 0);

	const x2Sum = days.reduce(
		(acc, cur) => acc + cur.tournaments * cur.tournaments,
		0
	);

	const xySum = days.reduce(
		(acc, cur) => acc + cur.tournaments * cur.questions,
		0
	);

	const ySum = days.reduce((acc, cur) => acc + cur.questions, 0);

	const y2Sum = days.reduce(
		(acc, cur) => acc + cur.questions * cur.questions,
		0
	);

	const r =
		(days.length * xySum - xSum * ySum) /
		Math.sqrt(
			(days.length * x2Sum - xSum * xSum) * (days.length * y2Sum - ySum * ySum)
		);

	return r;
};

module.exports = getR;
