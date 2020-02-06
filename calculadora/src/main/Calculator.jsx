import React, { Component } from 'react';
import './Calculator.css';

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    value: [0, 1],
    current: 0 
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props){
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        this.setState({...initialState})
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const value = [...this.state.value]
            // sempre que uma operação for executada ele vai armazenar o valor no indice 0 do array, posibilitando 
            // a continuidade da conta
            // a função eval serve para fazer as operações 
            // a operação será passado pelo currentOperation
            // depois será o indice 1
            try {
                value[0] = eval(`${value[0]} ${currentOperation} ${value[1]}`)
            } catch(e){
                value[0] = this.state.value[0]
            }
            value[1] = 0

            this.setState({
                //mostra o valor atual do array na tela
                displayValue: value[0],
                //se a operação de equals for igual a null ele pega a outra operação
                operation : equals ? null : operation,
                current: equals? 0 : 1,
                clearDisplay: !equals,
                value

            })
        }
        
    }

    addDigit(n){
        if(n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        // caso comece com 0 ele limpa o 0 e insere o numero que o usuario clicoue impede que o 0 seja colocado mais de uma vez
        const clearDisplay = this.state.displayValue === '0' 
        || this.state.clearDisplay

        // se o valor for 0 ele coloca nada senao ele coloca o valor inserido pelo user
        const currentValue = clearDisplay ? '' : this.state.displayValue

        // mostra o valor atual + o numero inserido pelo user
        const displayValue = currentValue + n

        // set as atualizaçẽso feitas pelo user
        this.setState({ displayValue, clearDisplay: false})

        if (n !== '.' ){
            // para declarar qual indice voce está mexendo se é o indice 0 ou 1
            const i = this.state.current
            // o displayvalue já é o valor atual só que em string, então ele é convertido para um valor float e armazenado na constante new value
            const newValue = parseFloat(displayValue)
            console.log(this.state.value)

            const value = [...this.state.value];
            value[i] = newValue;
            this.setState({ value })
            console.log(value)
        }
    }

    render() {
        return(
            // No JSx deve se usar o className
            <div className='calculator'>
            <Display value={this.state.displayValue} />
            <Button label="AC" click={this.clearMemory} triple />
            <Button label="/" click={this.setOperation} operation/>
            <Button label="7" click={this.addDigit}/>
            <Button label="8" click={this.addDigit}/>
            <Button label="9" click={this.addDigit}/>
            <Button label="*" click={this.setOperation} operation/>
            <Button label="4" click={this.addDigit}/>
            <Button label="5" click={this.addDigit}/>
            <Button label="6" click={this.addDigit}/>
            <Button label="-" click={this.setOperation} operation/>
            <Button label="1" click={this.addDigit}/>
            <Button label="2" click={this.addDigit}/>
            <Button label="3" click={this.addDigit}/>
            <Button label="+" click={this.setOperation} operation/>
            <Button label="0" click={this.addDigit} double/>
            <Button label="." click={this.addDigit}/>
            <Button label="=" click={this.setOperation} operation/>
                
            </div>
        )
    }
}