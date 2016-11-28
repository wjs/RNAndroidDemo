import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator
} from 'react-native'

class CNode extends React.Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
    this.state = {
      loading: false,
      dataSource: ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    this.getList()
  }

  getList() {
    this.setState({
      loading: true
    })
    fetch('https://cnodejs.org/api/v1/topics')
    .then(res => res.json())
    .then(res => {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
      this.setState({
        loading: false,
        dataSource: ds.cloneWithRows(res.data)
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Node.js 中文社区</Text>
        {this.state.loading ? <ActivityIndicator /> : null}
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData) => {
            return (
              <View key={rowData.id} style={styles.card}>
                <Image style={styles.avatar} source={{ uri: rowData.author.avatar_url }} />
                <Text style={styles.title}>{rowData.title}</Text>
              </View>
            )
          }}
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
  hello: {
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