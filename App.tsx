import React, {useState} from 'react';
import {View, Animated, TouchableOpacity, Easing, Text} from 'react-native';

const App = () => {
  const value = useState(new Animated.ValueXY({x: 0, y: 0}))[0];

  const moveBall = () => {
    Animated.timing(value, {
      toValue: {x: 100, y: 100},
      easing: Easing.back(0),
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View style={value.getLayout()}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'red',
          }}
        />
        <TouchableOpacity onPress={moveBall}>
          <Text>Hey Click ME</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
export default App;
