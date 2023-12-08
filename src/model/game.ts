
export type Board = ({ type: Exclude<string, 'cardDeck'> } | CardDeck)[]

export interface LocatedXY {
	x: number,
	y: number,
}
export interface LocatedXYZ extends LocatedXY {
	z: number,
}
export interface WithWidth {
	w: number,
}
export interface WithHeight {
	h: number,
}

export type Color = string; // rgb, #840202, color name

export interface ImageObject extends LocatedXY, WithHeight, WithWidth {
	type: "image",
	color: Color,
}

export interface TextObject extends LocatedXY, WithWidth {
	type: "text",
	fontSize: number,
	textAlign: "left", // right center
	textFont: null // TODO
	color: Color,
}

export interface StaticObject {
	valueType: "static",
	value: string,
}
export interface DynamicObject {
	valueType: "dynamic",
	value: string,
}
export type CardObject = (TextObject | ImageObject) & (StaticObject | DynamicObject)
export interface CardTemplate {
	includeBorder?: "none" | "light" | "heavy", // default heavy
	includeRadius?: true, // default true
	objects: CardObject[]
}

export interface CardDeck extends Partial<LocatedXYZ> {
	id: string,
	type: "cardDeck",
	// autoShuffle?: boolean
	// parent?: string,
	// showUnflipped?: boolean,
	faceTemplate: CardTemplate,
	cardTypes: Record<string, Record<string, string>>,
	backTemplate: CardTemplate,
	cardWidth: number,
	cardHeight: number,
	// dragging?: null
}

export function isCardDeck(a: Board[number]): a is CardDeck {
	return a.type === 'cardDeck'
}