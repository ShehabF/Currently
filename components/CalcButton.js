import { useState } from "react";
import { View, Text, Image, StyleSheet, Button, Pressable } from "react-native";

export default function CalcButton({
  onPress,
  title,
  isOperation,
  isNumber,
  isLong,
}) {
  let styleSelection;

  if (isOperation) styleSelection = styles.operationButton;
  else if (isNumber) styleSelection = styles.numButton;
  else if (isLong) styleSelection = styles.longButton;

  return (
    <Pressable onPress={onPress}>
      <View style={styleSelection}>
        <Text style={styles.labelStyle}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  operationButton: {
    width: 96,
    height: 96,
    backgroundColor: "#00B132",
    justifyContent: "center",
    alignItems: "center",
    margin: 0.5,
  },
  numButton: {
    width: 96,
    height: 96,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    margin: 0.5,
  },
  longButton: {
    width: 193,
    height: 96,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    margin: 0.5,
  },
  labelStyle: {
    color: "#FFFFFF",
    fontSize: 40,
  },
});
