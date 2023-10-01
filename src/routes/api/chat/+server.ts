import { openai } from '$lib/server/openai'
import type { ChatCompletion } from 'openai/resources/chat'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
	const { content } = (await request.json()) as { content: string }
	const start = performance.now()
	console.info('Chat endpoint called')

	const chatCompletion: ChatCompletion = (await openai.chat.completions
		.create({
			model: 'gpt-3.5-turbo-16k',
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
					"jobTitle": "Software Engineer",
					"company": "XXX",
					"startDate": "June 2020",
					"endDate": "August 2023",
					"location": "San Francisco, CA",
					"description": "I worked on the XXX team, where I built XXX using XXX."
				}
			]. Can you parse it into a JSON? Return only the JSON. Please sort show the recent experiences and educations first. 
			Be sure that the job title is valid, e.g. "Software Engineer" is valid, but "Software" is not. 
			If the job title is not valid, then do not return it.`
				}
			]
		})
		.catch((error) => {
			console.error('Chat request failed', error)

			return new Response(
				JSON.stringify({
					error: 'Chat request failed'
				}),
				{
					headers: {
						'content-type': 'application/json'
					},
					status: 500
				}
			)
		})) as ChatCompletion

	console.info('Chat request completed', performance.now() - start, 'ms')

	return new Response(
		JSON.stringify({
			parsedCV: chatCompletion.choices[0].message.content ?? chatCompletion.choices[0].finish_reason
		}),
		{
			headers: {
				'content-type': 'application/json'
			},
			status: 200
		}
	)
}
