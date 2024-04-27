export const getDayOfTheWeek = (date) => {
    const dateObj = new Date(date);

    const dayOfWeekNumber = dateObj.getDay();

    // Array to map the day of the week number to its corresponding name
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    return daysOfWeek[dayOfWeekNumber];
};

export const dateFormatter = (date) => {
    const dateObject = new Date(date);

    const getDaySuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    const day = dateObject.getDate();
    const month = dateObject.toLocaleString("default", { month: "long" });
    const year = dateObject.getFullYear();

    return `${day}${getDaySuffix(day)} ${month} ${year}`;
};
