import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import HTMLView from 'react-native-htmlview'

class CNodeDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: null
    }
  }

  componentDidMount() {
    const id = this.props.initialProps
    if (id) {
      this.getDetail(id)
    }
  }

  getDetail(id) {
    this.setState({ loading: true })
    fetch(`https://cnodejs.org/api/v1/topic/${id}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ 
        loading: false,
        data: res.data 
      })
    })
  }

  render() {
    const { loading, data } = this.state
    let loadingPart
    let noResultPart
    let pageContent
    if (data) {
      pageContent = (
        <ScrollView>
          <View style={styles.card}>
            <Image style={styles.avatar} source={{ uri: data.author.avatar_url }} />
            <Text style={styles.title}>{data.title}</Text>
          </View>
          <View style={[styles.card, styles.contentCard]}>
            <HTMLView value={data.content} stylesheet={styles}></HTMLView>
          </View>
        </ScrollView>
      )
    } else if (loading) {
      loadingPart = <ActivityIndicator />
    } else {
      noResultPart = <Text style={styles.hello}>没有找到该页面！</Text>
    }
    return (
      <View style={styles.container}>
        {loadingPart}
        {noResultPart}
        {pageContent}
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  },
  contentCard: {
    padding: 15,
  }
});

export default CNodeDetail