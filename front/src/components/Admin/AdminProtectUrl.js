function protect() {
  var t = sessionStorage.getItem("test");
  var t2 = sessionStorage.getItem("test2");
  var t3 = sessionStorage.getItem("test3");
  var t4 = sessionStorage.getItem("test4");
  var t5 = sessionStorage.getItem("test5");
  var t6 = sessionStorage.getItem("test6");

  if (t3 !== null) {
    return "/admin/analytical";
  } else if (t !== null) {
    return "/testScreen";
  } else if (t2 !== null) {
    return "/admin/computer";
  } else if (t4 !== null) {
    return "/admin/compiler";
  } else if (t5 !== null) {
    return "/admin/domain";
  } else if (t6 !== null) {
    return "/admin/personality";
  } else if (sessionStorage.getItem("result") === "true") {
    return "/result";
  } else {
    return "";
  }
}

export default { protect };
