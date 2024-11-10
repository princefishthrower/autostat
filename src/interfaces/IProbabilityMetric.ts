export interface IProbabilityMetric<T> {
    label: string;
    property: keyof T;
    propertyValueExtractor?: (obj: T) => number;
  }
  