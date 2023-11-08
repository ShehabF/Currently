import { View, Text, Image, StyleSheet, Button, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMinus,
  faPlus,
  faTimes,
  faDivide,
  faDollarSign,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons/";

export default function CalcButton({
  onPress,
  title,
  isOperation,
  isNumber,
  isLong,
  isDelete,
}) {
  let styleSelection;

  if (isOperation) styleSelection = styles.operationButton;
  else if (isNumber) styleSelection = styles.numButton;
  else if (isLong || isDelete) styleSelection = styles.longButton;

  let operationIcon;

  if (title === "-") operationIcon = faMinus;
  else if (title === "+") operationIcon = faPlus;
  else if (title === "*") operationIcon = faTimes;
  else if (title === "/") operationIcon = faDivide;
  else if (title === "$") operationIcon = faDollarSign;
  else if (title === "<--") operationIcon = faArrowLeftLong;
  return (
    <Pressable
      style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}
      onPress={onPress}
    >
      <View style={styleSelection}>
        {isNumber || isLong ? (
          <Text style={styles.labelStyle}>{title}</Text>
        ) : (
          <FontAwesomeIcon icon={operationIcon} color="#FFFFFF" size={30} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  operationButton: {
    width: Platform.OS === "ios" ? 96 : 101,
    height: 96,
    backgroundColor: "#00B132",
    justifyContent: "center",
    alignItems: "center",
    margin: 0.5,
  },
  numButton: {
    width: Platform.OS === "ios" ? 96 : 101,
    height: 96,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    margin: 0.5,
  },
  longButton: {
    width: Platform.OS === "ios" ? 193 : 203,
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
