export interface IPropertyStats<T> {
  totalCount: number;
  uniqueValues: Map<keyof T, Set<T[keyof T]>>;
  valueCounts: Map<keyof T, Map<T[keyof T], number>>;
  averagesAndStdDev: Map<keyof T, {
    average: number;
    standardDeviation: number;
  }>;
}
