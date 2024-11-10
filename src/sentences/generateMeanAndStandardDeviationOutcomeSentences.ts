import { calculateMeanAndStandardDeviation } from "../calculateMeanAndStandardDeviation";
import { calculatePropertyStats } from "../calculatePropertyStats";
import { IProbabilityMetric } from "../interfaces/IProbabilityMetric";

export const generateMeanAndStandardDeviationOutcomeSentences = <T>(
  objects: T[],
  metrics: IProbabilityMetric<T>[],
  objectsNamePlural: string,
  outcomeUnit: string
): string[] => {
  if (metrics.length !== 2) {
    return [];
  }
  const sentences: string[] = [];
  const metric1 = metrics[0];
  const metric1PropertyStats = calculatePropertyStats(objects, [metric1]);
  const metric2 = metrics[1];

  // for now, assume that the first metric is the given, and the second metric is the one we want to calculate the mean and standard deviation of
  // loop over all possible values in metric1
  for (const n1PropertyKey of metric1PropertyStats.uniqueValues.get(
    metric1.property
  )!) {
    // filter objects to only those that have the given value for metric1
    const objectsSubset = objects.filter(
      (obj) => obj[metric1.property] === n1PropertyKey
    );
    const { mean, standardDeviation } = calculateMeanAndStandardDeviation(
      objectsSubset,
      metric2
    );

    sentences.push(
      `Given ${metric1.label} is ${n1PropertyKey} (${objectsSubset.length} of ${objects.length} ${objectsNamePlural}), the average ${metric2.label} is ${mean.toFixed(3)}${outcomeUnit}, with a standard deviation of ${standardDeviation.toFixed(3)}${outcomeUnit} (${(mean - standardDeviation).toFixed(3)}${outcomeUnit} - ${(mean + standardDeviation).toFixed(3)}${outcomeUnit}).`
    );
  }

  return sentences;
};
