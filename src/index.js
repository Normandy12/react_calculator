
import React, { Component, useContext } from 'react';
import { render } from 'react-dom';
import './index.css';

const CalculatorContext = React.createContext();

class CalculatorProvider extends Component {
    state = {
        value: null,
        displayValue: '0',
        operator: null,
        waitingForOperand: false,
        updateDisplayValue: (num) => {
            const { displayValue, waitingForOperand } = this.state

            if (waitingForOperand) {
                this.setState({
                    displayValue: String(num),
                    waitingForOperand: false
                })
            } else {
                this.setState({
                    displayValue: displayValue === '0' ? String(num) : displayValue.concat(num)
                })
            }
        },
        performOperation:  (nextOperator) => {    
            const { value, displayValue, operator } = this.state
            const inputValue = parseFloat(displayValue)
            
            if (value == null) {
                this.setState({
                value: inputValue
                })
            } else if (operator) {
                const currentValue = value || 0
                const newValue = CalculatorOperations[operator](currentValue, inputValue)
                
                this.setState({
                value: newValue,
                displayValue: String(newValue)
                })
            }
            
            this.setState({
                waitingForOperand: true,
                operator: nextOperator
            })
        },
        addPeriod: () => {
            const { displayValue } = this.state
    
            if (!(/\./).test(displayValue)) {
                this.setState({
                    displayValue: displayValue + '.',
                    waitingForOperand: false
                })
            }
        },
        clear: (type) => {
            if( type === 'AC') {
                this.setState({
                    value: null,
                    displayValue: '0',
                    operator: null,
                    waitingForOperand: false
                })
            } else if(type === 'C' ) {
                const { displayValue } = this.state

                this.setState({
                    displayValue: displayValue.slice(0, -1) || '0'
                })
            }
        },
        toggleNegative: () => {
            const { displayValue } = this.state
            const newValue = parseFloat(displayValue) * -1
            
            this.setState({
                displayValue: String(newValue)
            })
        }
    }

    render() {
        return (
            <CalculatorContext.Provider value={this.state}>
                {this.props.children}
            </CalculatorContext.Provider>
        )
    }
}

let Calculator = () => {
    return (
        <div className="calculator">
            <CalculatorDisplay />

            <CalculatorClearKey value={"AC"} />
            <CalculatorClearKey value={"C"} />
            <CalculatorNegativeKey value={"+/-"} />
            <CalculatorOperationKey  value={"/"} />

            <CalculatorNumericKey  value={7} />
            <CalculatorNumericKey  value={8} />
            <CalculatorNumericKey  value={9} />
            <CalculatorOperationKey  value={"*"} />

            <CalculatorNumericKey  value={4} />
            <CalculatorNumericKey  value={5} />
            <CalculatorNumericKey  value={6} />
             <CalculatorOperationKey  value={"-"} />

            
            <CalculatorNumericKey  value={1} />
            <CalculatorNumericKey  value={2} />
            <CalculatorNumericKey  value={3} />
            <CalculatorOperationKey  value={"+"} />

            <CalculatorNumericKey  value={0} />
            <CalculatorPeriodKey value={"."} />  
            <CalculatorOperationKey  value={"="} />
        </div>
    )
}

let CalculatorDisplay = () => {
    const context = useContext(CalculatorContext);
    return (
        <div className="calculator-display">
            {context.displayValue}
        </div>
    )
}
  
let CalculatorNumericKey = (props) => {
    const context = useContext(CalculatorContext);
    return (
        <div className={`calculator-key key-${props.value}`} >
            <button className="square" onClick={() => context.updateDisplayValue(props.value)}>
                {props.value}
            </button>
        </div>
    )
}

let CalculatorOperationKey = (props) => {
    const context = useContext(CalculatorContext);
    return (
        <div className="calculator-key" >
            <button className="square" onClick={() => context.performOperation(props.value)}>
                {props.value}
            </button>
        </div>
    )
}

let CalculatorPeriodKey = (props) => {
    const context = useContext(CalculatorContext);
    return (
        <div className="calculator-key" >
            <button className="square" onClick={() => context.addPeriod()}>
                {props.value}
            </button>
        </div>
    )
}

let CalculatorClearKey = (props) => {
    const context = useContext(CalculatorContext);
    return (
        <div className="calculator-key" >
            <button className="square" onClick={() => context.clear(props.value)}>
                {props.value}
            </button>
        </div>
    )
}

let CalculatorNegativeKey = (props) => {
    const context = useContext(CalculatorContext);
    return (
        <div className="calculator-key" >
            <button className="square" onClick={() => context.toggleNegative()}>
                {props.value}
            </button>
        </div>
    )
}


class App extends Component {
    render() {
        return (
            <CalculatorProvider>
                <Calculator />
            </CalculatorProvider>
        );
    }
  }

render(
    <App />,
    document.getElementById('root')
);

const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
}
  