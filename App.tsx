import React, {useRef, useState} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Easing,
  Text,
  Dimensions,
} from 'react-native';
import {transformer} from './metro.config';

const App = () => {
  let valueRight = useRef(new Animated.Value(0)).current;

  const windowHeight = Dimensions.get('window').height;

  const positionInterpolate = valueRight.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -windowHeight + 100, 0],
    extrapolate: 'clamp',
  });
  const moveBall = () => {
    Animated.sequence([
      Animated.timing(valueRight, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(valueRight, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {});
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'red',
            transform: [{translateY: positionInterpolate}],
          },
        ]}
      />
      <TouchableOpacity onPress={moveBall}>
        <Text>Hey Click ME</Text>
      </TouchableOpacity>
    </View>
  );
};
export default App;
