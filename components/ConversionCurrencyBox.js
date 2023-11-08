import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { CurrencyFlag } from "./CurrencyFlag";

export default function ConversionCurrencyBox({
  setIsModalVisible,
  code,
  setOnSelectFlag,
  convertedResult,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.currencyOutput}>
        {isNaN(convertedResult) ? "" : convertedResult}
      </Text>

      <View style={styles.verticalCountryContainer}>
        <Pressable
          onPress={() => {
            setIsModalVisible(true);
            setOnSelectFlag(false);
          }}
        >
          <CurrencyFlag currency={code} width={90} height={90} />
        </Pressable>
        <Text style={styles.currencyName}>{code}</Text>
      </View>
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
    paddingVertical: Platform.OS === "ios" ? 0 : 10,
  },
  currencyName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
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
