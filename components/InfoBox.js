import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment/moment";

export default function InfoBox({
  userCurrencyCode,
  conversionCurrencyCode,
  exchangeRate,
  setIsInfoModalVisible,
  fetchData,
}) {
  const [currentDate, setCurrentDate] = useState("");

  const formattedExchangeRate = parseFloat(exchangeRate).toFixed(2);

  const spinValue = useState(new Animated.Value(0))[0];

  const spinDeg = spinValue.interpolate({
    useNativeDriver: true,
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedScaleStyle = {
    transform: [{ rotate: spinDeg }],
  };

  const onPressIn = () => {
    Animated.spring(spinValue, {
      toValue: 1,
      useNativeDriver: false,
    }).start();

    var date = moment().utcOffset("+02:00").format("DD/MM/YYYY hh:mm:ss A");
    setCurrentDate(date);
    fetchData();
  };

  const onPressOut = () => {
    Animated.spring(spinValue, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    var date = moment().utcOffset("+02:00").format("DD/MM/YYYY hh:mm:ss A");
    setCurrentDate(date);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsInfoModalVisible(true);
          }}
        >
          <Ionicons
            name="information-circle-outline"
            color="#FFFFFF"
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={{ color: "#00B132", paddingBottom: 5 }}>
          {currentDate}
        </Text>
        <Text style={{ color: "#FFFFFF" }}>
          1 {userCurrencyCode} = {formattedExchangeRate}{" "}
          {conversionCurrencyCode}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut}>
          <Animated.View style={animatedScaleStyle}>
            <Ionicons name="refresh" color="#FFFFFF" size={25} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  infoContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
});
