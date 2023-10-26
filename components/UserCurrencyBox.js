import { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";

export default function UserCurrencyBox() {
  const flagIcon = require("../assets/RSAflag.png");

  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={styles.verticalCountryContainer}>
        <Image source={flagIcon} style={styles.countryFlagIcon} />
        <Text style={styles.currencyName}>ZAR</Text>
      </View>

      <TextInput
        style={styles.currencyInput}
        placeholder="000000"
        textAlign="right"
        value={text}
        onChangeText={setText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  verticalCountryContainer: {
    flex: 0.7,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 15,
  },
  countryFlagIcon: {
    width: 70,
    height: 70,
  },
  currencyName: {
    fontSize: 12,
    color: "#ffffff",
    paddingTop: 5,
  },
  currencyInput: {
    flex: 2,
    fontSize: 40,
    color: "#ffffff",
    paddingHorizontal: 15,
  },
});
