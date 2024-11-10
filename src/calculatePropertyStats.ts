import { IProbabilityMetric } from "../../../interfaces/IProbabilityMetric";
import { IPropertyStats } from "../../../interfaces/IPropertyStats";

export const calculatePropertyStats = <T>(
  objects: T[],
  metrics: IProbabilityMetric<T>[]
): IPropertyStats<T> => {
  const propertyStats: IPropertyStats<T> = {
    totalCount: 0,
    uniqueValues: new Map<keyof T, Set<T[keyof T]>>(),
    valueCounts: new Map<keyof T, Map<T[keyof T], number>>(),
    averagesAndStdDev: new Map<keyof T, {
      average: number;
      standardDeviation: number;
    }>(),
  };

  for (const obj of objects) {
    propertyStats.totalCount++;

    for (const metric of metrics) {
      const propertyKey = metric.property;
      const propertyValue = obj[propertyKey];

      if (!propertyStats.uniqueValues.has(propertyKey)) {
        propertyStats.uniqueValues.set(propertyKey, new Set<T[keyof T]>());
        propertyStats.valueCounts.set(
          propertyKey,
          new Map<T[keyof T], number>()
        );
      }

      propertyStats.uniqueValues.get(propertyKey)!.add(propertyValue);

      if (!propertyStats.valueCounts.get(propertyKey)!.has(propertyValue)) {
        propertyStats.valueCounts.get(propertyKey)!.set(propertyValue, 0);
      }

      propertyStats.valueCounts
        .get(propertyKey)!
        .set(
          propertyValue,
          propertyStats.valueCounts.get(propertyKey)!.get(propertyValue)! + 1
        );

      if (!propertyStats.averagesAndStdDev.has(propertyKey)) {
        propertyStats.averagesAndStdDev.set(propertyKey, {
          average: 0,
          standardDeviation: 0,
        });
      }

      // check if T[keyof T] is a number
      if (typeof propertyValue === "number") {
        propertyStats.averagesAndStdDev.set(
          propertyKey,
          calculatePropertyAverageAndStandardDeviation(objects, propertyKey)
        );
      }
    }
  }

  // for (const [propertyKey, valueCount] of propertyStats.valueCounts) {
  //   for (const [value, count] of valueCount) {
  //     propertyStats.valueCounts
  //       .get(propertyKey)!
  //       .set(value, (count / propertyStats.totalCount) * 100);
  //   }
  // }

  return propertyStats;
}

const calculatePropertyAverageAndStandardDeviation = <T>(
  objects: T[],
  property: keyof T
): {
  average: number;
  standardDeviation: number;
} => {
  let sum = 0;

  for (const obj of objects) {
    sum += obj[property] as number;
  }

  const average = sum / objects.length;

  let sumOfSquaredDifferences = 0;

  for (const obj of objects) {
    sumOfSquaredDifferences += Math.pow(obj[property] as number - average, 2);
  }

  const standardDeviation = Math.sqrt(
    sumOfSquaredDifferences / objects.length
  );

  return {
    average,
    standardDeviation,
  };
}
