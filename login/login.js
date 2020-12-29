const oLoginBox = document.getElementsByClassName('login-box')[0]; //登录界面
const oUser = document.getElementsByClassName('username')[0]; //登录手机号
const oPass = document.getElementsByClassName('password')[0]; //登录密码
const oLogin = document.getElementsByClassName('loginBtn')[0]; //登录按钮
const oRegistere = document.getElementsByClassName('registereBtn')[0]; //注册按钮
const oClose = document.getElementsByClassName('close')[0]; //关闭按钮
// 注册界面
const oRegistereBox = document.getElementsByClassName('registere-box')[0]; //注册界面
const oName = document.getElementsByClassName('name')[0]; //昵称
const oPhone = document.getElementsByClassName('phone')[0]; //手机号
const oCaptcha = document.getElementsByClassName('captcha')[0]; //验证码
const oSendBtn = document.getElementsByClassName('sendBtn')[0]; //验证码按钮
const oNewPass = document.getElementsByClassName('newPass')[0]; //注册密码
const oRegistereSubmit = document.getElementsByClassName('registere-submit')[0]; //注册提交按钮
const oClose2 = document.getElementsByClassName('close2')[0]; //关闭按钮

// 关闭
oClose.onclick = () => {
    history.back()
}
oClose2.onclick = () => {
    oRegistereBox.style.display = 'none';
    oLoginBox.style.display = 'block';
}
// 登录
oLogin.onclick = () => {
    getLogin(oUser.value, oPass.value).then(res => {
        console.log(res)
        if (res.code === 200) {
            sessionStorage.setItem('user_cookie', res.cookie);
            sessionStorage.setItem('user_id', res.account.id);
            history.back()
        } else if (res.msg) {
            alert(res.msg)
        } else {
            alert('请输入正确的用户名')
        }
    })
}
//登录界面注册按钮
oRegistere.onclick = () => {
    oLoginBox.style.display = 'none';
    oRegistereBox.style.display = 'block';
}
//验证码按钮
oSendBtn.onclick = () => {
    const phone = oPhone.value; //获取手机号
    if (!phone) {
        alert("请输入手机号");
        return;
    }
    setCaptcha(phone).then(res => {
        if (res.code === 200) {
            oSendBtn.disabled = true; //禁用按钮
            oSendBtn.style.backgroundColor = 'rgba(192, 193, 194)'; //改变按钮颜色
            let time = 60;
            oSendBtn.innerHTML = `已发送（${time}s)`
            time--;
            let timer = setInterval(() => {
                oSendBtn.innerHTML = `已发送（${time}s)`
                time--;
                if (time < 0) {
                    clearInterval(timer);
                    time = 60;
                    oSendBtn.innerHTML = `发送验证码`;
                    oSendBtn.disabled = false; //启用按钮
                    oSendBtn.style.backgroundColor = 'rgb(100, 211, 255, .8)';
                }
            }, 1000);
        } else {
            alert(res.message)
        }
    })
}
// 注册界面注册按钮
oRegistereSubmit.onclick = function () {
    setRegistered(oPhone.value, oNewPass.value, oCaptcha.value, oName.value).then(res => {
        if (res.code === 200) {
            oRegistereBox.style.display = 'none';
            oLoginBox.style.display = 'block';
        } else {
            alert(res.message)
        }
    })
}