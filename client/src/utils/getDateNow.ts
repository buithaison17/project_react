export const getDateNow = (): string => {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const hour = date.getHours();
	const minutes = date.getMinutes();
	return `${year}-${month}-${day} ${hour}:${minutes}`;
};
