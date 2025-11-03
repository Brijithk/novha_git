import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Animated,
  StyleSheet,
} from "react-native";
import { Alert } from "react-native"; // ⬅️ add this import

const CouponBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState("");

  const rotateAnim = useRef(new Animated.Value(0)).current; // for arrow rotation
  const heightAnim = useRef(new Animated.Value(0)).current; // for expanding box

  const toggleBox = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(heightAnim, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();

    setIsOpen(!isOpen);
  };

  // Interpolations
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const heightInterpolate = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60], // adjust height when open
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={toggleBox}>
        <View style={styles.leftSection}>
          <Image source={require("../assets/images/coupon.jpg")} style={styles.icon} />
          <Text style={styles.title}>Have a coupon code?</Text>
        </View>
        <Animated.Image
          source={require("../assets/images/down-arrow.png")}
          style={[styles.dropdown, { transform: [{ rotate: rotateInterpolate }] }]}
        />
      </TouchableOpacity>

      {/* Expandable Content */}
      <Animated.View style={[styles.expandBox, { height: heightInterpolate }]}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Coupon code"
            value={coupon}
            onChangeText={setCoupon}
            style={styles.input}
            placeholderTextColor="#888"
          />
        {coupon.trim().length > 0 && (
  <Button
    title="Apply"
    onPress={() => Alert.alert("Coupon Applied", `Applied: ${coupon}`)}
  />
)}

        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    padding: 10,
    margin: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  dropdown: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  expandBox: {
    overflow: "hidden",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: "#000",
  },
});

export default CouponBox;
