import * as React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import Tiles from "./components/Tiles";

export default function App() {
  return (
    <View style={styles.container}>
      <Tiles />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
