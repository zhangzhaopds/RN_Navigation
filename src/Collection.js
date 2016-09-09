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

export default class Collection extends Component {
  constructor(props) {
    super(props);

  }

  _analyseBtn() {
    console.log('分析');
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


});
