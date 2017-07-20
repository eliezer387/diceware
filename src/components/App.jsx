import React, {Component} from 'react';
import {Button, Container, Input, Form, Segment, Label} from 'semantic-ui-react';
//import 'whatwg-fetch';

const WORDS = 'http://localhost:8080/words/';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wordsCount:1,
            word: [],
            combination: []
        }
    }


    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getWord(WORDS, key) {
        fetch(WORDS + key)
            .then((resp)=> {
                return resp.json()
            }).then(json => {
            this.setState({
                word: [ ...this.state.word, json.word],
                combination: [ ...this.state.combination, key]
            })
        })
            .catch(
                err => console.log(err)
            )
    }

    generateKeyWord() {
        let key = "";
        for (let i = 0; i < 5; i++) {
            key = this.getRandomInt(1, 7) + key;
        }
        console.log(key);
        return this.getWord(WORDS, key)
    }

    generatePassword(count){
        for (let i=0; i<count; i++){

        }

    }

    render() {
        return (

            <Container text>
                 <Container text>
                     <h1>Diceware</h1>
                     <p>
                         ¿Qué es Diceware?

                         Diceware es un método de elección de ëfrases de pasoí que emplea dados (dice, en inglés) para seleccionar aleatoriamente
                         palabras de una lista especial llamada la Lista Diceware. Cada palabra en la lista está precedida por un número de 5 dígitos.
                         Todos los dígitos están entre 1 y 6, lo que permite usar el resultado de lanzar 5 dados, para seleccionar de la lista una palabra única.
                     </p>
                 </Container>
                <h2>Diceware password generator</h2>
                <Form className="inline">
                    {/*<Input placeholder="ingrese el numero de palabras" onChange={e => this.setState({wordsCount : e.target.value})}/>*/}
                   <Segment.Group >
                       <Label>
                           Combinacion
                       </Label>
                        <Segment>
                            { this.state.combination.map(
                                item => {
                                  return  item+ " ";
                                }
                            ) }
                        </Segment>
                       <Label>Palabra</Label>
                       <Segment>
                           {this.state.word.map(
                               item => {
                                   return  item+ " ";
                               }
                           ) }
                       </Segment>
                   </Segment.Group>

                    <Button primary onClick={ e => this.generateKeyWord(this.state.wordsCount) }> Generar</Button>
                    <Button negative onClick={e => this.setState({combination:[], word:[]})}>Limpiar</Button>
                </Form>
            </Container>

        )
    }
}

export default App;