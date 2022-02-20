const nodemailer = require('nodemailer');

//이메일 형식 체크
const validationEmail = (str) => {
  const reg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return reg.test(str);
}

//회원가입 이메일 인증번호 보내는 함수
const makeEmailNo = (length)=>{
    let result = '';
    const ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const chLength = ch.length;
    for(let i = 0; i < length; i++){
        result += ch.charAt(Math.floor(Math.random() * chLength));
    }
    return result;
}

const sendEmail = async (email, no) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PW,
    },
  });
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: ` "MFI" <${process.env.EMAIL_ID}>`,
    to: email,
    subject: 'MFI 계정 이메일 인증하기',
    text: 'text 입력',
    html: `
      <p> 
        안녕하세요, 사용자님  <br> 
        요청하신 MFI 사이트 이메일 인증번호를 안내 드립니다.
        아래 번호를 입력하여 MFI 사이트 인증 절차를 완료해 주세요. <br>
        인증번호 : <h2>${no} </h2> <br>
        MFI 드림.
      </p>
    `,
  });
};
  

module.exports = {
    makeEmailNo, sendEmail,validationEmail
}