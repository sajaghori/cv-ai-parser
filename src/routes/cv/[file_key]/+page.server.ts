import { readPdf } from '$lib/server/pdfreader'
import { getFileFromS3 } from '$lib/server/s3'
import { OpenAI } from 'openai'
import { OPENAI_API_KEY } from '$env/static/private'
import type { PageServerLoad } from './$types'

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
})

export const load: PageServerLoad = async ({ params: { file_key } }) => {
	console.info('file_key', file_key)

	const file = await getFileFromS3(file_key)

	const content = await readPdf(file)

	console.info('content', content)

	const chatCompletion = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content: `You are a CV Parser, that returns a JSON response. Here is the raw CV content:
			\`\`\`

			${content}

			\`\`\`
			I want the provided resume to be parsed and returned in a JSON format. The JSON should contain the following fields:
			"firstName", 
			"lastName", 
			"email" (only if the format is correct), 
			"phoneNumber" (if present, concat the numbers), 
			"educations": [
				{
					"degree": "Bachelor of Science in Computer Science",
					"school": "XXX University",
					"startDate": "June 2020",
					"endDate": "August 2023",
				}
			], 
			"experiences": [
				{
					"title": "Software Engineer",
					"company": "XXX",
					"startDate": "June 2020",
					"endDate": "August 2023",
					"location": "San Francisco, CA",
					"description": "I worked on the XXX team, where I built XXX using XXX."
				}
			]. Can you parse it into a JSON? Return only the JSON.`
			}
		]
	})

	return {
		text: chatCompletion.choices[0].message.content
	}
}
