import { Deck, PagedDeck } from "./Card";
import { CardDeck, isCardDeck } from "../model/game";
import { GameUpload } from "./Upload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { gameSlice } from "../slice";

function App() {

  return (
    <div className="wrapper">
      <Sidebar />
      <Game />
    </div>
  )
}

const Sidebar = () => {
  const dispatch = useDispatch()
  const cardDecks = useSelector((state: RootState) => state.game.gameBoard?.widgets.filter(isCardDeck).map(d => d.id))
  const cardsPerPage = useSelector((state: RootState) => state.game.cardsPerPage)

  return <div className="no-print sidebar" >
    <div className="section">

      <div className="sh">Export your board from playingcards.io</div>
      <div>
        <ol>
          <li>Enter edit mode on your board.</li>
          <li>Select "Room Options" in the toolbox.</li>
          <li>Click "Export to File".</li>
        </ol>
      </div>
    </div>
    <div className="section">
      <div className="sh">Upload your board file here</div>
      <div className="">
        <GameUpload setGame={(g) => dispatch(gameSlice.actions.setGame(g))} />
      </div>
    </div>
    {cardDecks && <>
      <div className="section">
        <div className="sh">Select a deck</div>
        <div>
          <label>Deck: </label>
          <select onChange={e => dispatch(gameSlice.actions.selectDeck(e.target.value))}>
            {cardDecks.map((id, i) => (
              <option key={id} value={id}>{i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Cards per page: </label>
          <input type="number" onChange={e => dispatch(gameSlice.actions.setCardsPerPage(+e.target.value))} value={cardsPerPage} />
        </div>
      </div>
      <div className="section">
        <div className="sh"><button className="link" onClick={() => window.print()}>Print your cards</button></div>
      </div>
    </>
    }
  </div>
}


const Game = () => {
  const activeDeck = useSelector((state: RootState) => state.game.selectedDeck && (state.game.gameBoard?.widgets.find(e => isCardDeck(e) && e?.id === state.game.selectedDeck) as CardDeck || null))
  const cardsPerPage = useSelector((state: RootState) => state.game.cardsPerPage)
  return (
    <>
      {activeDeck && <PagedDeck deck={activeDeck} perPage={cardsPerPage} />}
    </>
  );
}

export default App;
