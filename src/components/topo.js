import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const jokenpo = require('../../imagens/jokenpo.png');

class Topo extends Component{
  render(){
    return (
        <View>
          <Text style={styles.informativo}> React Native </Text>
          <Image source={jokenpo} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  informativo: {
    fontSize: 15,
    textAlign: 'center',
    color: '#1E90FF',
    fontWeight: 'bold'
  }
});

export default Topo;
