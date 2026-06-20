const Achievements = {
    list: {
        survive1: false,
        corruption50: false,
        corruption100: false
    },

    unlock(id) {
        if (!this.list[id]) {
            this.list[id] = true;
            console.log("ACHIEVEMENT:", id);
        }
    }
};
