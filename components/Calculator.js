import { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Button } from "react-native";
import CalcButton from "./CalcButton";

export default function Calculator() {
  return (
    <View style={styles.container}>
      <CalcButton title="C" isNumber />
      <CalcButton title="<--" isLong />
      <CalcButton title="$" isOperation />
      <CalcButton title="7" isNumber />
      <CalcButton title="8" isNumber />
      <CalcButton title="9" isNumber />
      <CalcButton title="/" isOperation />
      <CalcButton title="4" isNumber />
      <CalcButton title="5" isNumber />
      <CalcButton title="6" isNumber />
      <CalcButton title="*" isOperation />
      <CalcButton title="1" isNumber />
      <CalcButton title="2" isNumber />
      <CalcButton title="3" isNumber />
      <CalcButton title="-" isOperation />
      <CalcButton title="0" isLong />
      <CalcButton title="." isNumber />
      <CalcButton title="+" isOperation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
