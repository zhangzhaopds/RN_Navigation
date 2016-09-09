import React, {Component} from 'react';
import Storage from 'react-native-storage';
import {
  View,
  Text,
  Navigator,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  WebView,
  Linking,
  NativeModules,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  StatusBar,
} from 'react-native';


import Home from './Home';


var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,

})
global.storage = storage;
global.screenWidth = Dimensions.get('window').width;
global.screenHeight = Dimensions.get('window').height;
global.screenWidthRate = Dimensions.get('window').width / 375.0;
global.screenHeightRate = Dimensions.get('window').height / 667.0;

export default class Login  extends Component{
  constructor(props) {
    super(props);

    this.state = {

      userName: '',
      userPassword: '',
      encryptedString: '',
      decryptedString: '',
      kTxPublicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRQQsbZk8RIMR9OBzMdbJpvC4LPWGv8RCt44qkZ4JhFw3QOn8zbi2o4EB4sHG+YzdC5k+eE9oYuABQgNgWkpPa8ZK6Mo6nDfvjpWkxrQT71rO8BdN2H2T5SJIIIopeuUvEUBO5r+NOXuUlM+T/3xqZoiMuEOQ6Fy/HFd1EKT0nlwIDAQAB',
      kTxPrivateKey: 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBANFBCxtmTxEgxH04HMx1smm8Lgs9Ya/xEK3jiqRngmEXDdA6fzNuLajgQHiwcb5jN0LmT54T2hi4AFCA2BaSk9rxkroyjqcN++OlaTGtBPvWs7wF03YfZPlIkggiil65S8RQE7mv405e5SUz5P/fGpmiIy4Q5DoXL8cV3UQpPSeXAgMBAAECgYBBT6LO13zgJLEPQD9E1YttEw3v9iWSS5RgIb/5FlGMSizGjCt9eusHZY7Z3IBz4vWxjL7W4O1Wf7+hYMWRLgi1YVlrRO4wp+MLA0RDgVLlRYfKN31D6uHf+h9W9CihEnAQHV1QdctKAuxhDEaHDkqFKno3jsn9hyFGxp2xTHY7OQJBAP0AW7MCrRAUl+h7XPsJ/MivUGi2zI7kmc7lh26zYJyMS18arWrVX1pTMVKsp4eR+8jO5oajmp+FODWID4s3K9UCQQDTu/Mc3t7R91RFARHWaEwbIewKwJUWbhcDCZ2Odj8kDh/AiImr5UYiUGXiwJUOSXvbg7yobrNAqf8AhCn3ABe7AkEA9geKJOteRnvwOXj1s35D3xh1Nk9FX1O4qrUUXbd8JOBdT0/PAkwanOi31zDk/XYeBmoFTTr921Cel5gHnZb6PQJABF/bs/r+y4O6n/pXrgBVojHfOJGmAuKfYxatxKW4xDvueAHaJk0EV+0lTbwA2Fy4TF66ZRh0Z5+bfx076Lh9xQJBAJHU5Tdlg+B1dNuTbghQtcPMhl6LIEhgQUn9O0flVI2nF9Uoljfi16Jm2KRJNOH/KIjB5Ed1jGzmNQMtCWem6fs=',
      kMisPrivateKey: "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAN4tyjH/MynTlJKTES645ZorK7usi/iKgT3G+hsXkSn3+FF+7fRZ+bgEjhU+gg2EFwVDz0i6K1l6T0V9QLAweStDZTr0qUgFDiG8K4tTyxRoPylGuk+5pwuosxQnmprRlP9Ozqw1G/wSb2iSZDUN2uCbUhWjv21NfO6uPIKD8MlNAgMBAAECgYBp+bVkO7IP1VgcwgGEI7WA3+6wShFJr+cNrIdHvOoE9r5/QOgHkZNHbwTGpVYrVEIWxM1uhz5+I5UENEZSxAxG7whq6+n/40Ly3aLP8Q7fmcY+pOTb1gyTHBEStzsy84fjwkCJcCu4zwV+EDQ67vu9XU7ftsydKMjE2p5swmDUgQJBAPILlMb6J4V+BkcdJVez34aB8//9QFG0zR45+4N9qGxbzasEgEcTcZBikSiEWtq2K8kg90wPzac+tH1ptSmMYZkCQQDq/P6vwbO7plUKSScGnZKQIABY4+eU86S007apLMA4pmFqXQatwOzS2BfNC5+aX4k2VGPXHC6wpOihJ6Yzh13VAkEA73W/sf8ofGwKv+441ISS3prQj/C34l3SFFZe217E8rb8SXZBho/Y6XRqkcAntntF5Ezl++0ik5R4sh6TaVCF+QJASgN5rJ4UIEyZiG3WDu1elmqd8WGHNZEwFYyBgfOIb89n63p1ehDEBvztMjYxBQyGSUh3Ue+cfSLT6r50SNKgKQJAYHlGPNTFmmpcyxmsoTczn5/bJQMoWo0LKJSma+mAMv7INKJqPbggmykG4RMXRJMx5e4Oek0F4s8OfV3R0v5u/A==",
      kMisPublicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDeLcox/zMp05SSkxEuuOWaKyu7rIv4ioE9xvobF5Ep9/hRfu30Wfm4BI4VPoINhBcFQ89IuitZek9FfUCwMHkrQ2U69KlIBQ4hvCuLU8sUaD8pRrpPuacLqLMUJ5qa0ZT/Ts6sNRv8Em9okmQ1Ddrgm1IVo79tTXzurjyCg/DJTQIDAQAB",

      animating: false,
    };
  }

