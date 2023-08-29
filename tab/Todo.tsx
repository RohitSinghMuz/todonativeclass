import React, {Component} from 'react';
import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';

interface IState {
  text: string;
  data: {text: string}[];
  isEditData: null | number;
  idEdit: boolean;
}

interface IProps {}

export class Todo extends Component<IProps, IState> {
  state = {
    text: '',
    data: [],
    isEditData: null,
    idEdit: false,
  };

  addData = () => {
    const newItem = {
      text: this.state.text,
    };

    this.setState(prevState => ({
      data: [...prevState.data, newItem],
      text: '',
      idEdit: true,
    }));
  };

  deleteItem = (idx: number) => {
    const updatedData = this.state.data.filter((_, index) => idx !== index);
    this.setState({
      data: updatedData,
    });
  };

  editData = (obj: any, idx: number) => {
    this.setState({
      isEditData: idx,
      text: obj.text,
    });
  };

  addEditData = () => {
    this.setState({idEdit: true});
    const {isEditData, text, data} = this.state;
    if (isEditData !== null) {
      const updatedData = [...data];
      updatedData[isEditData].text = text;
      this.setState({
        data: updatedData,
        text: '',
        isEditData: null,
      });
    }
  };

  render() {
    return (
      <View style={{width: '30%', margin: 10}}>
        <Text style={{fontSize: 20, marginBottom: 10}}>Todoclass</Text>
        <TextInput
          placeholder="Enter Text"
          style={{
            width: 300,
            padding: 10,
            margin: 10,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={text => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity onPress={this.addData}>
          <Text>Add Text</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.addEditData}>
          <Text
            style={[
              {color: 'grey', paddingTop: 40},
              {display: this.state.idEdit == true ? 'flex' : 'none'},
            ]}>
            Edit Submitt
          </Text>
        </TouchableOpacity>

        {this.state.data.map((item, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Text
              onPress={() => this.deleteItem(idx)}
              style={{marginRight: 10, color: 'red'}}>
              Delete
            </Text>
            <Text>{item.text}</Text>
            <Text
              onPress={() => this.editData(item, idx)}
              style={{marginLeft: 10, color: 'blue'}}>
              Edit
            </Text>
          </View>
        ))}
      </View>
    );
  }
}

export default Todo;
