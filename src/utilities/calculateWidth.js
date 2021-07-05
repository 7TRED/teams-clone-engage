export const calcCardWidth = (containerWidth, containerHeight, num_of_participants) => {
	let margin = 5;
	let w = containerWidth / num_of_participants + 2 * margin;
	let max_width = 0;
	for (; w < containerWidth; w++) {
		let aux_w = isValidWidth(w, num_of_participants, containerWidth, containerHeight, margin);
		if (aux_w) {
			max_width = w;
		} else {
			break;
		}
	}

	return { width: max_width, margin };
};

const isValidWidth = (w, num_of_participants, containerWidth, containerHeight, margin) => {
	let num_in_rows = Math.floor(containerWidth / w);
	let num_of_rows = Math.ceil(num_of_participants / num_in_rows);
	let total_height = (w * (9 / 16) + 2 * margin) * num_of_rows;
	if (total_height > containerHeight) return false;
	else return true;
};
