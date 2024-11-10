export const isStrings = (array: any): array is string[] => {
    return typeof array[0] === 'string'
}