import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Vibration, ToastAndroid} from 'react-native';
import {Actions} from 'react-native-router-flux';

import firebase from 'firebase';
import moment from 'moment';

import Topo from './topo.js';
import Icone from './icone.js';

class Inicial extends Component{

  constructor(props){
    super(props);
    this.state = {
      escolhaUsuario: '',
      escolhaComputador: '',
      resultadoJogo: '',
      primeiroTempoCarregamento: 0,
      contador: 1
    }
  }

  componentWillMount(){
    let data = moment().utcOffset('-03:00').format('HH:mm:ss:SSS');
    let tempos = data.split(":");

    let minutosParaMilissegundos = parseInt(tempos[2]) * 1000;
    let milissegundos = parseInt(tempos[3]);

    let soma = minutosParaMilissegundos + milissegundos;

    this.setState({primeiroTempoCarregamento: parseInt(soma)});

    var firebaseConfig = {

    };
    firebase.initializeApp(firebaseConfig);
  }

  componentDidMount(){
    let data = moment().utcOffset('-03:00').format('HH:mm:ss:SSS');
    let tempos = data.split(":");

    let minutosParaMilissegundos = parseInt(tempos[2]) * 1000;
    let milissegundos = parseInt(tempos[3]);

    let segundoTempoCarregamento = minutosParaMilissegundos + milissegundos;

    let resultado = segundoTempoCarregamento - this.state.primeiroTempoCarregamento;

    ToastAndroid.show("Carregado em: " + resultado.toString() + "ms", ToastAndroid.LONG);
  }

  armazenarDados(jogada){
    let data = moment().utcOffset('-03:00').format('DD/MM HH:mm:ss');
    firebase.database().ref("ultimasJogadas").push(jogada + " - Data: " + data + " - (R)");
  }

  jokenpo = (escolha) => {

    let incrementa = this.state.contador + 1;
    this.setState({contador: incrementa});
    ToastAndroid.show("Jogada Nº " + this.state.contador.toString(), ToastAndroid.LONG);

    this.setState({escolhaUsuario: escolha});

    var escolhaComputador = Math.floor(Math.random() * 3);

    var resultado = '';

    if (escolhaComputador == 0){
      this.setState({escolhaComputador: 'Pedra'});
    }else if (escolhaComputador == 1){
      this.setState({escolhaComputador: 'Papel'});
    }else{
      this.setState({escolhaComputador: 'Tesoura'});
    }

    if (escolhaComputador == 0) {
      if (escolha == 'Pedra') {
        resultado = 'Empate';
      }else if (escolha == 'Papel') {
        resultado = 'Você Venceu';
      }else{
        resultado = 'Você Perdeu';
      }
    }

    if (escolhaComputador == 1) {
      if (escolha == 'Pedra') {
        resultado = 'Você Perdeu';
      }else if (escolha == 'Papel') {
        resultado = 'Empate';
      }else{
        resultado = 'Você Venceu';
      }
    }

    if (escolhaComputador == 2) {
      if (escolha == 'Pedra') {
        resultado = 'Você Venceu';
      }else if (escolha == 'Papel') {
        resultado = 'Você Perdeu';
      }else{
        resultado = 'Empate';
      }
    }

    this.setState({resultadoJogo: resultado});

    this.armazenarDados(resultado);

    if(resultado == 'Você Venceu'){
      Vibration.vibrate(500);
    }

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
          <Button title="Últimas Jogadas" onPress={() => Actions.jogadas()}/>
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
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default Inicial;
