import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadImage = async (image) => {
  const extension = image.name.split(".").pop();
  const filename = `${uuidv4()}.${extension}`;

  const bufferedImage = await image.arrayBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `post/images/${filename}`,
    Body: Buffer.from(bufferedImage),
    ContentType: image.type,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  return `${process.env.AWS_URL}/post/images/${filename}`;
};
