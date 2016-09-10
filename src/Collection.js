import React, {Component} from  'react';
import {
  TouchableOpacity,
  View,
  Text,
  Navigator,
  StatusBar,
  TabBarIOS,
  StyleSheet,
  Image,
} from 'react-native';

import Calculator from './Calculator';

export default class Collection extends Component {
  constructor(props) {
    super(props);

  }

  _analyseBtn() {
    console.log('分析');
  }

  _payChannelBtn(channel: number) {
    console.log(channel);
  }
  _payChannelWxBtn() {
    console.log('微信');
    global.navi.push({
      name: 'Calculator',
      component: Calculator,
      params: {
        payChannel: 'TX_WXZF',
      }
    })

  }
  _payChannelZfbBtn() {
    console.log('支付宝');
    global.navi.push({
      name: 'Calculator',
      component: Calculator,
      params: {
        payChannel: 'TX_ZFB',
      }
    })
  }
  _payChannelYzfBtn() {
    console.log('翼支付');
    global.navi.push({
      name: 'Calculator',
      component: Calculator,
      params: {
        payChannel: 'TX_YZF',
      }
    })

  }
  _payChannelBdqb() {
    console.log('百度钱包');
    global.navi.push({
      name: 'Calculator',
      component: Calculator,
      params: {
        payChannel: 'TX_BDQB',
      }
    })
  }

  render() {
    return (
      <View style={[styles.tabContent, {backgroundColor: 'white'}]}>
        <StatusBar barStyle='light-content'/>
        <Image source={require('./img/home/bj@2x.png')}
            style={{width: global.screenWidth,
            height: global.screenHeight-48,
            alignItems: 'center'}}>

            <View style={styles.logoView}>
              <Image source={require('./img/home/logo@2x.png')}
              style={{marginLeft: global.screenWidth/2-42,width: 84}}/>
              <TouchableOpacity onPress={this._analyseBtn.bind(this)}>
                <Image source={require('./img/home/icon_tongji@2x.png')}
              style={{marginLeft: global.screenWidth/2-82}}/>
              </TouchableOpacity>
            </View>

            <Text style={styles.totalAmount}>32232.08</Text>
            <Text style={styles.dayLabel}>当日收款(元)</Text>
            <View style={{marginTop: 20,
              flexDirection: 'row',
              height: 50 * global.screenHeightRate }}>
              <View style={{flexDirection: 'row', width: global.screenWidth/4}}>
                <View style={{alignItems: 'center', width: global.screenWidth/4}}>
                  <Text style={styles.titleLabel}>微信</Text>
                  <Text style={styles.contentLabel}>1234.43</Text>
                </View>
                <View style={styles.whiteLine}>
                </View>
              </View>

              <View style={{flexDirection: 'row', width: global.screenWidth/4}}>
                <View style={{alignItems: 'center', width: global.screenWidth/4}}>
                  <Text style={styles.titleLabel}>支付宝</Text>
                  <Text style={styles.contentLabel}>1234.43</Text>
                </View>
                <View style={styles.whiteLine}>
                </View>
              </View>

              <View style={{flexDirection: 'row', width: global.screenWidth/4}}>
                <View style={{alignItems: 'center', width: global.screenWidth/4}}>
                  <Text style={styles.titleLabel}>翼支付</Text>
                  <Text style={styles.contentLabel}>1234.43</Text>
                </View>
                <View style={styles.whiteLine}>
                </View>
              </View>

              <View style={{flexDirection: 'row', width: global.screenWidth/4}}>
                <View style={{alignItems: 'center', width: global.screenWidth/4}}>
                  <Text style={styles.titleLabel}>百度钱包</Text>
                  <Text style={styles.contentLabel}>1234.43</Text>
                </View>
              </View>

            </View>
            <View style={{backgroundColor: '#eeeeee',
                width: global.screenWidth, height: 0.3,
                marginTop: 60}}/>
            <View style={{flex: 1, width: global.screenWidth,}}>
              <View style={styles.subBgView}>
                <View style={styles.imageView}>
                  <TouchableOpacity onPress={this._payChannelWxBtn}>
                    <Image source={require('./img/home/5.5mainwx@2x.png')}
                style={styles.payImage}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.lineOne}/>
                <View style={styles.imageView}>
                  <TouchableOpacity onPress={this._payChannelZfbBtn}>
                    <Image source={require('./img/home/5.5mainzfb@2x.png')}
                style={styles.payImage}/>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{backgroundColor: '#eeeeee',
                  width: global.screenWidth, height: 0.3,}}/>
              <View style={styles.subBgView}>
                <View style={styles.imageView}>
                  <TouchableOpacity onPress={this._payChannelYzfBtn}>
                    <Image source={require('./img/home/5.5mainyzf@2x.png')}
                            style={styles.payImage}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.lineOne}/>

                <View style={styles.imageView}>
                  <TouchableOpacity onPress={this._payChannelBdqb}>
                    <Image source={require('./img/home/5.5mainbdqb@2x.png')}
                            style={styles.payImage}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </Image>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  waterImage: {
    width: global.screenWidth,
    height: 200,
    alignItems: 'center',
  },
  logoView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    height: 44
  },
  totalAmount: {
    color: 'white',
    fontSize: 30,
    marginTop: 36,
    backgroundColor: 'transparent',
  },
  dayLabel: {
    color: 'white',
    fontSize: 15,
    marginTop: 5,
    backgroundColor: 'transparent',
  },
  titleLabel: {
    backgroundColor: 'transparent',
    marginTop: 10,
    color: 'white',
  },
  contentLabel: {
    backgroundColor: 'transparent',
    marginTop: 10,
    color: '#f3d5cd',
    fontSize: 12
  },
  whiteLine: {
    backgroundColor: 'white',
    width: 0.5,
    height: 20,
    marginTop: 20
  },
  subBgView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  payImage: {
    width: 185/2,
    height: 185/2
  },
  lineOne: {
    backgroundColor: '#eeeeee',
    width: 0.3,
    height: 170,
  },

  imageView: {
    flex: 1,
    alignItems: 'center',
  },


});
