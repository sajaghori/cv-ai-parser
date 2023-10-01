import { PUBLIC_S3_BUCKET_NAME, PUBLIC_S3_BUCKET_REGION } from '$env/static/public'

export const getS3FileUrl = (file_key: string): string =>
	`https://${PUBLIC_S3_BUCKET_NAME}.s3.${PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${file_key}`
