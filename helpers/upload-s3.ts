import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import AWS from 'aws-sdk';
import { UploadedFile } from "express-fileupload";
import File from "../models/files";

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
            const command = new PutObjectCommand({ Bucket: process.env.AWS_BUKET, Key: `${location}/${files.name}`, Body: files.data, ContentType: files.mimetype });
            await s3.send(command);
            const fileDB = await File.create({ name: files.name, url: `https://hibee-uploads.s3.us-east-2.amazonaws.com/${location}/${files.name}`, type: files.mimetype, section: location });
            return fileDB.id;
        }

    } catch (error) {
        console.log(`Error lo upload file ${error}`);
        throw new Error(error);
    }

}

export const signedURLS3 = async (Key: string, expiresIn = 604800) => {
    try {
        const s3 = new AWS.S3({
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_AWS,
                secretAccessKey: process.env.SECRET_KEY_AWS
            }
        })

        const presignedURL = s3.getSignedUrl('getObject', {
            Bucket: process.env.AWS_BUKET,
            Key,
            Expires: expiresIn
        });
        return presignedURL;
    } catch (error) {
        console.log(`Error lo signed file ${error}`);
        throw new Error(error);
    }
}