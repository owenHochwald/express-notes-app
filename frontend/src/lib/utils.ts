interface FormatDateOptions {
    month: "short";
    day: "numeric";
    year: "numeric";
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    } as FormatDateOptions);
}