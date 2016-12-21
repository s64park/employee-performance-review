/**
 * Created by Terry on 2016-12-18.
 */

const yearCaculator = (date) => {
    if (!date) {
        return;
    }
    let startingYear = parseInt(date.substring(0,4));
    let startingMonth = parseInt(date.substring(5,7));
    let now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth() + 1;

    let year = currentYear - startingYear;
    let month = currentMonth - startingMonth;
    if(currentMonth < startingMonth) {
        year -= 1;
        month += 12;
    }
    return year + " years, " + month + " months";
};

export default yearCaculator;
