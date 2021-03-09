import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import WebView from "react-native-webview";

const { width } = Dimensions.get("window");

export default function ScannerBarCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
  };

  const resetData = () => {
    setScanned(false);
    setData(null);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {!scanned && (
        <View
          style={{
            flex: 5,
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "50%",
          }}
        >
          <Text style={{ color: "#000", fontSize: 20 }}>Imagem ou texto</Text>
        </View>
      )}
      {scanned && (
        <View style={{ flex: 5 }}>
          <WebView
            source={{ uri: data }}
            style={{ marginTop: 20, width: "100%" }}
          />
          <TouchableOpacity onPress={resetData} style={styles.button}>
            <Text
              style={{
                color: "#FFF",
                fontSize: 20,
              }}
            >
              Ler outro QRCode
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[styles.container]}
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
    </View>
  );
}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: "column",
  },
  button: {
    width: "90%",
    height: 50,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 5,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
    backgroundColor: "#0F0F0F",
    textAlign: "center",
    position: "absolute",
    bottom: 1,
    left: 20,
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 3,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 3,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
});
