import React, { useCallback, useState } from "react";
import "./App.css";
import { Deck } from "./component/Card";
import { Board, CardDeck } from "./model/game";
import { FileUpload } from "./component/Upload";

function App() {
  const [game, setGame] = useState<Board | null>(null)
  const parseGame = useCallback(async (f: File) => {
    const text = await f.text()
    const start = text.indexOf('[')
    const end = text.lastIndexOf(']')
    if (!start || !end) {
      throw new Error('invalid file format')
    }
    const obj = JSON.parse(text.slice(start, end + 1))
    setGame(obj)
  }, [])

  if (game == null) {
    return (<FileUpload onUpload={f => parseGame(f)} />)
  } else {
    return <Game game={game} />
  }
}

function Game({ game }: { game: Board }) {
  const decks = game.filter(e => 'type' in e && e?.type === 'cardDeck') as CardDeck[]
  const [iDeck, setIDeck] = useState(0)
  const data = decks[iDeck]
  // TODO need to pull card quantities out of the data too
  return (
    <div>
      <div className="no-print">
        <label>Deck:</label>
        <select onChange={e => setIDeck(+e.target.value)}>
          {decks.map((d, i) => (
            <option key={d.id} value={i}>{i}, {d.id}</option>
          ))}
        </select>
      </div>
      <Deck deck={data} />
    </div>
  );
}

export default App;
