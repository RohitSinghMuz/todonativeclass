import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import Home from '../tab/Home';
import {render, fireEvent, act} from '@testing-library/react-native';
import {jest} from '@jest/globals';

jest.mock('@react-navigation/bottom-tabs', () => {
  return jest.fn();
});

describe('signup testing', () => {
  it('renders correctly', () => {
    renderer.create(<Home />);
  });
  test('Should apply the value when changing text', () => {
    const handleSubmit = jest.fn();
    const {getByTestId} = render(<Home />);
    const selectBtn = getByTestId('handleListId');
    console.log('selectBtn----', selectBtn.props.renderItem());
    //fireEvent.press(saveBtn);
  });
});
