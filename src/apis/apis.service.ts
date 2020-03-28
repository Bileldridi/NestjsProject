import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { interval } from 'rxjs';

@Injectable()

export class ApisService {

    constructor() {}
    async sendMail() {
        const observable = interval(10000);
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
        observable.subscribe(x => {transport.sendMail(msg), console.log('hello')});
        
        
        return await transport.sendMail(msg);
    }

}
