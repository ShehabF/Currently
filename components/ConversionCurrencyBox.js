import { View, Text, Image, StyleSheet } from "react-native";

export default function ConversionCurrencyBox() {
  const flagIcon = require("../assets/RSAflag.png");
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <Text style={styles.currencyOutput}>0</Text>

      <View style={styles.verticalCountryContainer}>
        <Image source={flagIcon} style={styles.countryFlagIcon} />
        <Text style={styles.currencyName}>ZAR</Text>
      </View>
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
  currencyOutput: {
    flex: 2,
    fontSize: 40,
    color: "#ffffff",
    textAlign: "left",
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
});
