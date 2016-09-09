import React, {Component} from 'react';
import {
  View,
  Navigator,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';

import Home from './Home';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: ''
    };
  }
  _pressButton() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.pop();
    }
  }
  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>账号</Text>
          <TextInput
            style={styles.inputText}
            placeholder={'请输入账号'}
            onChangeText={account => this.setState({account})} />
        </View>
        <TouchableOpacity onPress={this._pressButton.bind(this)}>
            <Text style={styles.nextPageBtn}>点我跳转</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginTop: 64,
    backgroundColor: 'green',
    flexDirection: 'row'
  },
  title: {
    paddingTop: 20,
    paddingLeft: 20,
    textAlign: 'center',
    color: 'white'
  },
  inputText: {
    marginTop: 10,
    marginLeft: 10,
    height: 30,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  nextPageBtn: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 20
  }
})
