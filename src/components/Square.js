import "./Square.css";
import queen from "./queen-blood-code.png";

export default function Square({ cell, handleClick }) {
  function DaQueen() {
    return <img className="queen" src={queen} alt="queen" />;
  }

  return (
    <td
      className="Square"
      onClick={(e) => handleClick(cell)}
      style={{
        backgroundColor: cell.isAlive ? "black" : cell.isQueen ? "blue" : "red",
      }}
    >
      {cell.isQueen ? DaQueen() : ""}
    </td>
  );
}
