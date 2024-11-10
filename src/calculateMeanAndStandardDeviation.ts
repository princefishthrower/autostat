import { IProbabilityMetric } from "./interfaces/IProbabilityMetric";

export const calculateMeanAndStandardDeviation = <T>(
  objects: T[],
  metric: IProbabilityMetric<T>
): {
  mean: number;
  standardDeviation: number;
} => {
  let sum = 0;

  if (metric.propertyValueExtractor) {
    for (const obj of objects) {
      sum += metric.propertyValueExtractor(obj);
    }
  } else {
    for (const obj of objects) {
      sum += obj[metric.property] as number;
    }
  }

  const mean = sum / objects.length;

  let sumOfSquaredDifferences = 0;

  if (metric.propertyValueExtractor) {
    for (const obj of objects) {
      sumOfSquaredDifferences += Math.pow(
        metric.propertyValueExtractor(obj) - mean,
        2
      );
    }
  } else {
    for (const obj of objects) {
      sumOfSquaredDifferences += Math.pow(
        (obj[metric.property] as number) - mean,
        2
      );
    }
  }

  const standardDeviation = Math.sqrt(sumOfSquaredDifferences / objects.length);

  return {
    mean,
    standardDeviation,
  };
};
