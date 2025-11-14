# Tic Tac Toe Game

A beautiful, interactive React-based Tic Tac Toe game with animated X and O placement, game history tracking, and AG Grid integration.

## 🌐 Live Demo

**Play the game:** [https://your-username.github.io/tic-tac-toe/](https://your-username.github.io/tic-tac-toe/)

> **Note:** Replace `your-username` with your GitHub username in the URL above.

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
- `npm run deploy` - Build and deploy to GitHub Pages (manual deployment)

## Deployment

This project is configured for GitHub Pages deployment. The app will be automatically deployed when you push to the `main` or `master` branch.

### Automatic Deployment (Recommended)

1. Enable GitHub Pages in your repository settings:
   - Go to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy on every push to `main`/`master`

2. Your site will be available at:
   ```
   https://<your-username>.github.io/tic-tac-toe/
   ```

### Manual Deployment

If you prefer to deploy manually:

1. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. The first time you deploy, you'll need to:
   - Authenticate with GitHub
   - Allow the `gh-pages` package to create a `gh-pages` branch

### Updating the Repository About Section

To add the GitHub Pages link to your repository's "About" section:

1. Go to your repository on GitHub
2. Click the ⚙️ gear icon next to "About"
3. Check "Website" and enter: `https://your-username.github.io/tic-tac-toe/`
4. Click "Save changes"

## License

MIT

