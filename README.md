# Tic Tac Toe Game

A beautiful, interactive React-based Tic Tac Toe game with animated X and O placement, game history tracking, and AG Grid integration.

## Features

- 🎮 **Animated Gameplay**: Smooth animations when placing X and O pieces
- 🎨 **3D Visual Effects**: Stunning 3D-looking X and O graphics with gradients and shadows
- 👥 **Player Selection**: Choose to play as X or O
- 🎯 **Hover Previews**: See which sign will be placed before clicking
- 🏆 **Win Detection**: Animated winning line and celebratory confetti on victory
- 📊 **Game History**: Track all your games with AG Grid table
- 💾 **Local Storage**: Game history persists across browser sessions
- 📱 **Responsive Design**: Works on various screen sizes

## Technologies Used

- React 18
- Vite
- AG Grid Community
- CSS3 Animations
- LocalStorage API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tic-tac-toe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## How to Play

1. Choose your sign (X or O) when the game starts
2. Click on any empty cell to place your sign
3. The game alternates between Player 1 (X) and Player 2 (O)
4. Win by getting three of your signs in a row (horizontal, vertical, or diagonal)
5. View your game history by clicking the history button
6. Reset the game or exit to the menu using the icon buttons

## Project Structure

```
tic-tac-toe/
├── src/
│   ├── components/
│   │   ├── TicTacToe.jsx      # Main game component
│   │   └── GameHistory.jsx    # Game history table component
│   ├── styles/
│   │   ├── index.css          # Global styles
│   │   ├── App.css            # App container styles
│   │   ├── TicTacToe.css      # Game board and animations
│   │   └── GameHistory.css    # History table styles
│   ├── App.jsx                # Root component
│   └── main.jsx               # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

MIT

