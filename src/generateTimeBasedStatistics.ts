// import { IProbabilityMetric } from "../../../interfaces/IProbabilityMetric";
// import { IPropertyStats } from "../../../interfaces/IPropertyStats";
// import { calculatePropertyStats } from "../../../probs";
// import { isNumbers } from "../../type-guards/isNumbers";

// type TimeInterval =
//   | "day"
//   | "dayOfWeek"
//   | "month"
//   | "monthOfYear"
//   | "quarter"
//   | "quarterOfYear"
//   | "year";

// function getDateBucket(
//   date: number | string | Date,
//   interval: TimeInterval
// ): string {
//   const d = new Date(date);
//   switch (interval) {
//     case "day":
//       return d.toISOString().substr(0, 10);
//     case "dayOfWeek":
//       return d.toLocaleDateString(undefined, { weekday: "long" });
//     case "month":
//       return d.toISOString().substr(0, 7);
//     case "monthOfYear":
//       return d.toLocaleDateString(undefined, { month: "long" });
//     case "quarter":
//       const quarter = Math.floor((d.getMonth() + 3) / 3);
//       return `Q${quarter}`;
//     case "quarterOfYear":
//       return `${d.toLocaleDateString(undefined, {
//         year: "numeric",
//       })} Q${Math.floor((d.getMonth() + 3) / 3)}`;
//     case "year":
//       return d.toLocaleDateString(undefined, { year: "numeric" });
//     default:
//       throw new Error("Invalid time interval");
//   }
// }

// export const generateTimeBasedStatistics = <T>(
//   objects: T[],
//   metric: IProbabilityMetric<T>,
//   interval: TimeInterval,
//   timeKey: keyof T
// ): string[] => {
//   const label = metric.label;
//   const propertyKey = metric.property;
//   const timeStats: IPropertyStats<T> = calculatePropertyStats(objects, [
//     { ...metric, property: timeKey },
//   ]);

//   const timeValues = Array.from(timeStats.uniqueValues.get(timeKey)!);
//   const valueCounts = timeStats.valueCounts.get(timeKey)!;

//   const sentences: string[] = [];

//   timeValues.forEach((timeValue) => {
//     const bucket = getDateBucket(timeValue, interval);
//     const filteredObjects = objects.filter(
//       (obj) => getDateBucket(obj[timeKey], interval) === bucket
//     );

//     const propertyStats: IPropertyStats<T> = calculatePropertyStats(
//       filteredObjects,
//       [{ ...metric, property: propertyKey }]
//     );

//     const propertyValues = Array.from(
//       propertyStats.uniqueValues.get(propertyKey)!
//     );

//     if (!isNumbers(propertyValues)) {
//       sentences.push(`No numeric data available for ${label} on ${bucket}.`);
//       return;
//     }

//     const numericValuesCount = propertyValues.map(
//       (value) => propertyStats.valueCounts.get(propertyKey)!.get(value)!
//     );
//     const sum = numericValuesCount.reduce((acc, count) => acc + count, 0);
//     const mean = (sum / numericValuesCount.length).toFixed(2);

//     // ... calculate other statistics as you did in the previous function

//     sentences.push(`Statistics for ${label} on ${bucket}:`);
//     sentences.push(`The mean of ${label} is ${mean}`);
//     // ... push other statistics sentences
//   });

//   return sentences;
// };
