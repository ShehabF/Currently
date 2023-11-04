import { View, Text, StyleSheet, Pressable } from "react-native";
import { CurrencyFlag } from "./CurrencyFlag";

export default function ConversionCurrencyBox({
  setIsModalVisible,
  code,
  setOnSelectFlag,
  convertedResult,
}) {
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <Text style={styles.currencyOutput}>{convertedResult}</Text>

      <View style={styles.verticalCountryContainer}>
        <Pressable
          onPress={() => {
            setIsModalVisible(true);
            setOnSelectFlag(false);
          }}
        >
          <CurrencyFlag currency={code} width={70} height={70} />
        </Pressable>
        <Text style={styles.currencyName}>{code}</Text>
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
