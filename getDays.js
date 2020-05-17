const data = require('./data.json');

const getDays = limit => {
	const days = [];

	let dayOfWeek = 1;

	for (let q = 0; q < data.tournaments.length - 1; q++) {
		for (let r = 0; r < data.tournaments[q].length; r++) {
			let tournaments = 0;
			for (let s = 0; s < limit + 1; s++) {
				if (data.tournaments[q][r + s]) {
					tournaments += data.tournaments[q][r + s];
				} else if (data.tournaments[q + 1]) {
					for (let t = 0; t < limit + 1 - s; t++) {
						tournaments += data.tournaments[q + 1][t];
					}
					break;
				}
			}

			days.push({
				day: dayOfWeek++ % 7,
				month: q,
				questions: data.requests[q][r] * 5,
				tournaments
			});
		}
	}

	return days;
};

module.exports = getDays;
