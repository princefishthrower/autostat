export interface IStatistics {
    count: number;
    mean: number;
    median: number;
    mode: number;
    range: number;
    minimum: number;
    maximum: number;
    variance: number;
    stdDeviation: number;
    iqr: number;
    coefficientOfVariation: number;
    skewness: number;
    kurtosis: number;
}

export const calculateStatistics = (data: number[]): IStatistics => {
    const sortedData = data.slice().sort((a, b) => a - b);
    const count = data.length;
    const mean = data.reduce((sum, value) => sum + value, 0) / count;
    
    let median;
    if (count % 2 === 0) {
        const midIndex = count / 2;
        median = (sortedData[midIndex - 1] + sortedData[midIndex]) / 2;
    } else {
        median = sortedData[Math.floor(count / 2)];
    }
    
    const modeMap = new Map<number, number>();
    data.forEach(value => {
        modeMap.set(value, (modeMap.get(value) || 0) + 1);
    });
    const mode = Array.from(modeMap.entries()).reduce((prev, curr) => (curr[1] > prev[1] ? curr : prev), [0, 0])[0];

    const range = sortedData[count - 1] - sortedData[0];
    const minimum = sortedData[0];
    const maximum = sortedData[count - 1];

    const sumSquaredDiffs = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0);
    const variance = sumSquaredDiffs / count;
    const stdDeviation = Math.sqrt(variance);

    const quartiles = {
        q1: sortedData[Math.floor(count * 0.25)],
        q2: sortedData[Math.floor(count * 0.5)],
        q3: sortedData[Math.floor(count * 0.75)],
    };
    const iqr = quartiles.q3 - quartiles.q1;

    const coefficientOfVariation = (stdDeviation / mean) * 100;

    const skewness = data.reduce((sum, value) => sum + Math.pow(value - mean, 3), 0) / (count * Math.pow(stdDeviation, 3));

    const kurtosis = data.reduce((sum, value) => sum + Math.pow(value - mean, 4), 0) / (count * Math.pow(stdDeviation, 4)) - 3;

    return {
        count,
        mean,
        median,
        mode,
        range,
        minimum,
        maximum,
        variance,
        stdDeviation,
        iqr,
        coefficientOfVariation,
        skewness,
        kurtosis,
    };
}