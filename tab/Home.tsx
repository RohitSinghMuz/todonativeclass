import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

interface Product {
  id: number;
  category: string;
}

interface HomeState {
  data: Product[];
  currentItemData: {
    category: string;
    image: string;
  };
}

export default class Home extends Component<{}, HomeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      currentItemData: {
        category: '',
        image: '',
      },
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    try {
      const respData = await fetch('https://fakestoreapi.com/products');
      const result: Product[] = await respData.json();
      if (result) {
        this.setState({data: result});
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  handelPassId = (id: number) => {
    let currentItem = this.state.data?.find(item => item.id === id);
    console.log('currentItem --data', currentItem);
    this.setState({currentItemData: currentItem});
  };

  handleItem = (item: Product) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.handelPassId(item.id)}
          testID="itemSecId">
          <Text style={styles.btnStyle}>{item.id}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.log('category---', this.state.data);
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <View style={styles.btnViewStyle}>
          <FlatList
            testID="handleListId"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.data}
            renderItem={({item}) => this.handleItem(item)}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={styles.cardViewStyle}>
          <Image
            style={styles.cardStyle}
            source={{uri: this.state.currentItemData.image}}
          />
          <Text style={styles.categoryStyle}>
            {this.state.currentItemData.category} category
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  btnStyle: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 8,
  },
  btnViewStyle: {
    width: '100%',
    height: 100,
  },
  cardViewStyle: {
    width: '100%',
    height: 500,
    marginHorizontal: 'auto',
    marginVertical: 10,
  },
  cardStyle: {
    width: '100%',
    height: '80%',
    borderRadius: 20,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'poppins',
  },
});
