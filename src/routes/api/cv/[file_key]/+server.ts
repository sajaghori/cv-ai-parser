import { deleteFileFromS3 } from '$lib/server/s3'
import type { RequestHandler } from './$types'

export const DELETE: RequestHandler = async ({ params: { file_key } }) => {
	await deleteFileFromS3(file_key)

	return new Response(null, { status: 204 })
}
