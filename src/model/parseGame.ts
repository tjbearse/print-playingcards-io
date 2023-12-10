import { loadAsync } from 'jszip'
import { Game } from './game';


export async function parseGameFromFile(f: File): Promise<Game> {
	const zip = await loadAsync(f)
	const widgetString = await zip.file('widgets.json')?.async('string') || ''
	const widgets = JSON.parse(widgetString)

	const images: Record<string, string> = {}
	for (const filename in zip.files) {
		if (filename.match(/^\/?userassets\/./)) {
			const type = filename.split('.')[1]
			// TODO could do IO in parallel
			const base64 = await zip.files[filename].async('base64');
			const dataUrl = `data:image/${type};base64,${base64}`
			images['package://' + filename] = dataUrl;
		}
	}

	return {
		widgets,
		images,
	}
}