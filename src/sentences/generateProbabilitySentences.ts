

import { calculatePropertyStats } from "../calculatePropertyStats";
import { IProbabilityMetric } from "../interfaces/IProbabilityMetric";
import { IPropertyStats } from "../interfaces/IPropertyStats";


// Example usage
// interface ExampleObject {
//   n1: string;
//   n2: string;
// }
// const metrics: IProbabilityMetric<ExampleObject>[] = [
//   { label: "Property 1", property: "n1" },
//   { label: "Property 2", property: "n2" },
// ];

// const objects: Array<ExampleObject> = [
//   { n1: "A", n2: "X" },
//   { n1: "A", n2: "Y" },
//   { n1: "B", n2: "X" },
//   { n1: "B", n2: "Z" },
// ];

// const sentences = generateProbabilitySentences(objects, metrics);
// console.log(sentences);

export const generateProbabilitySentences = <T>(
    objects: T[],
    metrics: IProbabilityMetric<T>[]
  ): string[] => {
    const propertyKeys = metrics.map((metric) => metric.property);
    const propertyStats: IPropertyStats<T> = calculatePropertyStats(
      objects,
      metrics
    );
  
    const sentences: string[] = [];
  
    for (const n1PropertyKey of propertyKeys) {
      for (const n1Value of propertyStats.uniqueValues.get(n1PropertyKey)!) {
        for (const n2PropertyKey of propertyKeys) {
          for (const n2Value of propertyStats.uniqueValues.get(n2PropertyKey)!) {
            const n1ValueCount = propertyStats.valueCounts
              .get(n1PropertyKey)!
              .get(n1Value)!;
  
            const intersectionCount = objects.filter(
              (obj) =>
                obj[n1PropertyKey] === n1Value && obj[n2PropertyKey] === n2Value
            ).length;
  
            const probability =
              n1ValueCount > 0
                ? ((intersectionCount / n1ValueCount) * 100).toFixed(2)
                : 0;
  
            const label1 = metrics.find(
              (metric) => metric.property === n1PropertyKey
            )?.label;
            const label2 = metrics.find(
              (metric) => metric.property === n2PropertyKey
            )?.label;
  
            const propIndex1 = propertyKeys.indexOf(n1PropertyKey);
            const propIndex2 = propertyKeys.indexOf(n2PropertyKey);
  
            if (label1 !== label2 && propIndex1 < propIndex2) {
              sentences.push(
                `Given ${label1} is ${n1Value}, the probability of ${label2} ${n2Value} is ${probability}% (${intersectionCount} of ${n1ValueCount}).`
              );
            }
          }
        }
      }
    }
  
    return sentences;
  };