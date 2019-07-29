import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';

import Topo from './src/components/topo.js'
import Icone from './src/components/icone.js'

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      escolhaUsuario: '',
      escolhaComputador: '',
      resultadoJogo: ''
    }
  }

  jokenpo = (escolha) => {
  this.setState({escolhaUsuario: escolha});

  var escolhaComputador = Math.floor(Math.random() * 3);
  if (escolhaComputador == 0){
    this.setState({escolhaComputador: 'Pedra'});
  }else if (escolhaComputador == 1){
    this.setState({escolhaComputador: 'Papel'});
  }else{
    this.setState({escolhaComputador: 'Tesoura'});
  }

  var resultado = '';

  if (escolhaComputador == 0) {
    if (escolha == 'Pedra') {
      resultado = 'Empate';
    }else if (escolha == 'Papel') {
      resultado = 'Você Venceu';
    }else{
      resultado = 'Você Perdeu';
    }
  }else if (escolhaComputador == 1) {
    if (escolha == 'Pedra') {
      resultado = 'Você Perdeu';
    }else if (escolha == 'Papel') {
      resultado = 'Empate';
    }else {
      resultado = 'Você Venceu';
    }
  }else if (escolhaComputador == 2) {
    if (escolha == 'Pedra') {
      resultado = 'Você Venceu';
    }else if (escolha == 'Papel') {
      resultado = 'Você Perdeu';
    }else {
      resultado = 'Empate';
    }
  }

  this.setState({resultadoJogo: resultado});

}

  render(){
    return(
      <View>

        <Topo />

        <View style={styles.painelAcoes}>
          <View style={styles.btnEscolha}>
            <Button title='Tesoura' onPress={() => {this.jokenpo('Tesoura')}} />
          </View>
          <View style={styles.btnEscolha}>
            <Button title='Pedra' onPress={() => {this.jokenpo('Pedra')}} />
          </View>
          <View style={styles.btnEscolha}>
            <Button title='Papel' onPress={() => {this.jokenpo('Papel')}} />
          </View>
        </View>

        <View style={styles.palco}>
          <Text style={styles.txtResultado}> {this.state.resultadoJogo} </Text>

          <Icone escolhaResultado={this.state.escolhaComputador} jogador='Computador'> </Icone>

          <Icone escolhaResultado={this.state.escolhaUsuario} jogador='Você'> </Icone>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnEscolha: {
    width: 90
  },
  painelAcoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  palco: {
    alignItems: 'center',
    marginTop: 10
  },
  txtResultado: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1E90FF',
    height: 45
  }
});

export default App;
