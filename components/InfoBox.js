import { useEffect, useState } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment/moment";

export default function InfoBox() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    var date = moment().utcOffset("+02:00").format("DD/MM/YYYY hh:mm A");
    setCurrentDate(date);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name="refresh" color="#FFFFFF" size={30} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={{ color: "#00B132", paddingBottom: 5 }}>
          {currentDate}
        </Text>
        <Text style={{ color: "#FFFFFF" }}>1 ZAR = 1 ZAR</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="settings-outline" color="#FFFFFF" size={30} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  infoContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});