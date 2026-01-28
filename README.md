# Finger Keyboard

A minimal typing speed test app built with React. Test your typing speed and accuracy with different difficulty modes and track your progress over time.

## Features

-  **Multiple Difficulty Modes** - Easy, Medium, Hard, Conjunctions, Punctuation, and Numbers
-  **Real-time Stats** - See your WPM, accuracy, and time as you type
-  **Progress Tracking** - View your recent tests and improvement over time with charts
-  **Custom Text** - Practice with your own text
-  **Dark/Light Mode** - Easy on the eyes, day or night
-  **Sound Effects** - Optional typing sounds (can be muted)
-  **Local Storage** - Your test history is saved in your browser

## Demo

Try it live: [Finger Keyboard Demo](https://finger-key-58pj.vercel.app/)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/divyanshhackh-spec/finger-key.git
   cd finger-key
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the dev server
   ```bash
   npm run dev
   ```

4. Open the link in your browser

## Usage

1. **Select a difficulty mode** or enter custom text in Settings
2. **Click the input field** and start typing
3. **Type the displayed text** as fast and accurately as you can
4. **View your results** when you finish - WPM, accuracy, and time
5. **Click "New Test"** to try again and beat your score!

## Built With

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Charts
- [Lucide React](https://lucide.dev/) - Icons

## How It Works

Finger Keyboard measures your typing speed in **Words Per Minute (WPM)** and calculates your **accuracy** based on correct vs incorrect characters. 

- **WPM Calculation**: (Number of words ÷ Time in minutes)
- **Accuracy**: (Correct characters ÷ Total characters typed) × 100

The test completes when you've typed the same number of characters as the target text, even if you made mistakes. This gives you realistic feedback on the speed vs accuracy trade-off.

⭐ Star this repo if you found it helpful!
