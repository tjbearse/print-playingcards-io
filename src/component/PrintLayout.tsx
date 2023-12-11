

export const PrintLayout = <T,>({ items, perPage, children }: { perPage: number, items: T[], children: (t: T, i: number) => React.ReactNode }) => {
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
							p.map((e, i) => children(e, i))
						}
					</div>
				))
			}
		</div>
	)
}