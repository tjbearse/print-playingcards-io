import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Board, isCardDeck } from './model/game'

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		board: null as Board | null,
		selectedDeck: null as string | null,
		cardsPerPage: 6,
	},
	reducers: {
		setBoard: (state, action: PayloadAction<Board | null>) => {
			state.board = action.payload
			state.selectedDeck = state.board?.find(isCardDeck)?.id || null
		},
		selectDeck: (state, action: PayloadAction<string>) => {
			if (state.board?.find(e => isCardDeck(e) && e.id === action.payload)) {
				state.selectedDeck = action.payload
			}
		}

	}
})
