import { View, SafeAreaView, Text, StyleSheet, StatusBar } from "react-native";
import UserCurrencyBox from "./components/UserCurrencyBox";
import ConversionCurrencyBox from "./components/ConversionCurrencyBox";
import InfoBox from "./components/InfoBox";
import Calculator from "./components/Calculator";
import { useState } from "react";

export default function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);

  const handleNumberPress = (buttonValue) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber("");
  };

  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };

  const getResult = () => {
    switch (operation) {
      case "+":
        clear();
        setResult(
          (parseFloat(secondNumber) + parseFloat(firstNumber)).toFixed(2)
        );
        break;
      case "-":
        clear();
        setResult(
          (parseFloat(secondNumber) - parseFloat(firstNumber)).toFixed(2)
        );
        break;
      case "*":
        clear();
        setResult(
          (parseFloat(secondNumber) * parseFloat(firstNumber)).toFixed(2)
        );
        break;
      case "/":
        clear();
        setResult(
          (parseFloat(secondNumber) / parseFloat(firstNumber)).toFixed(2)
        );
        break;
      default:
        clear();
        setResult(0);
        break;
    }
  };

  const firstNumberDisplay = () => {
    let numText = "";
    if (result !== null) {
      if (result === "NaN") {
        numText = "error";
        return numText;
      }
      numText = result?.toString();
      return numText;
    }

    if (firstNumber) {
      numText = firstNumber;
      return numText;
    }

    if (firstNumber === "") {
      numText = "0";
      return numText;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.currencyContainer}>
        <UserCurrencyBox firstNumberDisplay={firstNumberDisplay} />
      </View>
      <IconFill name="account-book" />
      <View style={styles.currencyContainer}>
        <ConversionCurrencyBox />
      </View>
      <View style={styles.calculatorContainer}>
        <Calculator
          firstNumber={firstNumber}
          setFirstNumber={setFirstNumber}
          handleNumberPress={handleNumberPress}
          handleOperationPress={handleOperationPress}
          clear={clear}
          getResult={getResult}
        />
      </View>
      <View style={styles.infoBoxContainer}>
        <InfoBox />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: StatusBar.currentHeight,
  },
  currencyContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  calculatorContainer: {
    flex: 4,
  },
  infoBoxContainer: {
    flex: 0.3,
  },
});
