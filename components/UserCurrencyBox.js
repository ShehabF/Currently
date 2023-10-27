import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function UserCurrencyBox({
  firstNumberDisplay,
  setIsModalVisible,
}) {
  const flagIcon = require("../assets/RSAflag.png");

  return (
    <View style={styles.container}>
      <View style={styles.verticalCountryContainer}>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Image source={flagIcon} style={styles.countryFlagIcon} />
        </Pressable>
        <Text style={styles.currencyName}>ZAR</Text>
      </View>

      <Text style={styles.currencyInput}>{firstNumberDisplay()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#1E1E1E",
  },
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
    textAlign: "right",
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
});
