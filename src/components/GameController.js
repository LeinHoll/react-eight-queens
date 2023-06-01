import TableBoard from "./TableBoard";
import { useState } from "react";
import "./GameController.css";

export default function GameController() {
  const [lastClick, setLastClick] = useState("0,0,0");
  const [cells, setCells] = useState(
    Array(0).fill({
      idx: 0,
      col: 0,
      row: 0,
      isQueen: false,
      isAlive: true,
    })
  );

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const cell = {
        idx: 8 * x + y,
        col: y,
        row: x,
        isQueen: false,
        isAlive: true,
      };
      cells.push(cell);
    }
  }

  function handleQueenSet(cell) {
    if (!cell.isAlive && !cell.isQueen) {
      return null;
    }

    const newCells = [...cells];

    newCells[cell.idx].isQueen = !cell.isQueen;

    setCells(newCells);

    handleKillZone();

    setLastClick(
      cell.idx + ", " + cells[cell.idx].row + ", " + cells[cell.idx].col
    );
  }

  function handleKillZone() {
    const newCells = [...cells];

    newCells.forEach((revive) => {
      revive.isAlive = true;
    });

    newCells.forEach((queen) => {
      if (queen.isQueen) {
        newCells.forEach((cell) => {
          if (cell.row === queen.row || cell.col === queen.col) {
            cell.isAlive = false;
          }
        });
        let yPlus = queen.row;
        let yMinus = queen.row;
        for (let xPlus = queen.col; xPlus < 8; xPlus++) {
          diagonalKill(newCells, yPlus, yMinus, xPlus);
          yPlus++;
          yMinus--;
        }
        yPlus = queen.row;
        yMinus = queen.row;
        for (let xMinus = queen.col; xMinus >= 0; xMinus--) {
          diagonalKill(newCells, yPlus, yMinus, xMinus);
          yPlus++;
          yMinus--;
        }
      }
    });

    setCells(newCells);
  }

  function diagonalKill(newCells, queenRowUp, queenRowDown, queenCol) {
    newCells.forEach((cell) => {
      if (
        (cell.row === queenRowUp && cell.col === queenCol) ||
        (cell.row === queenRowDown && cell.col === queenCol)
      ) {
        cell.isAlive = false;
      }
    });
  }

  return (
    <>
      <div>
        <TableBoard cells={cells} handleQueenSet={handleQueenSet} />
      </div>
      <div>
        <label className="coordinates">{lastClick}</label>
      </div>
    </>
  );
}
