import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

class Icone extends Component{
  render(){
    if (this.props.escolhaResultado == 'Pedra'){
      return(
        <View style={styles.icone}>
          <Text style={styles.txtJogador}> {this.props.jogador} </Text>
          <Image source={require('../../imagens/pedra.png')} />
        </View>
      );
    }else if (this.props.escolhaResultado == 'Papel'){
      return(
        <View style={styles.icone}>
          <Text style={styles.txtJogador}> {this.props.jogador} </Text>
          <Image source={require('../../imagens/papel.png')} />
        </View>
      );
    }else if (this.props.escolhaResultado == 'Tesoura'){
      return(
        <View style={styles.icone}>
          <Text style={styles.txtJogador}> {this.props.jogador} </Text>
          <Image source={require('../../imagens/tesoura.png')} />
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
