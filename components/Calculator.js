import { View, StyleSheet } from "react-native";
import CalcButton from "./CalcButton";

export default function Calculator({
  firstNumber,
  setFirstNumber,
  handleNumberPress,
  handleOperationPress,
  clear,
  getResult,
}) {
  return (
    <View style={styles.container}>
      <CalcButton title="C" isNumber onPress={clear} />
      <CalcButton
        title="<--"
        isDelete
        onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
      />
      <CalcButton
        title="/"
        isOperation
        onPress={() => handleOperationPress("/")}
      />
      {/**/}
      {/**/}
      <CalcButton title="7" isNumber onPress={() => handleNumberPress("7")} />
      <CalcButton title="8" isNumber onPress={() => handleNumberPress("8")} />
      <CalcButton title="9" isNumber onPress={() => handleNumberPress("9")} />
      <CalcButton
        title="*"
        isOperation
        onPress={() => handleOperationPress("*")}
      />
      <CalcButton title="4" isNumber onPress={() => handleNumberPress("4")} />
      <CalcButton title="5" isNumber onPress={() => handleNumberPress("5")} />
      <CalcButton title="6" isNumber onPress={() => handleNumberPress("6")} />
      <CalcButton
        title="-"
        isOperation
        onPress={() => handleOperationPress("-")}
      />
      <CalcButton title="1" isNumber onPress={() => handleNumberPress("1")} />
      <CalcButton title="2" isNumber onPress={() => handleNumberPress("2")} />
      <CalcButton title="3" isNumber onPress={() => handleNumberPress("3")} />
      <CalcButton
        title="+"
        isOperation
        onPress={() => handleOperationPress("+")}
      />
      <CalcButton title="0" isLong onPress={() => handleNumberPress("0")} />
      <CalcButton title="." isNumber onPress={() => handleNumberPress(".")} />
      <CalcButton title="$" isOperation onPress={() => getResult()} />
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
