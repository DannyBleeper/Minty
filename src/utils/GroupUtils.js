class GroupUtils {
    static groupBy(list, keyGetter) {
        return list.reduce((r, a) => {
            const res = keyGetter(a);
            r[res] = r[res] || [];
            r[res].push(a);
            return r;
        }, Object.create(null));
    }
}

module.exports = GroupUtils;