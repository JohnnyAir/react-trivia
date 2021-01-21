import React, { FC } from "react";
import Qiuz from "./components/Quiz";

interface FormProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  startGame: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayerNameForm: FC<FormProps> = ({
  playerName,
  setPlayerName,
  startGame,
}) => {
  return (
    <form className="mt-16 ml-6 mr-6 flex justify-center flex-col">
      <p className="ml-0 m-3">Enter your name and start game</p>
      <input
        className="h-14 pl-4 text-lg rounded border-2"
        value={playerName}
        type="text"
        placeholder="Enter your name"
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button
        className="h-14 mt-2 text-lg rounded border-2"
        onClick={startGame}
      >
        Start Quiz
      </button>
    </form>
  );
};

interface GameOverProps {
  score: number;
  reset: () => void;
  endGame: () => void;
}

const GameOver: FC<GameOverProps> = ({ score, reset, endGame }) => {
  return (
    <div>
      <h5>Your Score {score}</h5>
      <button
        onClick={reset}
        className="h-12 bg-blue-500 text-white rounded pl-6 pr-6 mr-6"
      >
        Play Again
      </button>
      <button
        onClick={endGame}
        className="h-12 bg-blue-500 text-white rounded pl-6 pr-6"
      >
        End Game
      </button>
    </div>
  );
};

function App() {
  const [playing, setGameStatus] = React.useState<boolean>(false);
  const [playerName, setPlayerName] = React.useState<string>("");
  const [gameOver, setGameOver] = React.useState(false);
  const [finalScore, setFinalScore] = React.useState(0);

  const startGame = () => {
    setGameStatus(true);
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setGameOver(true);
  };

  const resetGame = () => {
    setFinalScore(0);
    setGameOver(false);
  };

  const endGame = () => {
    setFinalScore(0);
    setGameOver(false);
    setGameStatus(false);
    setPlayerName("");
  };

  return (
    <div className="app bg-gray-100 h-full">
      <header className="h-14 bg-white"></header>
      <div className="m-auto w-11/12 max-w-2xl">
        <div className="mt-8">
          {playing ? (
            gameOver ? (
              <GameOver
                score={finalScore}
                reset={resetGame}
                endGame={endGame}
              />
            ) : (
              <Qiuz onGameOver={handleGameOver} />
            )
          ) : (
            <PlayerNameForm
              playerName={playerName}
              setPlayerName={setPlayerName}
              startGame={startGame}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
