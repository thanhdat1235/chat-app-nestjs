// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { Upload, Prisma } from '@prisma/client';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { IUpload } from './dto/upload.dto';
// import { UserService } from 'src/users/users.service';

// @Injectable()
// export class UploadService {
//   constructor(private prisma: PrismaService) {}

//   async uploadFile(data: {
//     file: Express.Multer.File;
//     userID: string;
//     host: string;
//   }): Promise<Upload> {
//     const avatarLink = `${data.host}/avatar/${data.file.filename}`;
//     const saveData = {
//       userID: data.userID,
//       avatar_link: avatarLink,
//     };

//     const userID = await this.findUniqueAvatarUser(data.userID);

//     if (userID) {
//       throw new HttpException(
//         'User avatar already exists. Please update this',
//         HttpStatus.BAD_REQUEST,
//       );
//     }

//     try {
//       const avatar = await this.prisma.upload.create({
//         data: saveData,
//       });
//       return avatar;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   async updateAvatar(data: {
//     file: Express.Multer.File;
//     userID: string;
//     host: string;
//   }): Promise<Prisma.UploadWhereUniqueInput> {
//     const avatarLink = `${data.host}/avatar/${data.file.filename}`;
//     const user_id = data.userID;
//     const saveData = {
//       userID: data.userID,
//       avatar_link: avatarLink,
//     };

//     const userID = await this.findUniqueAvatarUser(data.userID);

//     try {
//       if (userID.userID) {
//         const avatar = await this.prisma.upload.update({
//           where: {
//             userID: user_id,
//           },
//           data: saveData,
//         });
//         return avatar;
//       } else {
//         throw new HttpException(
//           'User is not exists',
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   async findUniqueAvatarUser(userId: string): Promise<Upload> {
//     try {
//       const avatar = await this.prisma.upload.findUnique({
//         where: {
//           userID: userId,
//         },
//       });
//       return avatar;
//     } catch (error) {
//       throw new HttpException(
//         'Something wrong. Please try again',
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//   }
// }
