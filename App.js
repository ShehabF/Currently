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
import { API_KEY } from "@env";
import UserCurrencyBox from "./components/UserCurrencyBox";
import ConversionCurrencyBox from "./components/ConversionCurrencyBox";
import InfoBox from "./components/InfoBox";
import Calculator from "./components/Calculator";
import { DialogCurrency } from "./components/DialogCurrency";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DialogInfo from "./components/DialogInfo";

export default function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);
  const [convertedResult, setConvertedResult] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [userCurrencyCode, setUserCurrencyCode] = useState("USD");
  const [conversionCurrencyCode, setConversionCurrencyCode] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
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
        setResult((0).toFixed(2));
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
      numText = "";
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
    setUserCurrencyCode(conversionCurrencyCode);
    setConversionCurrencyCode(temp1);
  };

  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${userCurrencyCode}`;

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setExchangeRate(json.conversion_rates[conversionCurrencyCode]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userCurrencyCode, conversionCurrencyCode]);

  const convertFirstNumberCurrency = () => {
    let displayNum = parseFloat(firstNumberDisplay());

    setConvertedResult((displayNum * exchangeRate).toFixed(2));
  };

  useEffect(() => {
    convertFirstNumberCurrency();
  }, [firstNumber, result]);

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
          convertedResult={convertedResult}
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
          exchangeRate={exchangeRate}
          setIsInfoModalVisible={setIsInfoModalVisible}
          fetchData={fetchData}
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

      <Modal
        visible={isInfoModalVisible}
        onRequestClose={() => setIsInfoModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <DialogInfo />
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
