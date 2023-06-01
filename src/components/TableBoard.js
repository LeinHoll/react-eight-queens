import Square from "./Square";

export default function TableBoard({ cells, handleQueenSet }) {
  function TableRows() {
    const rows = [];
    for (let col = 0; col < 8; col++) {
      const row = <tr key={col}>{TableCells(col)}</tr>;
      rows.push(row);
    }
    return rows;
  }

  function TableCells(col) {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      let idx = 8 * col + row;
      squares.push(
        <Square key={idx} cell={cells[idx]} handleClick={handleQueenSet} />
      );
    }

    return squares;
  }

  return (
    <table>
      <tbody>
        <TableRows />
      </tbody>
    </table>
  );
}
