import { View, SafeAreaView, Text, StyleSheet, StatusBar } from "react-native";
import UserCurrencyBox from "./components/UserCurrencyBox";
import ConversionCurrencyBox from "./components/ConversionCurrencyBox";
import InfoBox from "./components/InfoBox";
import Calculator from "./components/Calculator";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.currencyContainer}>
        <UserCurrencyBox />
      </View>
      <View style={styles.currencyContainer}>
        <ConversionCurrencyBox />
      </View>
      <View style={styles.calculatorContainer}>
        <Calculator />
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
    borderBottomWidth: 2,
    borderBottomColor: "#1E1E1E",
  },
  calculatorContainer: {
    flex: 4,
  },
  infoBoxContainer: {
    flex: 0.3,
  },
});
