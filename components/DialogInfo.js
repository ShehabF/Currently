import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DialogInfo() {
  const infoPageBg = require("../assets/infoscreen.png");
  return (
    <View style={styles.container}>
      <ImageBackground
        source={infoPageBg}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.text}>
          <Text style={{ color: "#00B132", fontWeight: "bold" }}>
            Currently
          </Text>{" "}
          was created by Shehab Farooqui and published in 2023
        </Text>
        <Text style={styles.text}>
          Currently was built using React Native{" "}
          <Ionicons name="logo-react" color="#FFFFFF" size={25} /> and
          JavaScript{" "}
          <Ionicons name="logo-javascript" color="#FFFFFF" size={25} />{" "}
        </Text>
        <Text style={styles.text}>
          Currently utilizes the{" "}
          <Text
            style={styles.hyperlink}
            onPress={() => {
              Linking.openURL("https://www.exchangerate-api.com/");
            }}
          >
            ExchangeRate-API
          </Text>{" "}
          to obtain up to date exchange rates
        </Text>
        <Text style={styles.text}>
          A special thank you to my wife Zarah for encouraging and supporting
          me!
        </Text>
      </ImageBackground>
    </View>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    height: height,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  hyperlink: {
    color: "#00B132",
    textDecorationLine: "underline",
    textDecorationColor: "#00B132",
  },
});
