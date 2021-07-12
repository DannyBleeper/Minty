abstract class GroupUtils {
    public static groupBy<T>(list: T[], keyGetter: (key: T) => string): T[] {
        return list.reduce((r, a) => {
            const res = keyGetter(a);
            r[res] = r[res] || [];
            r[res].push(a);
            return r;
        }, Object.create(null));
    }
}

export { GroupUtils };
