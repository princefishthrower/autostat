import { IProbabilityMetric } from "./interfaces/IProbabilityMetric"
import { generateMeanAndStandardDeviationOutcomeSentences } from "./sentences/generateMeanAndStandardDeviationOutcomeSentences"
import { generateProbabilitySentences } from "./sentences/generateProbabilitySentences"
import { generateStatisticalSentencesForNumbers } from "./sentences/generateStatisticalSentencesForNumbers"
import { generateStatisticalSentencesForStrings } from "./sentences/generateStatisticalSentencesForStrings"

export const autoStat = <T extends object>(
    objects: T[],
    metrics?: IProbabilityMetric<T>[],
    objectsNamePlural?: string,
    outcomeUnit?: string
): Array<string> => {
    // for each of the parameters, if they are not provided, set them to sensible defaults
    if (!metrics) {
        metrics = buildProbabilityMetricsFromObjects(objects)
    }
    if (!objectsNamePlural) {
        objectsNamePlural = "objects"
    }
    if (!outcomeUnit) {
        outcomeUnit = ""
    }

    // run all the sentence generators and return the results!
    return [
        ...generateMeanAndStandardDeviationOutcomeSentences(objects, metrics, objectsNamePlural, outcomeUnit),
        ...generateProbabilitySentences(objects, metrics),
        ...generateStatisticalSentencesForNumbers(objects, metrics),
        ...generateStatisticalSentencesForStrings(objects, metrics)
    ]
}

export const buildProbabilityMetricsFromObjects = <T extends object>(objects: T[]): IProbabilityMetric<T>[] => {
    const keys = Object.keys(objects[0]) as Array<keyof T>
    return keys.map(key => {
        return {
            label: key as string,
            property: key
        }
    })
}