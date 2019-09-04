import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const pedra = require('../../imagens/pedra.png');
const papel = require('../../imagens/papel.png');
const tesoura = require('../../imagens/tesoura.png');

class Icone extends Component{
  render(){

    if (this.props.escolhaResultado == 'Pedra'){

      return(
        <View style={styles.icone}>
          <Text style={styles.txtJogador}> {this.props.jogador} </Text>
          <Image source={pedra} />
        </View>
      );

    }else if (this.props.escolhaResultado == 'Papel'){

      return(
        <View style={styles.icone}>
          <Text style={styles.txtJogador}> {this.props.jogador} </Text>
          <Image source={papel} />
        </View>
      );

    }else if (this.props.escolhaResultado == 'Tesoura'){

      return(
        <View style={styles.icone}>
          <Text style={styles.txtJogador}> {this.props.jogador} </Text>
          <Image source={tesoura} />
        </View>
      );

    }else{

      return false;

    }
  }
}

const styles = StyleSheet.create({
  icone: {
    alignItems: 'center',
    marginBottom: 20
  },
  txtJogador: {
    fontSize: 18
  }
});

export default Icone;
