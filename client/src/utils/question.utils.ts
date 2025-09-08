export const getOption = (index: number): string => {
    const options = ["A", "B", "C", "D", "E", "F", "G", "P"];
    if (index >= 0 && index < options.length) return options[index];
    throw new Error("Không có Option");
};

