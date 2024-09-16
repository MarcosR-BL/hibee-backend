import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import File from "../models/files";

export interface UploadAwsInterface {
    Key: string;
    Body: string;
}

export const uploadFileS3 = async (files: UploadedFile | UploadedFile[], location = "static") => {
    try {
        const s3 = new S3({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_AWS,
                secretAccessKey: process.env.SECRET_KEY_AWS
            }
        });

        if (!Array.isArray(files)) {
            const command = new PutObjectCommand({ Bucket: process.env.AWS_BUKET, Key: `${location}/${files.name}`, Body: files.data });
            await s3.send(command);
            const fileDB = await File.create({ name: files.name, url: `https://s3.amazonaws.com/${process.env.AWS_BUKET}/${location}/${files.name}`, type: files.mimetype, section: location });
            return fileDB.id;
        }

    } catch (error) {
        console.log(`Error lo upload file ${error}`);
        throw new Error(error);
    }

}