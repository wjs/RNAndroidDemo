import React, { Component } from 'react'
import {
  Navigator,
  BackAndroid,
} from 'react-native'
import CNode from './CNode'
import CNodeDetail from './CNodeDetail'

class CNodeRN extends Component {
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => this.handleBackBtn())
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', () => this.handleBackBtn())
  }

  handleBackBtn() {
    const navigator = this.refs.nav
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop()
      return true
    }
    return false
  }

  render() {
    return (
      <Navigator
        ref="nav"
        style={{ flex: 1 }}
        initialRoute={{ }}
        renderScene={(route, navigator) => {
          if (route.key === 'cnode_detail') {
            return <CNodeDetail navigator={navigator} id={route.id} />
          }
          return <CNode navigator={navigator} />
        }}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
      />
    )
  }
}

export default CNodeRN