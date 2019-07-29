import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';

import Topo from './topo.js';
import Icone from './icone.js';

class Inicial extends Component{

  constructor(props){
    super(props);
    this.state = {
      escolhaUsuario: '',
      escolhaComputador: '',
      resultadoJogo: ''
    }
  }

  componentWillMount(){
    var firebaseConfig = {

    };
    firebase.initializeApp(firebaseConfig);
  }

  armazenarDados(jogada){
    let data = new Date().getDate();
    let mes = new Date().getMonth() + 1;
    let ano = new Date().getFullYear();
    let hora = new Date().getHours();
    let minuto = new Date().getMinutes();
    let segundo = new Date().getSeconds();

    let time = (data + '/' + mes + '/' + ano + ' ' + hora + ':' + minuto + ':' + segundo);

    firebase.database().ref("ultimasJogadas").push(jogada + " - " + time);
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

  this.armazenarDados(resultado);

}

  render(){
    return(
      <View style={styles.containerPrincipal}>

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

        <View style={styles.btnVerJogadas}>
          <Button title="Jogadas Anteriores" onPress={() => Actions.jogadas()}/>
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
  },
  btnVerJogadas: {
    justifyContent: 'flex-end',
    flex: 1
  },
  containerPrincipal: {
    flex: 1
  }
});

export default Inicial;
