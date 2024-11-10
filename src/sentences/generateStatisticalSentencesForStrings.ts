import { IProbabilityMetric } from "../interfaces/IProbabilityMetric";
import { isStrings } from "../type-guards/isStrings";

export const generateStatisticalSentencesForStrings = <T>(
  objects: T[],
  metrics: IProbabilityMetric<T>[],
): string[] => {
  const sentences: string[] = [];
  for (const metric of metrics) {
    const sentences = generateStatisticalSentencesForString(objects, metric);
    sentences.push(...sentences);
  }
  return sentences;
}

 export const generateStatisticalSentencesForString = <T>(
  objects: T[],
  metric: IProbabilityMetric<T>
): string[] => { 
  const propertyKey = metric.property;
  const label = metric.label;

  // get all values for the property
  const propertyValues = objects.map((obj) => obj[propertyKey]);

  // generate the stringEnum array from the values themselves - just the unique values sorted alphabetically
  const stringEnum = Array.from(new Set(propertyValues)).sort();

  // If there are no numeric values, return an appropriate sentence
  if (!isStrings(propertyValues)) {
    return [`No string data available for ${label}.`];
  }

  if (!isStrings(stringEnum)) {
    return [`No string data available for ${label}.`];
  }

  const stats = calculateStringStatistics(propertyValues, stringEnum);

  const sentences: string[] = [
    `Statistics for ${label}:`,
    `The mean (average) of ${label} is ${stats.mean}`,
    `The standard deviation: ${stats.stdDev}`,
    `The mode of ${label} is ${stats.mode}`,
    `The median of ${label} is ${stats.median}`,
    `The range of ${label} is ${stats.range}`,
    `The max value of ${label} is ${stats.maxValue}`,
    `The min value of ${label} is ${stats.minValue}`,
  ];

  return sentences;
};



const calculateStringStatistics = (
  strings: string[],
  stringEnum: string[]
): {
  mean: string;
  stdDev: number;
  mode: string | null;
  median: string;
  minValue: string;
  maxValue: string;
  range: number;
} => {
  const n = strings.length;

  // Convert string array to corresponding number array using the provided string enum
  const valuesInNumberSpace = strings.map((str) => stringEnum.indexOf(str) + 1);

  // Calculate mean
  const mean = Math.round(
    valuesInNumberSpace.reduce((sum, num) => sum + num, 0) / n
  );
  const meanString = stringEnum[mean - 1];

  // Calculate standard deviation
  const squaredDifferences = valuesInNumberSpace.map((num) =>
    Math.pow(num - mean, 2)
  );
  const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / n;
  const stdDev = Math.sqrt(variance);

  // Calculate mode
  const numCounts = new Map<number, number>();
  valuesInNumberSpace.forEach((num) => {
    numCounts.set(num, (numCounts.get(num) || 0) + 1);
  });
  let mode: number | null = null;
  let maxCount = 0;
  numCounts.forEach((count, num) => {
    if (count > maxCount) {
      maxCount = count;
      mode = num;
    }
  });
  let modeString = ""
  if (mode !== null) {
  modeString = stringEnum[mode - 1];
  }

  // Calculate median
  const sortedNumbers = valuesInNumberSpace.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(n / 2);
  const medianValue =
    n % 2 === 0
      ? (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2
      : sortedNumbers[middleIndex];
  const medianString = stringEnum[medianValue - 1]; // Convert back to string representation

  // Calculate min and max values
  const minValue = Math.min(...valuesInNumberSpace);
  const minString = stringEnum[minValue - 1];
  const maxValue = Math.max(...valuesInNumberSpace);
  const maxString = stringEnum[maxValue - 1];

  // Calculate range
  const range = maxValue - minValue;

  return {
    mean: meanString,
    stdDev,
    mode: modeString,
    median: medianString,
    minValue: minString,
    maxValue: maxString,
    range,
  };
};
