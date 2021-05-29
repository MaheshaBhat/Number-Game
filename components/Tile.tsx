import React from "react";
import {
  View,
  Dimensions,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import useHistory from "../hooks/useHistory";

export const size = Dimensions.get("window").width / 4;

interface tileProps {
  index: number;
  onPress: () => void;
  progress: Animated.SharedValue<number>;
  number: number;
  show: boolean;
}

export default function Tile({
  index,
  number,
  onPress,
  progress,
  show,
}: tileProps) {
  const oldIndex = useHistory(index);

  const translateX = interpolate(
    progress.value,
    [0, 1],
    [(oldIndex % 3) * size, (index % 3) * size]
  );

  const translateY = interpolate(
    progress.value,
    [0, 1],
    [Math.floor(oldIndex / 3) * size, Math.floor(index / 3) * size]
  );

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(translateX, { duration: 300 }),
      },
      { translateY: withTiming(translateY, { duration: 300 }) },
    ],
  }));

  return (
    // <Pressable
    //   style={({ pressed }) => [
    //     {
    //       backgroundColor: pressed ? '#000' : 'white',
    //     },
    //   ]}
    //   onPress={onPress}>
    //   {({ pressed }) => (
    //     <Animated.View style={[styles.tileStyle, transformStyle]}>
    //       <Text style={{ fontSize: size / 2, color: '#fff' }}>
    //         {!pressed && show ? number : ''}
    //       </Text>
    //     </Animated.View>
    //   )}
    // </Pressable>

    <Animated.View style={[styles.tileStyle, transformStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.tileStyle}>
        <Text style={{ fontSize: size / 2, color: "#fff" }}>
          {show ? number : ""}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tileStyle: {
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    ...StyleSheet.absoluteFillObject,
    borderRadius: size,
  },
});
