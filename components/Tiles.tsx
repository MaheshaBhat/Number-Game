import * as React from 'react';
import { Text, View, StyleSheet, Image, Alert, Platform } from 'react-native';
import Animated, {
  withTiming,
  withRepeat,
  runOnJS,
} from 'react-native-reanimated';

import Tile, { size } from './Tile';
import { getInitialTileValues, randomArrayShuffle } from '../utility';

const initialValues = getInitialTileValues();

export default function Tiles() {
  const progress = Animated.useSharedValue(0);
  const count = Animated.useSharedValue(0);
  const [tileValues, setTileValues] = React.useState([
    ...getInitialTileValues(),
  ]);
  const [show, setShow] = React.useState([...initialValues]);

  //-1 uninitialized 0-number picked by user 1-first attempt 2-second attempt 3-attempt
  const [state, setState] = React.useState(-1);
  const selected = React.useRef<number | null>(null);
  const res = React.useRef(false);


  function shuffle() {
    'worklet';
    count.value = 0;
    progress.value = withRepeat(
      withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          const newValues = randomArrayShuffle(tileValues);
          runOnJS(setTileValues)([...newValues]);
          count.value++;
          if (count.value === 5) {
            runOnJS(setShow)([]);
          }
        }
      }),
      10,
      false,
      (finished) => {
        progress.value = withTiming(1, { duration: 300 });
        if (finished) {
          count.value = 0;
          runOnJS(setState)(0);
        }
      }
    );
  }

  React.useEffect(() => {
    if (state === 3 || res.current) {
      const reset = () => {
        res.current = false;
        setState(-1);
        setShow([...initialValues]);
        selected.current = null;
        setTileValues([...getInitialTileValues()]);
        progress.value = 0;
        count.value = 0;
      };
      const showAlert = (message:string) => {
        if (Platform.OS === 'web') {
          alert(message);
          reset();
        } else {
          Alert.alert('Result', message, [
            {
              text: 'OK',
              onPress: reset,
              style: 'cancel',
            },
          ]);
        }
      };
      if (res.current) {
        showAlert('You have won the game!!!');
      } else {
        showAlert('Bad luck! Try again!!!');
      }
    }
  }, [state, progress.value, count.value]);

  const onPress = (index:number) => {
    if (state === -1) {
      selected.current = index;
      shuffle();
    } else {
      if (show.indexOf(index) === -1) {
        res.current = selected.current === index;
        setShow([...show, index]);
        setState(state + 1);
      }
    }
  };
  return (
    <>
      <View style={{ padding: 10 }}>
        {state >= 0 && (
          <Text style={{ fontSize: 20 }}>
            {`Selected number is: ${selected.current}`}
          </Text>
        )}
        <Text style={{ fontSize: 20 }}>
          {state >= 0
            ? `You Have ${3 - state} Attempts\nAttempt: ${state + 1}`
            : 'Please Select a Number'}
        </Text>
      </View>
      <View style={styles.container}>
        {initialValues.map((tile, index) => (
          <Tile
            key={index}
            index={tileValues[index]}
            number={tile}
            onPress={() => onPress(tile)}
            progress={progress}
            show={show.includes(tile)}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: size * 3,
    width: size * 3,
  },
});
