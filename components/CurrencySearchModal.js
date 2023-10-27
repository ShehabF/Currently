import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";

export default function CurrencySearchModal() {
  const [text, setText] = useState("Select a country");
  return (
    <View style={styles.modal}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder={text}
          placeholderTextColor="#FFFFFF"
          style={styles.searchBarInput}
          onChangeText={(e) => setText(e)}
          onPressIn={() => setText("")}
        />
        {text !== "" ? (
          <Pressable onPress={() => setText("")}>
            <FontAwesomeIcon icon={faCircleXmark} size={15} color="#FFFFFF" />
          </Pressable>
        ) : (
          ""
        )}
      </View>
      <FlatList style={styles.countryList} />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  searchBar: {
    flexDirection: "row",
    height: 40,
    width: 350,
    backgroundColor: "#000000",
    borderRadius: 5,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarInput: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  countryList: {},
});
