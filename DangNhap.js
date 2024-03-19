// Sinh viên thực hiện: Trần Thanh Mới B2014760
// Ngày hoàn thành 30/11/2022

function loginValidate(frm) {
  var email1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email1.test(frm.email.value) == false) {
    alert("Vui lòng nhập email .");
    frm.email.focus();
    return false;
  }
  if (frm.psw.value.length < 8) {
    alert("Mật khẩu có tối thiểu 8 ký tự.");
    frm.psw.focus();
    return false;
  }
  alert("Dang Nhap Thanh Cong");
  return true;
}
function p_getpage() {
  window.location.href = "dangki.html";
}
