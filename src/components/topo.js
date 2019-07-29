import React, {Component} from 'react';
import {View, Image} from 'react-native';

const jokenpo = require('../../imagens/jokenpo.png');

class Topo extends Component{
  render(){
    return (
      <View>
        <Image source={jokenpo} />
      </View>
    );
  }
}

export default Topo;
