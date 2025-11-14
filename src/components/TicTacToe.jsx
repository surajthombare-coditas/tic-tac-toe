import { useState, useEffect, useId } from 'react'
import GameHistory from './GameHistory'
import '../styles/TicTacToe.css'

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [playerSign, setPlayerSign] = useState(null)
  const [winner, setWinner] = useState(null)
  const [winningLine, setWinningLine] = useState(null)
  const [isDraw, setIsDraw] = useState(false)
  const [hoveredCell, setHoveredCell] = useState(null)
  const [animatingCell, setAnimatingCell] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [view, setView] = useState('game') // 'game' or 'history'
  const [gameSaved, setGameSaved] = useState(false) // Track if current game result is saved

  // Player definitions
  const player1Sign = 'X'
  const player2Sign = 'O'

  // Function to calculate current player from board state
  const getCurrentPlayerFromBoard = (boardState) => {
    const xCount = boardState.filter(cell => cell === 'X').length
    const oCount = boardState.filter(cell => cell === 'O').length
    return xCount === oCount ? 'X' : 'O'
  }

  // Function to get next game number
  const getNextGameNumber = () => {
    const savedHistory = localStorage.getItem('ticTacToeHistory')
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory)
        return parsed.length > 0 ? parsed[parsed.length - 1].gameNumber + 1 : 1
      } catch (error) {
        return 1
      }
    }
    return 1
  }

  useEffect(() => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ]

    // Check for winner
    let foundWinner = null
    let foundWinningLine = null
    
    for (let combo of winningCombinations) {
      const [a, b, c] = combo
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        foundWinner = board[a]
        foundWinningLine = combo
        break
      }
    }

    if (foundWinner) {
      setWinner(foundWinner)
      setWinningLine(foundWinningLine)
      setShowConfetti(true)
      setIsDraw(false)
      setHoveredCell(null) // Clear hover when game ends
      // Save game result
      if (!gameSaved && playerSign) {
        const gameData = {
          gameNumber: getNextGameNumber(),
          date: new Date().toISOString(),
          winner: foundWinner,
          player1Sign: player1Sign,
          player2Sign: player2Sign
        }

        const savedHistory = localStorage.getItem('ticTacToeHistory')
        let history = []
        
        if (savedHistory) {
          try {
            history = JSON.parse(savedHistory)
          } catch (error) {
            console.error('Error parsing game history:', error)
            history = []
          }
        }

        history.push(gameData)
        localStorage.setItem('ticTacToeHistory', JSON.stringify(history))
        setGameSaved(true)
      }
    } else {
      setWinner(null)
      setWinningLine(null)
      setShowConfetti(false)
      
      // Check for draw only if no winner and board is full
      const isBoardFull = board.every(cell => cell !== null)
      if (isBoardFull) {
        setIsDraw(true)
        setHoveredCell(null) // Clear hover when game ends
        // Save game result
        if (!gameSaved && playerSign) {
          const gameData = {
            gameNumber: getNextGameNumber(),
            date: new Date().toISOString(),
            winner: null,
            player1Sign: player1Sign,
            player2Sign: player2Sign
          }

          const savedHistory = localStorage.getItem('ticTacToeHistory')
          let history = []
          
          if (savedHistory) {
            try {
              history = JSON.parse(savedHistory)
            } catch (error) {
              console.error('Error parsing game history:', error)
              history = []
            }
          }

          history.push(gameData)
          localStorage.setItem('ticTacToeHistory', JSON.stringify(history))
          setGameSaved(true)
        }
      } else {
        setIsDraw(false)
      }
    }
  }, [board, gameSaved, playerSign])

  const handleCellClick = (index) => {
    // Prevent clicking if no player sign selected
    if (!playerSign) {
      return
    }

    // Prevent clicking if game is over
    if (winner || isDraw) {
      return
    }

    // Use functional update to get the latest board state
    // This ensures we always work with the most current board state
    setBoard(prevBoard => {
      // Prevent clicking if cell is occupied (check latest state)
      // This prevents duplicate moves even with rapid clicks
      if (prevBoard[index]) {
        return prevBoard
      }

      // Create new board with the move
      const newBoard = [...prevBoard]
      
      // Calculate current player from the board state
      const nextPlayer = getCurrentPlayerFromBoard(prevBoard)
      newBoard[index] = nextPlayer
      
      // Update current player immediately (no delay) - state updates synchronously
      const newCurrentPlayer = nextPlayer === 'X' ? 'O' : 'X'
      setCurrentPlayer(newCurrentPlayer)
      
      // Start animation immediately
      setAnimatingCell(index)
      
      // Only delay the animation cleanup (visual only, doesn't affect game state)
      setTimeout(() => {
        setAnimatingCell(null)
      }, 300)

      return newBoard
    })
  }

  const handlePlayerSelection = (sign) => {
    // Reset everything and start the game
    setPlayerSign(sign)
    setCurrentPlayer('X')
    setBoard(Array(9).fill(null))
    setWinner(null)
    setWinningLine(null)
    setIsDraw(false)
    setHoveredCell(null)
    setAnimatingCell(null)
    setShowConfetti(false)
    setGameSaved(false)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
    setWinningLine(null)
    setIsDraw(false)
    setHoveredCell(null)
    setAnimatingCell(null)
    setShowConfetti(false)
    setGameSaved(false)
  }

  const exitToMenu = () => {
    setPlayerSign(null)
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
    setWinningLine(null)
    setIsDraw(false)
    setHoveredCell(null)
    setAnimatingCell(null)
    setShowConfetti(false)
    setGameSaved(false)
    setView('game')
  }

  const goToHistory = () => {
    setView('history')
  }

  const goBackToGame = () => {
    setView('game')
  }

  // Show history view
  if (view === 'history') {
    return <GameHistory onBack={goBackToGame} />
  }

  // Show player selection screen
  if (playerSign === null) {
    return (
      <div className="player-selection">
        <h2>Choose Your Sign</h2>
        <div className="sign-selection">
          <button 
            className="sign-button sign-x" 
            onClick={() => handlePlayerSelection('X')}
            type="button"
          >
            <X3D />
            <span>Play as X</span>
          </button>
          <button 
            className="sign-button sign-o" 
            onClick={() => handlePlayerSelection('O')}
            type="button"
          >
            <O3D />
            <span>Play as O</span>
          </button>
        </div>
      </div>
    )
  }

  // Show game board
  return (
    <div className="tic-tac-toe-container">
      {showConfetti && winner && <Confetti />}
      
      <div className="game-header">
        <div className="player-labels">
          <div className={`player-label ${currentPlayer === player1Sign && !winner && !isDraw ? 'active' : ''} ${winner === player1Sign ? 'winner' : ''} ${isDraw ? 'draw' : ''}`}>
            <span className="player-number">Player 1</span>
            <span className={`player-indicator ${player1Sign.toLowerCase()}`}>
              <X3D />
            </span>
            {winner === player1Sign && (
              <span className="winner-badge">
                <span className="trophy-emoji">🏆</span>
                <span>Winner!</span>
              </span>
            )}
          </div>
          <div className={`player-label ${currentPlayer === player2Sign && !winner && !isDraw ? 'active' : ''} ${winner === player2Sign ? 'winner' : ''} ${isDraw ? 'draw' : ''}`}>
            <span className="player-number">Player 2</span>
            <span className={`player-indicator ${player2Sign.toLowerCase()}`}>
              <O3D />
            </span>
            {winner === player2Sign && (
              <span className="winner-badge">
                <span className="trophy-emoji">🏆</span>
                <span>Winner!</span>
              </span>
            )}
          </div>
        </div>
        <div className="game-controls">
          <button className="icon-button history" onClick={goToHistory} type="button" title="Game History">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h18v18H3V3z" />
              <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
            </svg>
          </button>
          <button className="icon-button reset" onClick={resetGame} type="button" title="Reset Game">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
          </button>
          <button className="icon-button exit" onClick={exitToMenu} type="button" title="Exit to Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="board-container">
        <div className={`board ${winner || isDraw ? 'game-ended' : ''}`}>
          {board.map((cell, index) => {
            const isWinningCell = winningLine && winningLine.includes(index)
            const isGameOver = winner || isDraw
            // Calculate current player from board state for accurate hover display
            const hoverPlayer = !isGameOver ? getCurrentPlayerFromBoard(board) : null
            return (
              <div
                key={index}
                className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ''} ${animatingCell === index ? 'animating' : ''} ${hoveredCell === index && cell && !isGameOver ? 'cell-occupied-hover' : ''} ${isWinningCell ? 'winning-cell' : ''} ${isGameOver ? 'disabled' : ''}`}
                onClick={() => !isGameOver && handleCellClick(index)}
                onMouseEnter={() => !isGameOver && setHoveredCell(index)}
                onMouseLeave={() => !isGameOver && setHoveredCell(null)}
              >
                {cell ? (
                  <>
                    <div className="cell-content">
                      {cell === 'X' ? <X3D /> : <O3D />}
                    </div>
                    {hoveredCell === index && !isGameOver && (
                      <div className="cell-cross-over">
                        <svg className="cross-over-svg" viewBox="0 0 100 100">
                          <line x1="10" y1="10" x2="90" y2="90" 
                            stroke="#ff4757" 
                            strokeWidth="10" 
                            strokeLinecap="round"
                            className="cross-slash"
                          />
                        </svg>
                      </div>
                    )}
                  </>
                ) : (
                  hoveredCell === index && !isGameOver && (
                    <div className="cell-hover">
                      {hoverPlayer === 'X' ? <X3D hover /> : <O3D hover />}
                    </div>
                  )
                )}
              </div>
            )
          })}
          {winningLine && <WinningLine line={winningLine} />}
        </div>
      </div>
    </div>
  )
}

// 3D X Component
const X3D = ({ hover = false }) => {
  const id = useId()
  const gradientId = `x-gradient-${id}`
  const highlightId = `x-highlight-${id}`
  const shadowId = `x-shadow-${id}`
  
  return (
    <div className={`x-3d ${hover ? 'hover' : ''}`}>
      <svg viewBox="0 0 100 100" className="x-svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b81" stopOpacity="1" />
            <stop offset="30%" stopColor="#ff4757" stopOpacity="1" />
            <stop offset="70%" stopColor="#c44569" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b2635" stopOpacity="1" />
          </linearGradient>
          <linearGradient id={highlightId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="3" dy="3" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Shadow layer */}
        <line
          x1="22"
          y1="22"
          x2="82"
          y2="82"
          stroke="#8b2635"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.3"
          className="x-line-shadow-1"
        />
        <line
          x1="82"
          y1="22"
          x2="22"
          y2="82"
          stroke="#8b2635"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.3"
          className="x-line-shadow-2"
        />
        {/* Main lines */}
        <line
          x1="20"
          y1="20"
          x2="80"
          y2="80"
          stroke={`url(#${gradientId})`}
          strokeWidth="12"
          strokeLinecap="round"
          filter={`url(#${shadowId})`}
          className="x-line-1"
        />
        <line
          x1="80"
          y1="20"
          x2="20"
          y2="80"
          stroke={`url(#${gradientId})`}
          strokeWidth="12"
          strokeLinecap="round"
          filter={`url(#${shadowId})`}
          className="x-line-2"
        />
        {/* Highlight layer */}
        <line
          x1="20"
          y1="20"
          x2="80"
          y2="80"
          stroke={`url(#${highlightId})`}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.7"
          className="x-line-highlight-1"
        />
        <line
          x1="80"
          y1="20"
          x2="20"
          y2="80"
          stroke={`url(#${highlightId})`}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.7"
          className="x-line-highlight-2"
        />
      </svg>
    </div>
  )
}

// 3D O Component
const O3D = ({ hover = false }) => {
  const id = useId()
  const gradientId = `o-gradient-${id}`
  const highlightId = `o-highlight-${id}`
  const shadowId = `o-shadow-${id}`
  
  return (
    <div className={`o-3d ${hover ? 'hover' : ''}`}>
      <svg viewBox="0 0 100 100" className="o-svg">
        <defs>
          <radialGradient id={gradientId} cx="30%" cy="30%">
            <stop offset="0%" stopColor="#5f27cd" stopOpacity="1" />
            <stop offset="40%" stopColor="#3742fa" stopOpacity="1" />
            <stop offset="70%" stopColor="#2f3542" stopOpacity="1" />
            <stop offset="100%" stopColor="#1e2124" stopOpacity="1" />
          </radialGradient>
          <radialGradient id={highlightId} cx="30%" cy="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="3" dy="3" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Shadow layer */}
        <circle
          cx="52"
          cy="52"
          r="30"
          fill="none"
          stroke="#1e2124"
          strokeWidth="12"
          opacity="0.3"
          className="o-circle-shadow"
        />
        {/* Main circle */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          filter={`url(#${shadowId})`}
          className="o-circle"
        />
        {/* Inner highlight */}
        <circle
          cx="50"
          cy="50"
          r="28"
          fill={`url(#${highlightId})`}
          opacity="0.6"
          className="o-circle-highlight"
        />
        {/* Outer rim highlight */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke={`url(#${highlightId})`}
          strokeWidth="3"
          opacity="0.5"
          className="o-circle-rim"
        />
      </svg>
    </div>
  )
}

// Confetti Component
const Confetti = () => {
  useEffect(() => {
    const confettiCount = 150
    const confettiColors = ['#ff4757', '#3742fa', '#ffa502', '#2ed573', '#5f27cd', '#ff6348', '#ffd32a']
    const confettiElements = []
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti-piece'
      const startX = Math.random() * 100
      const rotation = Math.random() * 720
      confetti.style.left = startX + '%'
      confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)]
      confetti.style.animationDelay = Math.random() * 1 + 's'
      confetti.style.animationDuration = (Math.random() * 2 + 3) + 's'
      confetti.style.width = (Math.random() * 10 + 5) + 'px'
      confetti.style.height = (Math.random() * 10 + 5) + 'px'
      confetti.dataset.rotation = rotation.toString()
      
      document.body.appendChild(confetti)
      confettiElements.push(confetti)
    }

    // Cleanup after animation completes
    const cleanupTimeout = setTimeout(() => {
      confettiElements.forEach(el => {
        if (el.parentNode) {
          el.remove()
        }
      })
    }, 5000)

    return () => {
      clearTimeout(cleanupTimeout)
      confettiElements.forEach(el => {
        if (el.parentNode) {
          el.remove()
        }
      })
    }
  }, [])

  return null
}

// Winning Line Component
const WinningLine = ({ line }) => {
  // Determine line type and calculate positions
  const getLineClass = () => {
    // Rows
    if (line[0] === 0 && line[1] === 1 && line[2] === 2) return 'winning-line-row-1'
    if (line[0] === 3 && line[1] === 4 && line[2] === 5) return 'winning-line-row-2'
    if (line[0] === 6 && line[1] === 7 && line[2] === 8) return 'winning-line-row-3'
    // Columns
    if (line[0] === 0 && line[1] === 3 && line[2] === 6) return 'winning-line-col-1'
    if (line[0] === 1 && line[1] === 4 && line[2] === 7) return 'winning-line-col-2'
    if (line[0] === 2 && line[1] === 5 && line[2] === 8) return 'winning-line-col-3'
    // Diagonals
    if (line[0] === 0 && line[1] === 4 && line[2] === 8) return 'winning-line-diag-1'
    if (line[0] === 2 && line[1] === 4 && line[2] === 6) return 'winning-line-diag-2'
    return 'winning-line-row-1'
  }

  return (
    <div 
      className={`winning-line ${getLineClass()}`}
    >
      <div className="winning-line-inner"></div>
    </div>
  )
}

export default TicTacToe
