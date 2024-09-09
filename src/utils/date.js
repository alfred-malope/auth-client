export const formatDate = (dateString) => {
	const date = new Date(dateString);
	if (isNaN(date.getTime())) {
		return "Invalid Date";
	}

	return date.toLocaleString("en-ZA", {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,  
		timeZone: "Africa/Johannesburg"  
	});
};

export default formatDate;
