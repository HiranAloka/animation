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
  let valueLeft = useRef(new Animated.Value(0)).current;

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const positionInterpolate = valueRight.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -windowHeight + 100, 0],
    extrapolate: 'clamp',
  });

  const positionInterpolateDown = valueLeft.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, windowHeight - 100, 0],
    extrapolate: 'clamp',
  });
  const moveBall = () => {
    Animated.parallel([
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
      ]),
      Animated.sequence([
        Animated.timing(valueLeft, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(valueLeft, {
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return (
    <>
      <View
        style={{
          height: windowHeight,
          width: windowWidth,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
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
        </View>
        <View
          style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
          <Animated.View
            style={[
              {
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                backgroundColor: 'red',
                transform: [{translateY: positionInterpolateDown}],
              },
            ]}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          width: windowWidth,
          height: windowHeight,
        }}>
        <TouchableOpacity onPress={moveBall}>
          <Text>Hey Click ME</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default App;
