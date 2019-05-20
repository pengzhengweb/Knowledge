function getDays() {
    var date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    var days = date.getDate();
    return days;
}

1000 * 3600 * 24 * getDays();