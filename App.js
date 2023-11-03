import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import dataCurrency from "./constants/CommonCurrency.json";
import UserCurrencyBox from "./components/UserCurrencyBox";
import ConversionCurrencyBox from "./components/ConversionCurrencyBox";
import InfoBox from "./components/InfoBox";
import Calculator from "./components/Calculator";
import { DialogCurrency } from "./components/DialogCurrency";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);
  const [convertedResult, setConvertedResult] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userCurrencyCode, setUserCurrencyCode] = useState("USD");
  const [conversionCurrencyCode, setConversionCurrencyCode] = useState("EUR");
  const [onSelectFlag, setOnSelectFlag] = useState();

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

  const currencies = Object.values(dataCurrency);

  useEffect(() => {
    let currency = undefined;

    if (userCurrencyCode) {
      currency = currencies.filter((item) => item.code === userCurrencyCode)[0];
    }

    if (currency) {
      const { code } = currency;
      setUserCurrencyCode(code);
    }
    console.log(`User currency: ${userCurrencyCode}`);
  }, [userCurrencyCode]);

  useEffect(() => {
    let currency = undefined;

    if (conversionCurrencyCode) {
      currency = currencies.filter(
        (item) => item.code === conversionCurrencyCode
      )[0];
    }

    if (currency) {
      const { code } = currency;
      setConversionCurrencyCode(code);
    }
    console.log(`Convert to: ${conversionCurrencyCode}`);
  }, [conversionCurrencyCode]);

  const onSelectUserCurrency = (data) => {
    const { code } = data;
    setUserCurrencyCode(code);
    setIsModalVisible(false);
  };

  const onSelectConversionCurrency = (data) => {
    const { code } = data;
    setConversionCurrencyCode(code);
    setIsModalVisible(false);
  };

  const swapCurrencyCodes = () => {
    let temp1 = userCurrencyCode;
    let temp2 = conversionCurrencyCode;
    setConversionCurrencyCode(temp1);
    setUserCurrencyCode(temp2);
  };

  const fetchData = async (
    userCurrencyCode = { userCurrencyCode },
    conversionCurrencyCode = { conversionCurrencyCode },
    result = { result }
  ) => {
    const conversion = await fetch(
      `https://v6.exchangerate-api.com/v6/d2dde50c52e371105459446f/pair/${userCurrencyCode}/${conversionCurrencyCode}/${result}`
    );
    const data1 = await conversion.json();
    console.log(data1);
  };

  // useEffect(() => {
  //   fetchData();
  // }, [convertedResult, userCurrencyCode, conversionCurrencyCode]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.currencyContainer}>
        <UserCurrencyBox
          firstNumberDisplay={firstNumberDisplay}
          setIsModalVisible={setIsModalVisible}
          code={userCurrencyCode}
          setOnSelectFlag={setOnSelectFlag}
        />
      </View>
      <View style={styles.swapBtn}>
        <Pressable
          style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}
          onPress={() => swapCurrencyCodes()}
        >
          <FontAwesomeIcon
            icon={faArrowRightArrowLeft}
            color="#3F3F3F"
            size={30}
          />
        </Pressable>
      </View>
      <View style={styles.currencyContainer}>
        <ConversionCurrencyBox
          setIsModalVisible={setIsModalVisible}
          code={conversionCurrencyCode}
          setOnSelectFlag={setOnSelectFlag}
        />
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
        <InfoBox
          userCurrencyCode={userCurrencyCode}
          conversionCurrencyCode={conversionCurrencyCode}
        />
      </View>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <DialogCurrency
          onSelectItem={(data) => {
            if (onSelectFlag) onSelectUserCurrency(data);
            else onSelectConversionCurrency(data);
          }}
          setVisible={(value) => {
            setIsModalVisible(value);
          }}
          searchPlaceholder="Select a currency"
          textEmpty="No matches found"
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: StatusBar.currentHeight,
  },
  modal: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  swapBtn: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  currencyContainer: {
    flex: 0.9,
    paddingHorizontal: 16,
  },
  calculatorContainer: {
    flex: 4,
  },
  infoBoxContainer: {
    flex: 0.3,
  },
});
