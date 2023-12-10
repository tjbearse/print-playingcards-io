

export const PrintLayout = ({ items, perPage }: { perPage: number, items: React.ReactNode[] }) => {
	const nPages = Math.ceil(items.length / perPage)

	const pages = Array.from({ length: nPages }).map((_, i) => {
		return items.slice(i * perPage, (i + 1) * perPage)
	})

	return (
		<div>
			{
				pages.map((p, i) => (
					<div key={i} className="page" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
						{
							p
						}
					</div>
				))
			}
		</div>
	)
}