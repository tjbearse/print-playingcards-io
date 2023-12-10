import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Game, Widgets, isCardDeck } from './model/game'

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		gameBoard: null as Game | null,
		selectedDeck: null as string | null,
		cardsPerPage: 8,
	},
	reducers: {
		setGame: (state, action: PayloadAction<Game | null>) => {
			state.gameBoard = action.payload
			state.selectedDeck = state.gameBoard?.widgets.find(isCardDeck)?.id || null
		},
		selectDeck: (state, action: PayloadAction<string>) => {
			if (state.gameBoard?.widgets.find(e => isCardDeck(e) && e.id === action.payload)) {
				state.selectedDeck = action.payload
			}
		},
		setCardsPerPage: (state, action: PayloadAction<number>) => {
			state.cardsPerPage = Math.max(0, action.payload)
		}

	}
})
