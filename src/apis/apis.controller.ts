import { Controller, Post, UseInterceptors, Bind, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { ApisService } from './apis.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';
import * as multer from 'multer';


@Controller('apis')
export class ApisController {
    constructor(private readonly apisService: ApisService ) { }

    @Post('mail')
    async send() {
       return await this.apisService.sendMail();
    }

    @Post('upload')
    // ************     first method      ****************
    // @UseInterceptors(FileInterceptor('file'))
    // @Bind(UploadedFile())
    // uploadFile(file) {
    //     const path = './src/images/' + file.originalname;
    //     let fileStream = createWriteStream(path);
    //     fileStream.write(file.buffer);
    //     fileStream.end();
    //     console.log(file);
    //   ******    methode with @Bind    ******
    @UseInterceptors(FileInterceptor('file', {
        storage: multer.diskStorage({
          destination(req, file, cb) {
            cb(null, 'src/images/');
          },
          filename(req, file, cb) {
            cb(null, Date.now() + file.originalname.slice(file.originalname.lastIndexOf('.')));
          },
        }),
    
      }))
    async uploadFile(@Res() res, @UploadedFile() file) {
        await res.send({message: "done"});
    }

    @Get('send/:filename')
    async fileSended(
        @Param('filename') name: string,
        @Res() res
    ) {
        // **********          first method         ************
        // const filepath = await path.join("./src/images/", name);
        // return res.sendfile(filepath);
        return res.sendFile(name, { root: path.join('src/images', '/') });
    }

}
