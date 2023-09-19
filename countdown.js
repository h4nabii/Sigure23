let countdown = ((() => {
    const {floor} = Math;
    // const dateStr = "2023.9.25";
    const dateStr = "2023.9.25";
    const tar = new Date(dateStr).getTime();

    /**
     *
     */
    class CountTime {
        constructor(milli) {
            if (typeof milli !== "number" || milli < 0) return;
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
        console.log("END");
    };

    return {
        /**
         * Callback function of everySec. Execute at every second before countdown end.
         * @callback everyCallback
         * @param {CountTime} time
         */
        /**
         * Set the callback function executing at every second
         * @param {everyCallback} callback
         */
        everySec(callback) {
            let timer;
            let delta = new CountTime(tar - Date.now());

            function count() {
                if (delta.count()) {
                    typeof end === "function" && end();
                    clearInterval(timer);
                } else {
                    typeof callback === "function" && callback(delta);
                }
            }

            typeof callback === "function" && callback(delta);
            setTimeout(() => {
                count();
                timer = setInterval(count, 1000);
            }, 1000 - new Date().getMilliseconds());
        },

        /**
         * Set the callback function executing when countdown is finished.
         * @param {function} callback
         */
        finish(callback) {
            callback && typeof callback === "function" && (end = callback);
        },
    }
})());
