abstract class RandomUtils {
    public static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; // max is exclusive, min is inclusive
    }

    public static getRandomElement<T>(arr: T[]): T {
        if (!Array.isArray(arr)) return null;
        return arr[this.getRandomInt(0, arr.length)];
    }
}

export { RandomUtils };
