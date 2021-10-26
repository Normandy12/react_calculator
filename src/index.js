
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
        <button className="square">
            {this.props.value}
        </button>
        );
    }
}
  
class Board extends React.Component {
    renderSquare(i) {
      return <Square value={i} />;
    }
  
    render() {
        const status = '0';
  
        return (
            <div>
                <div className="display">{status}</div>
                <div className="board-row">
                    {this.renderSquare("AC")}
                    {this.renderSquare("C")}
                    {this.renderSquare("%")}
                    {this.renderSquare("/")}
                </div>
                <div className="board-row">
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare("*")}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare("+")}
                </div>
                <div className="board-row">
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare("")}
                    {this.renderSquare(0)}
                    {this.renderSquare(".")}
                    {this.renderSquare("=")}
                </div>
            </div>
      );
    }
}
  
class Game extends React.Component {
    render() {
      return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
      );
    }
}
  
  // ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  