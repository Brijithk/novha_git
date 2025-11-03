import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const BUTTON_VALUES = [100, 200, 300, 400, 500];

export default function CoinSlider() {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const coinX = useRef(new Animated.Value(0)).current;
  const latestX = useRef(0);

  // Keep track of value without __getValue()
  coinX.addListener(({ value }) => {
    latestX.current = value;
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newX = Math.min(Math.max(0, gestureState.dx + latestX.current), width - 100);
        coinX.setValue(newX);
      },
      onPanResponderRelease: () => {
        if (selectedValue && latestX.current >= width - 120) {
          console.log(`Executing function for ${selectedValue}`);
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {/* White Bar */}
      <View style={styles.bar}>
        <Animated.Image
          {...panResponder.panHandlers}
          source={require("../assets/images/magichat.png")}
          style={[styles.coin, { transform: [{ translateX: coinX }] }]}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        {BUTTON_VALUES.map((val) => (
          <TouchableOpacity
            key={val}
            style={[
              styles.button,
              selectedValue === val && styles.selectedButton,
            ]}
            onPress={() => setSelectedValue(val)}
          >
            <Text style={styles.buttonText}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  bar: {
    height: 60,
    backgroundColor: "#eee",
    borderRadius: 10,
    justifyContent: "center",
    overflow: "hidden",
  },
  coin: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 0,
    bottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
