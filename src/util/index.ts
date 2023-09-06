export const convertFormatedNumberToNumber = (value: number | string) => {
	if (typeof value == "number") {
		return value;
	}
	return parseInt(
		value
			.split("")
			.filter((v) => v != ",")
			.join("")
			.toString()
	);
};
