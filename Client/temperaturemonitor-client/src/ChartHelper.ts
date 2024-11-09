import * as am5 from "@amcharts/amcharts5";
import am5index from "@amcharts/amcharts5/index";
import { DateTemperature } from "./Models/DateTemperature";

export class TemperatureChartColors {
    lessthan0: am5index.Color;
    lessthan15: am5index.Color;
    lessthan25: am5index.Color;
    lessthan35: am5index.Color;
    morethan34: am5index.Color;
    constructor() {
        this.lessthan0 = am5.color("#1124d4");
        this.lessthan15 = am5.color("#1189d4");
        this.lessthan25 = am5.color("#c4d411");
        this.lessthan35 = am5.color("#d47311");
        this.morethan34 = am5.color("#d41111");
    }
}

export const chartColors: TemperatureChartColors = new TemperatureChartColors()

export const getChartColor = (value: number) => {
    switch (true) {
        case (value < 0):
            return chartColors.lessthan0;
        case (value < 14):
            return chartColors.lessthan15;
        case (value < 25):
            return chartColors.lessthan25;
        case (value < 35):
            return chartColors.lessthan35;
        default:
            return chartColors.morethan34;
    }
}

export const getYmax = (values: number[]): number => {
    return Math.max(...values) + 10;
}

export const scaleValues = (temperatures: DateTemperature[], values: number): DateTemperature[] => {
    let maxHour = Math.max(...temperatures.map(_ => _.createdAt.getHours()));
    let span = 24 / values;
    let returnValues: DateTemperature[] = [];
    let index = 0;
    while (index < maxHour) {
        let valueIndex = 0;
        let gap = 999999;
        let searchTime = index + 0;
        temperatures.forEach((t, idx) => {
            let time = t.createdAt.getHours() + (t.createdAt.getMinutes() / 60);
            let newGap = Math.abs(time - searchTime);
            if (newGap < gap) {
                gap = newGap;
                valueIndex = idx;
            }

        });
        returnValues.push(temperatures[valueIndex]);
        index += span;
    }
    return returnValues;
}