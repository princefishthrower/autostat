export const isNumbers = (array: any): array is number[] => {
    return typeof array[0] === 'number'
}