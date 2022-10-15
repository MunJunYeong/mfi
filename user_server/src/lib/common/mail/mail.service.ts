import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService){}

    async authMail(email: string) {
        let no: string = createMailNo(6);
        let res: any = await this.mailerService.sendMail({
            to : email,
            from : 'mfinvest.kr@gmail.com',
            subject : 'MFI 계정 인증번호',
            text: 'text 입력',
            html : `
                <p> 
                안녕하세요, 사용자님  <br> 
                요청하신 MFI 사이트 인증번호를 안내 드립니다.
                아래 번호를 입력하여 MFI 사이트 인증 절차를 완료해 주세요. <br>
                인증번호 : <h2>${no} </h2> <br>
                MFI 드림.
                </p>`,
        })
        .then((success)=> {
            return success;
        })
        .catch((err)=> {
            console.log(err);
        })
        res.no = no;
        return res;
    }

    async idMail(id: string, email: string) {
        let res: object;
        res = await this.mailerService.sendMail({
            to : email,
            from : 'mfinvest.kr@gmail.com',
            subject : 'MFI 아이디 찾기 결과',
            text: 'text 입력',
            html : `<p> 
                    안녕하세요, 사용자님  <br> 
                    요청하신 MFI 사이트 아이디를 안내 드립니다.
                    아래 아이디를 확인해주세요. <br>
                    ID : <h2>${id} </h2> <br>
                    MFI 드림.
                </p>`,
        })
        .then((success)=> {
            return success;
        })
        .catch((err)=> {
            throw new Error(err);
        })
        return res;
    }

}
function createMailNo(length: number): string {
    let res: string = '';
    const ch:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const chLength:number = ch.length;
    for(let i = 0; i < length; i++){
        res+= ch.charAt(Math.floor(Math.random() * chLength));
    }
    return res;
}

