import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface SnakeCellProps {
  id: number;
}

const GameBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  gap: 1px;
  width: 100%;
  height: 100%;
`;

const Score = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: #ccc002
`;

const GameOverMessage = styled.div`
  text-align: center;
`;

const SnakeCell = styled.div`
  background-color: #d4d4d4;
`;

const FoodCell = styled.div`
  background-color: #ccc002;
`;

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

interface SnakeGameProps {
  onKeyPress: (event: KeyboardEvent) => void;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ onKeyPress }) => {
  const [snake, setSnake] = useState<SnakeCellProps[]>([]);
  const [food, setFood] = useState<SnakeCellProps>({ id: 4 });
  const [direction, setDirection] = useState<string>('right');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameRunning, setGameRunning] = useState<boolean>(false);

  useEffect(() => {
    const initialSnake: SnakeCellProps[] = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];

    const initialGameOver: boolean = false;
    const initialScore: number = 0;

    setSnake(initialSnake);
    setGameOver(initialGameOver);
    setScore(initialScore);
  }, []);

  useEffect(() => {
    if (!gameOver && gameRunning) {
      const timer = setInterval(moveSnake, 100);
      return () => {
        clearInterval(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, gameRunning]);

  useEffect(() => {
    checkCollision();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);

    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, [onKeyPress]);

  function moveSnake(): void {
    setSnake((prevSnake) => {
      const updatedSnake = [...prevSnake];
      const head = updatedSnake[0];
      let newHead: SnakeCellProps;

      if (direction === Direction.Up) {
        newHead = { id: head.id - 20 };
      } else if (direction === Direction.Down) {
        newHead = { id: head.id + 20 };
      } else if (direction === Direction.Left) {
        newHead = { id: head.id - 1 };
      } else {
        newHead = { id: head.id + 1 };
      }

      updatedSnake.unshift(newHead);
      updatedSnake.pop();

      return updatedSnake;
    });

    // Move the snake after a delay
    setTimeout(moveSnake, 100);
  }

  function checkCollision(): void {
    if (snake.length === 0) {
      return;
    }

    const head = snake[0];
    const body = snake.slice(1);
    const collision = body.some((cell) => cell.id === head.id);

    if (
      head.id < 1 ||
      head.id > 400 ||
      collision ||
      (head.id % 20 === 0 && direction === Direction.Right) ||
      (head.id % 20 === 1 && direction === Direction.Left)
    ) {
      setGameOver(true);
      setGameRunning(false); // Stop the game
    } else if (head.id === food.id) {
      setFood(generateFood());
      setScore((prevScore) => prevScore + 1);
      growSnake();
    }
  }

  function generateFood(): SnakeCellProps {
    const randomId = Math.floor(Math.random() * 400) + 1;
    const isOnSnake = snake.some((cell) => cell.id === randomId);

    if (isOnSnake) {
      return generateFood();
    }

    return { id: randomId };
  }

  function growSnake(): void {
    setSnake((prevSnake) => {
      const tail = prevSnake[prevSnake.length - 1];
      const newTailId = tail.id - 1;

      return [...prevSnake, { id: newTailId }];
    });
  }

  function startGame(): void {
    setGameStarted(true);
    setGameRunning(true);
  }

  function resetGame(): void {
    const initialSnake: SnakeCellProps[] = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];

    const initialGameOver: boolean = false;
    const initialScore: number = 0;

    setSnake(initialSnake);
    setGameOver(initialGameOver);
    setScore(initialScore);
    setGameStarted(false);
    setGameRunning(false);
  }

  return (
    <div>
      <h1>PLAY 2 EARN</h1>
      <GameBoardContainer>
        {!gameStarted ? (
          <button onClick={startGame}>Start Game</button>
        ) : (
          <GameBoard>
            {Array.from({ length: 400 }).map((_, index) => {
              const snakeCell = snake.find((cell) => cell.id === index + 1);
              return snakeCell ? (
                <SnakeCell
                  key={index}
                  style={{
                    gridColumn: (snakeCell.id - 1) % 20 + 1,
                    gridRow: Math.floor((snakeCell.id - 1) / 20) + 1,
                  }}
                />
              ) : (
                <div key={index} />
              );
            })}
            <FoodCell
              style={{
                gridColumn: (food.id - 1) % 20 + 1,
                gridRow: Math.floor((food.id - 1) / 20) + 1,
              }}
            />
          </GameBoard>
        )}
      </GameBoardContainer>
      <Score>Score: {score}</Score>
      {gameOver && (
        <GameOverMessage>
          Game Over!
          <button onClick={resetGame}>Restart</button>
        </GameOverMessage>
      )}
    </div>
  );
};

export default SnakeGame;
