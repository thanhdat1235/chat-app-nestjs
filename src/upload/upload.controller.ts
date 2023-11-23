// import {
//   Body,
//   Controller,
//   FileTypeValidator,
//   MaxFileSizeValidator,
//   ParseFilePipe,
//   Patch,
//   Post,
//   Put,
//   Req,
//   UploadedFile,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import {Request} from 'express';
// import { UploadService } from './upload.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { IUpload } from './dto/upload.dto';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

// @Controller('upload')
// export class UploadController {
//   constructor(private readonly uploadService: UploadService) {}

//   @UseGuards(JwtAuthGuard)
//   @Post()
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: 'public/images/uploads',
//         filename: function (req, file, cb) {
//           const randomName = Array(32)
//             .fill(null)
//             .map(() => Math.round(Math.random() * 16).toString(16))
//             .join('');
//           return cb(null, `${randomName}${extname(file.originalname)}`);
//         },
//       }),
//     }),
//   )
//   create(
//     @UploadedFile(
//       new ParseFilePipe({
//         validators: [
//           new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
//           new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
//         ],
//       }),
//     )
//     file: Express.Multer.File,
//     @Body() body: { userID: string },
//     @Req() req: Request
//   ) {

//     const host = `${req.protocol}://${req.get('Host')}`;
//     const userID = body.userID;
//     return this.uploadService.uploadFile({ file, userID, host });
//   }

//   @UseGuards(JwtAuthGuard)
//   @Patch()
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: 'public/images/uploads',
//         filename: function (req, file, cb) {
//           const randomName = Array(32)
//             .fill(null)
//             .map(() => Math.round(Math.random() * 16).toString(16))
//             .join('');
//           return cb(null, `${randomName}${extname(file.originalname)}`);
//         },
//       }),
//     }),
//   )

//   update(
//     @UploadedFile(
//       new ParseFilePipe({
//         validators: [
//           new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
//           new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
//         ],
//       }),
//     )
//     file: Express.Multer.File,
//     @Body() body: { userID: string },
//     @Req() req: Request
//   ) {

//     const host = `${req.protocol}://${req.get('Host')}`;
//     const userID = body.userID;
//     return this.uploadService.updateAvatar({ file, userID, host });
//   }
// }
