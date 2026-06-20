const Save = {
    key: "abyssal_save",

    save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    },

    load() {
        return JSON.parse(localStorage.getItem(this.key)) || null;
    }
};
