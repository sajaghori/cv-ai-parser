import { PdfReader } from 'pdfreader'

export const readPdf = (file: Buffer): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const pdfParser = new PdfReader({ debug: true })
		const items: string[] = []
		pdfParser.parseBuffer(file, (err, item) => {
			if (err) {
				console.error('error:', err)
				reject(err)
			} else if (!item) {
				console.warn('end of file')
				resolve(items.join(' '))
			} else if (item.text) {
				console.info('item.text', item.text)
				items.push(item.text)
			}
		})
	})
}
