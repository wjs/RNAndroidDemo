import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import { NativeModules } from 'react-native'

class CNode extends React.Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
    this.state = {
      refreshing: false,
      page: 1,
      data: [],
      dataSource: ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh() {
    this.setState({
      refreshing: true,
      page: 1
    }, () => {
      this.getList()
    })
  }
  
  onLoadMore() {
    this.setState({
      refreshing: true,
      page: this.state.page + 1
    }, () => {
      this.getList()
    })
  }

  getList() {
    fetch('https://cnodejs.org/api/v1/topics?page=' + this.state.page)
    .then(res => res.json())
    .then(res => {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
      let tmpData
      if (this.state.page > 1) {
        tmpData = this.state.data.concat(res.data)
      } else {
        tmpData = res.data
      }
      this.setState({
        refreshing: false,
        data: tmpData,
        dataSource: ds.cloneWithRows(tmpData)
      })
    })
  }

  goDetail(itemId) {
    NativeModules.CustomUIManager.openView('CNodeDetail', itemId)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigTitle}>Node.js 中文社区</Text>
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData) => {
            return (
              <TouchableOpacity key={rowData.id} onPress={() => this.goDetail(rowData.id)}>
                <View style={styles.card}>
                  <Image style={styles.avatar} source={{ uri: rowData.author.avatar_url }} />
                  <Text style={styles.title}>{rowData.title}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
          onEndReached={() => this.onLoadMore()}
        />
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bigTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  card: {
    flex: 1, 
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  avatar: {
    width: 50,
    height: 50,
  },
  title: {
    flex: 1,
    padding: 5,
    fontSize: 18,
  }
});

export default CNode