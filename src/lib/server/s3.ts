import { DeleteObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { PUBLIC_S3_BUCKET_NAME, PUBLIC_S3_BUCKET_REGION } from '$env/static/public'
import { AWS_ACCESS_KEY_ID, AWS_ACCESS_KEY_SECRET } from '$env/static/private'
import type { Readable } from 'stream'

export const uploadFileToS3 = async (
	file: File
): Promise<{ file_key: string; file_name: string }> => {
	const s3 = new S3Client({
		credentials: {
			accessKeyId: AWS_ACCESS_KEY_ID,
			secretAccessKey: AWS_ACCESS_KEY_SECRET
		},
		region: PUBLIC_S3_BUCKET_REGION
	})

	const file_key = `${Date.now().toString()}_${file.name.replace(' ', '-')}`

	const parallelUploads3 = new Upload({
		client: s3,
		params: {
			Bucket: PUBLIC_S3_BUCKET_NAME,
			Key: file_key,
			Body: file.stream()
		}
	})

	await parallelUploads3.done()

	return {
		file_key,
		file_name: file.name
	}
}

export const deleteFileFromS3 = async (file_key: string): Promise<void> => {
	const s3 = new S3Client({
		credentials: {
			accessKeyId: AWS_ACCESS_KEY_ID,
			secretAccessKey: AWS_ACCESS_KEY_SECRET
		},
		region: PUBLIC_S3_BUCKET_REGION
	})

	await s3.send(
		new DeleteObjectCommand({
			Bucket: PUBLIC_S3_BUCKET_NAME,
			Key: file_key
		})
	)

	console.info('Deleted file from S3:', file_key)
}

export const getFileFromS3 = async (file_key: string): Promise<Buffer> => {
	const s3 = new S3Client({
		credentials: {
			accessKeyId: AWS_ACCESS_KEY_ID,
			secretAccessKey: AWS_ACCESS_KEY_SECRET
		},
		region: PUBLIC_S3_BUCKET_REGION
	})

	const response = await s3.send(
		new GetObjectCommand({
			Bucket: PUBLIC_S3_BUCKET_NAME,
			Key: file_key
		})
	)

	const stream = response.Body as Readable

	return Buffer.concat(await stream.toArray())
}
