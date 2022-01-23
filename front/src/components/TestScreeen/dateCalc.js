function getCurrentTime() {
  var ob = new Date();
  var hh = (ob.getHours() < 10 ? "0" : "") + ob.getHours();
  var mm = (ob.getMinutes() < 10 ? "0" : "") + ob.getMinutes();
  var ss = (ob.getSeconds() < 10 ? "0" : "") + ob.getSeconds();
  return { hh: hh, mm: mm, ss: ss };
}
export default getCurrentTime;
