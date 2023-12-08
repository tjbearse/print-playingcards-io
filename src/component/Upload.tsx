
export const FileUpload = ({ onUpload }: { onUpload: (f: File) => void }) => (
	<input type="file" id="myFile" onChange={e => { if (e.target.files) { onUpload(e.target.files[0]) } }} />
)
