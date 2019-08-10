import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase';

class Jogadas extends Component{

  constructor(props){
    super(props);
    this.state = {
      dados: [],
      loaded: false
    }
  }

  componentWillMount(){
    firebase.database().ref("ultimasJogadas").once("value", (snapshot) => {
      if(snapshot.val() == null){
        this.setState({dados: Object.values(["Nenhuma jogada encontrada."]), loaded: true});
      }else{
        this.setState({dados: Object.values(snapshot.val()), loaded: true});
      }
    });
  }

  renderizaJogadas({item}){
    return(
      <View style={styles.container}>
        <Text style={styles.jogadas}> {item} </Text>
      </View>
    );
  }

  renderPrincipal(){
    if (this.state.loaded){
      return(
        <View>
          <FlatList
            data={this.state.dados}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => this.renderizaJogadas({item})}
          />
        </View>
      );
    }else{
      return(
        <View>
          <ActivityIndicator size="large" color="#1E90FF" />
        </View>
      );
    }
  }

  render(){
    return(
      <View>
        {this.renderPrincipal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  jogadas: {
    fontSize: 15
  },
  container: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc"
  }
});

export default Jogadas;
