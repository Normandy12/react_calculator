
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function NumberKey(props) {
    return (
        <button className="square" onClick={props.handleClick}>
        {props.value}
        </button>
    );
}

function OperationKey(props) {
    return (
        <button className="square" onClick={props.handleClick}>
        {props.value}
        </button>
    );
}

  
class Board extends React.Component {
    constructor(props) {    
        super(props);    
        this.state = {      
            display: "0",
            firstOperand: null,
            secondOperand: null,
            operation: null,
            typingNumber: false,
        };  
    }

    handleNumberClick(i){
        if(this.state.typingNumber) {
            this.setState({
                display: this.state.display.concat(i),
            })
        } else {
            this.setState({
                display: String(i),
                typingNumber: true
            })
        }
        
    }

    handleOperationClick(i){
        const currentNumber = parseFloat(this.state.display);
        if( this.state.firstOperand == null ) {
            this.setState({
                firstOperand: currentNumber,
            });
        } else {
            let result = this.calculate(this.state.operation,this.state.firstOperand,currentNumber);
            this.setState({
                display: String(result),
                firstOperand: result,
            });
        }

        this.setState({
            typingNumber: false,
            operation:i
        });
    }

    calculate(operation,firstOperand, secondOperand){
        let f = parseFloat(firstOperand);
        let s = parseFloat(secondOperand);
        switch(operation){
            case '+':
                return f + s;
            case '-':
                return f - s;
            case '*':
                return f * s;
            case '/':
                return f / s
            default:
                return s;
        }
    }

    renderNumberKey(i) {
        return <NumberKey 
            value={i}  
            handleClick={() => this.handleNumberClick(i)}
        />;
    }

    renderOperationKey(i) {
        return <OperationKey 
            value={i}  
            handleClick={() => this.handleOperationClick(i)}
        />;
    }
  
    render() {
        const status = this.state.display;
  
        return (
            <div>
                <div className="display">{status}</div>
                <div className="board-row">
                    {this.renderNumberKey("AC")}
                    {this.renderNumberKey("C")}
                    {this.renderNumberKey("%")}
                    {this.renderOperationKey("/")}
                </div>
                <div className="board-row">
                    {this.renderNumberKey(7)}
                    {this.renderNumberKey(8)}
                    {this.renderNumberKey(9)}
                    {this.renderOperationKey("*")}
                </div>
                <div className="board-row">
                    {this.renderNumberKey(4)}
                    {this.renderNumberKey(5)}
                    {this.renderNumberKey(6)}
                    {this.renderOperationKey("+")}
                </div>
                <div className="board-row">
                    {this.renderNumberKey(1)}
                    {this.renderNumberKey(2)}
                    {this.renderNumberKey(3)}
                    {this.renderOperationKey("-")}
                </div>
                <div className="board-row">
                    {this.renderNumberKey("")}
                    {this.renderNumberKey(0)}
                    {this.renderNumberKey(".")}
                    {this.renderOperationKey("=")}
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

// class Calculator extends React.Component {
//     render() {
//         return (
//             <div className="calculator">
//                 <div className="calculator-display">
//                     <CalculatorDisplay />
//                     <CalculatorKeys />
//                 </div>
//             </div>
//         );
//     }
// }
  
  // ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  