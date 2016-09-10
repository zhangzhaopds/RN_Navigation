import React, {Component} from 'react';
import {
  View,
  Navigator,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';




export default class Calculator extends Component {
  constructor(props) {
    super(props);
    console.log('支付通道： '+this.props.payChannel);
    this.state = {
      account: ''
    };
  }
  _pressButton() {
    global.navi.pop();
  }
  render() {
    return (
      <View style={{backgroundColor: 'gray', flex: 1}}>

        <TouchableOpacity onPress={this._pressButton.bind(this)}>
            <Text style={styles.nextPageBtn}>点我返回</Text>
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
