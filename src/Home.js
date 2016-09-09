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

import Main from './Main';
import Collection from './Collection';

export default class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'first',
    };
  }
  pressButton() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.push({
        name: 'Main',
        component: Main,
      });
    }
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
      <TabBarIOS
        tintColor='#ec594e'
        unselectedTintColor='gray'>
        <TabBarIOS.Item
          title='收款'
          icon={require('./img/home/icon_shoukuan@2x.png')}
          selected={this.state.selectedTab === 'first'}
          onPress={() => {
            this.setState({
              selectedTab: 'first',
            });
          }}
        >
        <Collection/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='账单'
          icon={require('./img/home/iconfont_zhangdan@2x.png')}
          selected={this.state.selectedTab === 'second'}
          onPress={() => {
            this.setState({
              selectedTab: 'second',
            });
          }}
        >
        <Main/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./img/home/icon_saoyisao@2x.png')}
          selected={this.state.selectedTab === 'third'}
          onPress={() => {
            this.setState({
              selectedTab: 'third',
            });
          }}
        >
        <Collection/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='消息'
          icon={require('./img/home/iconfont_xiaoxi@2x.png')}
          selected={this.state.selectedTab === 'fourth'}
          onPress={() => {
            this.setState({
              selectedTab: 'fourth',
            });
          }}
        >
        <Collection/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='我的'
          icon={require('./img/home/iconfont_wode@2x.png')}
          selected={this.state.selectedTab === 'fifth'}
          onPress={() => {
            this.setState({
              selectedTab: 'fifth',
            });
          }}
        >
        <Main/>
        </TabBarIOS.Item>


      </TabBarIOS>
    );
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
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});
