export const eur = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
});

export const gbp = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
});

export function jackpotStatus(winners: number) {
    if (winners === 0) return "Rolls over to the next draw";
    if (winners === 1) return "Won by 1 ticket";
    return `Shared by ${winners} tickets`;
}

export function formattedDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function formattedLongDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