  startActivityAnimating() {
    this.setState({animating: true});
  }

  stopActivityAnimating() {
    this.setState({animating: false});
  }


  // 先加密，后登陆
  _encryptPassWord() {

    // 开始活动指示器
    this.startActivityAnimating();

    let TXRSAHandler = require('react-native').NativeModules.TXRSAHandler;

    // 加密
    TXRSAHandler.ocImportPublicKey(this.state.kTxPublicKey, this.state.userPassword);
    TXRSAHandler.ocEncryptedResult((error, events) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({encryptedString: events[0]});
        console.log('加 '+this.state.encryptedString);
        // 调用登陆
        this._pressLoginBtn();
      }
    })
  }

  // 登陆
  _pressLoginBtn() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.resetTo({
        name: 'Home',
        component: Home,
      })
    }
    /*
    var TXPaySDK = require('react-native').NativeModules.TXPaySDK;
    TXPaySDK.ocInitBaseURL('http://api.tongxingpay.com/txpayApi/app?');
    TXPaySDK.ocInitRSAWithPrivateKey(this.state.kMisPrivateKey, this.state.kTxPublicKey);
    TXPaySDK.ocSubmitRsaRequireParams({"service": "login",
                                        "version": "V1.0",
                                        "userLoginName": this.state.userName,
                                        "passWord": this.state.encryptedString});

    TXPaySDK.ocRequireResult((error, events) => {
      if (error) {
        console.error(error);
      } else {
        fetch(events)
        .then((response) => response.json())
        .then((responseJson) => {
          this.stopActivityAnimating();
          console.log('-------数据开始------');
          console.log(responseJson);
          console.log('-------数据结束------');
          // return responseJson.movies;
          console.log(responseJson['dealCode']);
          if (responseJson['dealCode'] === '10000') {
            console.log('登陆成功');
            let TXRSAHandler = require('react-native').NativeModules.TXRSAHandler;

            // 解密
            TXRSAHandler.ocImportPrivateKey(this.state.kMisPrivateKey, responseJson['MD5key']);
            TXRSAHandler.ocDecryptedResult((error, events) => {
              if (error) {
                console.error(error);
              } else {
                this.setState({encryptedString: events[0]});
                console.log('解密 '+this.state.encryptedString);
                // MD5key保存到本地
                global.storage.save({
                  key: 'userInfo',
                  rawData: {
                    MD5key: this.state.encryptedString,
                    userName: this.state.userName},
                })
              }
            })

          } else {
            Alert.alert(
              '提示',
              responseJson['dealMsg'],
              [
                {text: '确定', onPress: () => console.log('登陆失败')},
              ]
            )
          }
        })
        .catch((error) => {
          this.stopActivityAnimating();
          console.error(error);
          Alert.alert(
            '提示',
            '未知错误，请稍后重试',
            [
              {text: '确定', onPress: () => console.log('登陆失败')},
            ]
          )
        })
      }
    });
    */
  }


  // 立即加盟
  _pressJiamengBtn() {
    Linking.openURL('http://www.tongxingpay.com');
    // global.storage.load({
    //   key: 'userInfo',
    // }).then(ret => {
    //   console.log('本地'+ret.MD5key);
    //   console.log('本地'+ret.userName);
    // }).catch(err => {
    //   console.log('本地错误'+err.message);
    // })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <Image
          style={styles.container}
          source={require('./img/loginbj@2x.png')} >
          <Image
            style={{marginTop: 114 * global.screenHeightRate}}
            source={require('./img/loginlogo@2x.png')} />
          <View style={styles.accountView}>
            <Image source={require('./img/icon_zhanghu@2x.png')}/>
            <Text style={styles.accountText}>账号</Text>
            <TextInput
              style={styles.accountInput}
              placeholder={'请输入账号'}
              clearButtonMode={'while-editing'}
              onChangeText={userName => this.setState({userName})}/>
          </View>
          <View style={styles.whiteLine}/>
          <View style={styles.passWordView}>
            <Image source={require('./img/icon_password@2x.png')}/>
            <Text style={styles.passWordText}>密码</Text>
            <TextInput
              style={styles.passWordInput}
              placeholder={'请输入密码'}
              secureTextEntry={true}
              clearButtonMode={'while-editing'}
              onSubmitEditing={
                this._encryptPassWord.bind(this)}
              onChangeText={
                userPassword => this.setState({userPassword})}/>
          </View>
          <View style={styles.whiteLine}/>
          <ActivityIndicator
            animating={this.state.animating}
            size='large'
            color= 'white'
            style={{paddingTop: 20}}/>
          <TouchableOpacity onPress={this._encryptPassWord.bind(this)}>
            <Image
              style={{marginTop: 10  * global.screenHeightRate}}
              source={require('./img/button_landed-change@2x.png')}/>
          </TouchableOpacity>
          <Text style={styles.noAccount}>没有账号？</Text>
          <TouchableOpacity onPress={this._pressJiamengBtn.bind(this)}>
            <Image style={{marginTop: 20}}
                    source={require('./img/lijijiameng@2x.png')}/>
          </TouchableOpacity>

        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: global.screenWidth,
    height: global.screenHeight,
    alignItems: 'center'
  },
  accountView: {
    flexDirection: 'row',
    marginTop: 81 * global.screenHeightRate,
    height: 40,
    alignItems: 'center'
  },
  accountText: {
    marginLeft: 10,
    fontSize: 20,
    backgroundColor: 'transparent',
    color: '#ffdbd3',
  },
  accountInput: {
    width: 200,
    marginLeft: 10,
    fontSize: 20,
    color: '#ffdbd3'
  },
  whiteLine: {
    backgroundColor: 'white',
    width: 300,
    height: 0.7
  },
  passWordView: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    alignItems: 'center'
  },
  passWordText: {
    marginLeft: 10,
    fontSize: 20,
    backgroundColor: 'transparent',
    color: '#ffdbd3',
  },
  passWordInput: {
    width: 200,
    marginLeft: 10,
    fontSize: 20,
    color: '#ffdbd3'
  },
  noAccount: {
    marginTop: 85 * global.screenHeightRate,
    color: '#d3d3d3',
    fontSize: 18,
    backgroundColor: 'transparent'
  },


});
