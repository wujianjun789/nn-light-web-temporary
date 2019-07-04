$(function () {
  var loginName = $('input[name=loginName]');
  var pwd = $('input[name=pwd]');
  $('#remember').click(function () {
    $('#form-remember').toggleClass('active');
  });
  if (window.localStorage.getItem('user_info')) { // 如果存在用户信息。则写进表单
    var userData = JSON.parse(window.localStorage.getItem('user_info'));
    loginName.val(userData.name);
    pwd.val(userData.password);
    $("#remember").prop("checked", true);
    $('#form-remember').addClass('active');
  }
  $('#login').click(function () {
    //var encryptKey = '';
    if ($('#remember').is(':checked')) { // 每次登录判断是否记住密码，如果记住，缓存用户信息，如果取消，删除用户信息缓存
      var userInfo = {'name': loginName.val(), 'password': pwd.val(), 'remember': $('#remember').is(':checked')};
      userInfo = JSON.stringify(userInfo);
      window.localStorage.setItem('user_info', userInfo)
    } else {
      window.localStorage.removeItem('user_info')
    }
    //ajaxRequest("post", "api/login/getsecretkey", {},function (data) {
    //  console.log(data);
    //  if(data.header.code == "1000"){
    //    encryptKey = data.body.data[0].keysecret.encoded
    //  }
    //});
    var remember = $('#remember').is(':checked') ? 1 : 0;
    if ($('#loginName').val() == "" || $('#pwd').val() == "") {
      alert("用户名或密码不能为空！");
    } else {
      //encrypt(pwd.val(),encryptKey) 加密的密码
      ajaxRequest("post", "/api/login/Login", {
        'loginName': loginName.val(),
        'pwd': pwd.val(),
        'isRememberMe': remember
      },
      function (data) {
        if (data.header.code == "1000") {
          window.location.href = 'Index.html'
        } else {
          $('#errormsg').show();
          $("#errormsg").text(data.header.msg);
        }
      });
    }

  });
});
function encrypt(content, key) {
  var sKey = CryptoJS.enc.Utf8.parse(key);
  var sContent = CryptoJS.enc.Utf8.parse(content);
  var encrypted = CryptoJS.AES.encrypt(sContent, sKey, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
  return encrypted.toString();
}
function keydown (e) {
  var e = e || event;
  if (e.keyCode == 13) {
    $("#login").click();
  }
}
