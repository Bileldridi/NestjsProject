import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
// import * as path from 'path';


@Injectable()

export class ApisService {

    async sendMail() {
        let transport = nodemailer.createTransport({
            service : 'Gmail',
            auth: {
                user:'drd.bilel@gmail.com',
                pass:'Guts231290'
                }
        });
        let msg = {
            html: "<p>Hello!</p><p>Mail sent working</p>",
            createTextFromHtml: true,
            from:"<drd.bilel@gmail.com>",
            to:"<drd.bilel@gmail.com>",
            subject:"Nodemail"
        };
        return await transport.sendMail(msg);
    }

}
