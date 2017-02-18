/**
Basic React Native Websocket Communication
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import Dimensions from 'Dimensions';

import SocketIoClient from 'socket.io-client';

const images = [
    "https://c1.staticflickr.com/2/1508/25134407566_450cc45921_b.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Project_Mercury_Astronauts_-_GPN-2000-000651.jpg/480px-Project_Mercury_Astronauts_-_GPN-2000-000651.jpg"
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    flex: 2,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  touchArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    flex: 0,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    padding:50
  }
});

export default class client extends Component {
  constructor(props){
    super(props);

    this.state = {
        image : 0,

        position: {
          x: 0,
          y: 0
        },

        message: 'listening'
    }

    this.socket = SocketIoClient('http://localhost:3000');

    this.socket.on('connected', (message) => {
      this.setState({ message: message });
    });

    this.socket.on('output', (output) => {
      this.setState({
                message: output,
                image: output % 2
       });
    });

  }

  action(event){
    this.setState({
      position: {
        x: event.nativeEvent.locationX,
        y: event.nativeEvent.locationY
      }
    })

    this.socket.emit('input', this.state.position);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
                  onPress={this.action.bind(this)}
                  style={styles.touchArea}>
          <Image  source={{url: images[this.state.image]}}
                  style={styles.image}>
            <Text style={styles.text}>{this.state.message}</Text>
          </Image>
        </TouchableHighlight>
      </View>
    );
  }
}

AppRegistry.registerComponent('client', () => client);
