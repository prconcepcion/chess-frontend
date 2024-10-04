import './App.scss'
import { MoveList } from './components/MoveList';
import { Piece } from './components/Piece'
import { Tile } from './components/Tile'
import { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { selectMoves } from './store/movelist/counterMoveList';
import { GameOverScreen } from './components/GameOverScreen';
import { initialBoard } from './helper/util';

const test = [
	[ 'blackRook', null, 'blackPawn', null,  'blackKing', null, null, 'blackRook' ],
	[ 'blackPawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'blackPawn', 'blackPawn', 'blackPawn', ],
	[ null, null, null, null, null, null, null, null, ],
	[ null, null, null, null, null, null, null, null, ],
	[ null, null, null, null, 'whiteKing', null, null, null, ],
	[ null, null, null, null, null, null, null, null, ],
	[ null, 'whitePawn', 'blackPawn', 'blackPawn', 'blackPawn', 'whitePawn', 'whitePawn', null, ],
	[ 'whiteRook', null, null, null,  'whiteKing', null, null, 'whitePawn' ],
]


function App() {
	const [ board, setBoard ] = useState( initialBoard )
    const moveList = useSelector( selectMoves )
    const [ gameover, setGameover ] = useState( false )

	return ( 
        <>
            <div className='chessboard'>
                { board.map( ( row, i ) => {
                    return ( <div key={i} className={ (i+1) % 2 === 0 ? 'chessboard-row even' : 'chessboard-row odd' } >
                            { row.map( ( square, j ) => {
                                return (
                                <Tile
                                    key={j}
                                    coordinate={i+''+j}
                                    board={board}
                                    setBoard={ setBoard }
                                    setGameover={ setGameover }
                                >
                                    { square ? <Piece coordinate={{row:i,column:j}} board={board} setBoard={setBoard} isBoard={ true } side={ square.slice( 0, 5 ) } name={ square } /> : null }
                                </Tile> )
                            } ) }
                        </div> )
                } ) }
                { gameover && <GameOverScreen setBoard={ setBoard } setGameover={ setGameover } /> }
            </div> 
            <div className='move-list'>
                { moveList.length !== 0 &&  <MoveList /> }
            </div>
        </>

    )
}

export default App
