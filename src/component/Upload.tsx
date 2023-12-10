import { useCallback } from "react"
import { Game } from "../model/game"
import { parseGameFromFile } from "../model/parseGame"

export const FileUpload = ({ onUpload }: { onUpload: (f: File) => void }) => (
	<input type="file" id="myFile" onChange={e => { if (e.target.files) { onUpload(e.target.files[0]) } }} />
)


export const GameUpload = ({ setGame }: { setGame: (g: Game) => void }) => {
	const parseGame = useCallback(async (f: File) => {
		const obj = await parseGameFromFile(f)
		setGame(obj)
	}, [setGame])
	return <FileUpload onUpload={f => parseGame(f)} />
}