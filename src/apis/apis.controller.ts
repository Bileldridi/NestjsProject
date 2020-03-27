import { Controller, Post, UseInterceptors, Bind, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { ApisService } from './apis.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import * as path from 'path';


@Controller('apis')
export class ApisController {
    constructor(private readonly apisService: ApisService ) { }

    @Post('mail')
    async send() {
       return await this.apisService.sendMail();
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @Bind(UploadedFile())
    uploadFile(file) {
        const path = './src/images/' + file.originalname;
        let fileStream = createWriteStream(path);
        fileStream.write(file.buffer);
        fileStream.end();
        console.log(file);
    }

    @Get('send/:filename')
    async fileSended(
        @Param('filename') name: string,
        @Res() res
    ) {
        const filepath = await path.join("./src/images/", name);
        return res.sendfile(filepath);
    }

}
