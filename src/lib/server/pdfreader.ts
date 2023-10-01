import { PdfReader } from 'pdfreader'

export const readPdf = (file: Buffer): Promise<string> => {
	return new Promise<string>((resolve, _) => {
		const pdfParser = new PdfReader({ debug: true })
		let text = ''

		pdfParser.parseBuffer(file, (err, item) => {
			if (err) {
				console.error('error:', err)
			} else if (!item) {
				console.warn('end of file')
				resolve(text)
			} else if (item.text) {
				console.info('item.text', item.text)
				text += item.text
			}
		})
	})
}
