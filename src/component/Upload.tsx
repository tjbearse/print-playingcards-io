import { useCallback } from "react"
import { Board } from "../model/game"

export const FileUpload = ({ onUpload }: { onUpload: (f: File) => void }) => (
	<input type="file" id="myFile" onChange={e => { if (e.target.files) { onUpload(e.target.files[0]) } }} />
)


export const GameUpload = ({ setGame }: { setGame: (g: Board) => void }) => {
	const parseGame = useCallback(async (f: File) => {
		const text = await f.text()
		const start = text.indexOf('[')
		const end = text.lastIndexOf(']')
		if (!start || !end) {
			throw new Error('invalid file format')
		}
		const obj = JSON.parse(text.slice(start, end + 1))
		setGame(obj)
	}, [setGame])
	return <FileUpload onUpload={f => parseGame(f)} />
}