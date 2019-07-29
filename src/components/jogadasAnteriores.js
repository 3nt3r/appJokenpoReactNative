import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import firebase from 'firebase';

class Jogadas extends Component{

  constructor(props){
    super(props);
    this.state = {
      dados: []
    }
  }

  componentWillMount(){
    firebase.database().ref("ultimasJogadas").on('value', (snapshot) => {
      this.setState({dados: Object.values(snapshot.val())});
    });
  }

  render(){
    return(
      <View>
        <FlatList
          data={this.state.dados}
          extraData={this.state}
          renderItem={({item}) =>
            <View style={styles.container}>
              <Text style={styles.jogadas}> {item} </Text>
            </View>
          }
        />
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
