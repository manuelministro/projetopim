import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import ScannerBarCode from "./pages/ScannerBarCode";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScannerBarCode />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
