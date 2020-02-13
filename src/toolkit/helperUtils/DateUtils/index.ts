const MS_PER_MINUTE = 60000;

export const minutesToMs = (num: number): number => MS_PER_MINUTE * num;

export const diffTimes = (time1: number | Date, time2: number | Date): number =>
    Math.abs(Number(time1) - Number(time2));
