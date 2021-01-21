export const shuffleArray: (array: any[]) => any[] = (array) => [...array].sort(() => Math.random() - 0.5);
