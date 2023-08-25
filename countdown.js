let countdown = {};

(self => {
    const {floor} = Math;
    const dateStr = "2023.8.25 20:51:00";
    const tar = new Date(dateStr).getTime();

    class CountTime {
        constructor(milli) {
            if (milli < 0) return;
            milli = floor(milli / 1000);
            this.seconds = milli % 60;
            milli = floor(milli / 60);
            this.minutes = milli % 60;
            milli = floor(milli / 60);
            this.hours = milli % 24;
            milli = floor(milli / 24);
            this.days = milli;
        }

        count() {
            if (this.seconds) {
                this.seconds--;
            } else if (this.minutes) {
                this.seconds = 59;
                this.minutes--;
            } else if (this.hours) {
                this.seconds = 59;
                this.minutes = 59;
                this.hours--;
            } else if (this.days) {
                this.seconds = 59;
                this.minutes = 59;
                this.hours = 23;
                this.days--;
            } else {
                return true;
            }
            return false;
        }
    }

    let end = function defaultEnd() {
        console.log("END")
    };

    /**
     * @callback everyCallback
     * @param {CountTime} time
     */
    /**
     * @param {everyCallback} fn
     */
    self.everySec = function every(fn) {
        let timer;
        let delta = new CountTime(tar - Date.now());

        function count() {
            if (delta.count()) {
                typeof end === "function" && end();
                clearInterval(timer);
            } else {
                typeof fn === "function" && fn(delta);
            }
        }

        typeof fn === "function" && fn(delta);
        setTimeout(() => {
            count();
            timer = setInterval(count, 1000);
        }, 1000 - new Date().getMilliseconds());
    }

    self.finish = function finish(fn) {
        fn && typeof fn === "function" && (end = fn);
    }

})(countdown);
