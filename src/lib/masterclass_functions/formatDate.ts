export const formatDate_ = (date: Date | string): string => {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    return d.toLocaleDateString('en-US', options);
};

export const timestamp = (): string => {
    return new Date().toISOString();
};
