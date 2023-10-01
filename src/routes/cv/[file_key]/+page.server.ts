import { readPdf } from '$lib/server/pdfreader'
import { getFileFromS3 } from '$lib/server/s3'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params: { file_key } }) => {
	const file = await getFileFromS3(file_key)

	return {
		rawContent: readPdf(file)
	}
}
