function getTimeWait(dateReg) {
    let time = (new Date().getTime() - new Date(dateReg)) /1000;
    console.log(time);
    return time.toFixed(0)
}
module.exports = {getTimeWait};