import { autoStat } from "./autostat";

const weatherData = [
    { condition: "sunny", tempC: 28, windDir: "N", precip: 0, isDaytime: true },
    { condition: "partly cloudy", tempC: 25, windDir: "NE", precip: 0, isDaytime: true },
    { condition: "cloudy", tempC: 22, windDir: "E", precip: 0.5, isDaytime: true },
    { condition: "rainy", tempC: 18, windDir: "SE", precip: 15.2, isDaytime: true },
    { condition: "thunderstorm", tempC: 20, windDir: "S", precip: 45.7, isDaytime: true },
    { condition: "cloudy", tempC: 19, windDir: "SW", precip: 0.2, isDaytime: true },
    { condition: "sunny", tempC: 27, windDir: "W", precip: 0, isDaytime: true },
    { condition: "partly cloudy", tempC: 24, windDir: "NW", precip: 0, isDaytime: true },
    { condition: "clear", tempC: 15, windDir: "N", precip: 0, isDaytime: false },
    { condition: "cloudy", tempC: 14, windDir: "NE", precip: 0, isDaytime: false },
    { condition: "rainy", tempC: 12, windDir: "E", precip: 8.4, isDaytime: false },
    { condition: "thunderstorm", tempC: 16, windDir: "SE", precip: 32.1, isDaytime: false },
    { condition: "clear", tempC: 11, windDir: "S", precip: 0, isDaytime: false },
    { condition: "foggy", tempC: 10, windDir: "SW", precip: 0.1, isDaytime: false },
    { condition: "partly cloudy", tempC: 13, windDir: "W", precip: 0, isDaytime: false },
    { condition: "rainy", tempC: 11, windDir: "NW", precip: 12.8, isDaytime: false },
    { condition: "sunny", tempC: 29, windDir: "N", precip: 0, isDaytime: true },
    { condition: "foggy", tempC: 17, windDir: "E", precip: 0.3, isDaytime: true },
    { condition: "thunderstorm", tempC: 21, windDir: "S", precip: 38.9, isDaytime: true },
    { condition: "clear", tempC: 23, windDir: "W", precip: 0, isDaytime: true }
];

const weatherMetrics = [
    { label: 'Weather Condition', property: 'condition' as const },
    { label: 'Temperature (°C)', property: 'tempC' as const },
    { label: 'Wind Direction', property: 'windDir' as const },
    { label: 'Precipitation (mm)', property: 'precip' as const },
    { label: 'Daytime Reading', property: 'isDaytime' as const }
];

console.log(autoStat(weatherData, weatherMetrics));

// const theoreticalData = [
//     { a: 1, b: "hello", c: true, d: 3.14, e: null, f: undefined, g: BigInt(9007199254740991), h: Symbol('sym'), i: new Date('2024-03-20'), j: /test/, k: ["x", "y"], l: {x: 1}, m: NaN, n: Infinity },
//     { a: 2, b: "world", c: false, d: 2.718, e: null, f: undefined, g: BigInt(123), h: Symbol('sym2'), i: new Date('2024-03-21'), j: /test/, k: ["a", "b"], l: {x: 2}, m: NaN, n: -Infinity },
//     { a: 3, b: "test", c: true, d: 1.414, e: null, f: undefined, g: BigInt(456), h: Symbol('sym3'), i: new Date('2024-03-22'), j: /test/, k: ["m", "n"], l: {x: 3}, m: NaN, n: Infinity }
// ];

// const theoreticalMetrics = [
//     { label: 'Integer', property: 'a' as const },
//     { label: 'String', property: 'b' as const },
//     { label: 'Boolean', property: 'c' as const },
//     { label: 'Float', property: 'd' as const },
//     { label: 'Null', property: 'e' as const },
//     { label: 'Undefined', property: 'f' as const },
//     { label: 'BigInt', property: 'g' as const },
//     { label: 'Symbol', property: 'h' as const },
//     { label: 'Date', property: 'i' as const },
//     { label: 'RegExp', property: 'j' as const },
//     { label: 'Array', property: 'k' as const },
//     { label: 'Object', property: 'l' as const },
//     { label: 'NaN', property: 'm' as const },
//     { label: 'Infinity', property: 'n' as const }
// ];

// console.log(autoStat(theoreticalData, theoreticalMetrics));