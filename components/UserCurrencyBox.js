import { View, Text, StyleSheet, Pressable } from "react-native";
import { CurrencyFlag } from "./CurrencyFlag";

export default function UserCurrencyBox({
  firstNumberDisplay,
  setIsModalVisible,
  code,
  setOnSelectFlag,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.verticalCountryContainer}>
        <Pressable
          onPress={() => {
            setIsModalVisible(true);
            setOnSelectFlag(true);
          }}
        >
          <CurrencyFlag currency={code} width={70} height={70} />
        </Pressable>
        <Text style={styles.currencyName}>{code}</Text>
      </View>

      <Text style={styles.currencyInput}>{firstNumberDisplay()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
    fontWeight: "bold",
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
