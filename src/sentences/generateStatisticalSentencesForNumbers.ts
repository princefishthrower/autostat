import { isNumbers } from "../type-guards/isNumbers";
import { calculateStatistics } from "../calculateStatistics";
import { IProbabilityMetric } from "../interfaces/IProbabilityMetric";

export const generateStatisticalSentencesForNumbers = <T>(
  objects: T[],
  metrics: IProbabilityMetric<T>[]
): string[] => {
  const sentences: string[] = [];
  for (const metric of metrics) {
    sentences.push(...generateStatisticalSentencesForNumber(objects, metric));
  }
  return sentences;
};

const generateStatisticalSentencesForNumber = <T>(
  objects: T[],
  metric: IProbabilityMetric<T>
): string[] => {
  const propertyKey = metric.property;
  const label = metric.label;

  // get all values for the property
  const propertyValues = objects.map((obj) => obj[propertyKey]);

  // If there are no numeric values, return an appropriate sentence
  if (!isNumbers(propertyValues)) {
    return [`No numeric data available for ${label}.`];
  }

  const stats = calculateStatistics(propertyValues);

  const sentences: string[] = [
    `Statistics for ${label}:`,
    `The mean (average) of ${label} is ${stats.mean}`,
    `The standard deviation: ${stats.stdDeviation}`,
    `The mode of ${label} is ${stats.mode}`,
    `The median of ${label} is ${stats.median}`,
    `The range of ${label} is ${stats.range}`,
    `The max Value of ${label} is ${stats.minimum}`,
    `The min Value of ${label} is ${stats.maximum}`,
    `The skewness of ${label} is ${stats.skewness}`,
    `The kurtosis of ${label} is ${stats.kurtosis}`,
  ];

  return sentences;
};
