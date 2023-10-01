import { uploadFileToS3 } from '$lib/server/s3'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData()
	const file: File = formData.get('file') as File

	const { file_key, file_name } = await uploadFileToS3(file)

	return json(
		{
			file_key,
			file_name
		},
		{ status: 201 }
	)
}
