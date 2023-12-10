import { useSelector } from "react-redux";
import type { CardTemplate, CardObject, CardDeck } from "../model/game";
import { RootState } from "../store";
import { PrintLayout } from "./PrintLayout";

function u2mm(n: number): number {
	// TODO maybe user configurable?
	return n / 1.8;
	// standard deck in pcio is 103x160
	// standard deck in irl (mm) is 63x88
	//
	// w = 1.6349206349
	// h = 1.8181818182
	// avg = 1.7265512266 
}
function mm(n: number): string {
	return `${n}mm`
}
const umm = (n: number) => mm(u2mm(n))

export const Card = ({
	width,
	height,
	template,
	data,
}: {
	width: number;
	height: number;
	template: CardTemplate;
	data: Record<string, string>;
}) => {
	const border = template.includeBorder ? "solid black 2mm" : "";
	const borderRadius = mm(3.5);
	return (
		<div
			style={{
				position: 'relative',
				width: umm(width),
				height: umm(height),
				border,
				// borderRadius,
			}}
		>
			{template.objects.map((o, i) => (
				<CardObject key={o.value} object={o} data={data} layer={i} />
			))}
		</div>
	);
};

const CardObject = ({
	object,
	data,
	layer,
}: {
	object: CardObject;
	data: Record<string, any>;
	layer: number
}) => {
	// TODO font
	// TODO text align
	const d = useCardData(object, data);
	const style = {
		position: "absolute",
		top: umm(object.y),
		left: umm(object.x),
		width: umm(object.w),
		zIndex: layer,
	} as const;
	if (object.type === "text") {
		return <div style={{ ...style, color: object.color ?? 'black', fontSize: object.fontSize }}>{d}</div>;
	} if (d) {
		return <CardImage asset={d} style={{ ...style, backgroundColor: object.color, height: umm(object.h) }} />;
	} else {
		return <div style={{ ...style, backgroundColor: object.color, height: umm(object.h) }} />;
	}
};
const useCardData = (object: CardObject, data: Record<string, any>) => {
	if (object.valueType === "static") {
		return object.value;
	} else {
		return data[object.value] ?? "";
	}
};

export const Deck = ({ deck }: { deck: CardDeck }) => (
	<div style={{ display: 'flex', flexWrap: 'wrap', flex: 'flexrow' }}>
		{Object.entries(deck.cardTypes).map(([k, v]) => <Card
			key={k}
			width={deck.cardWidth}
			height={deck.cardHeight}
			template={deck.faceTemplate}
			data={v} />
		)}
	</div>
)
export const PagedDeck = ({ deck, perPage }: { deck: CardDeck, perPage: number }) => {
	const items = Object.entries(deck.cardTypes).map(([k, v]) => <Card
		key={k}
		width={deck.cardWidth}
		height={deck.cardHeight}
		template={deck.faceTemplate}
		data={v} />
	)
	return (
		// TODO backs
		// TODO quantities
		// TODO variants of layouts
		// TODO page size and print marks
		<PrintLayout items={items} perPage={perPage} />
	)
}

function CardImage({ asset, style }: { asset: string; style: React.CSSProperties; }) {
	const images = useSelector((root: RootState) => root.game?.gameBoard?.images) || {}
	if (asset in images) {
		asset = images[asset]
	}
	return <img src={asset} style={style} alt="" />;
}