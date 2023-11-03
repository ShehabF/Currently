import React, { useEffect, useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  TextInput,
  Text,
  Dimensions,
  Platform,
  StyleSheet,
  Pressable,
} from "react-native";
import Fuse from "fuse.js";
import data from "../constants/CommonCurrency.json";
import { CurrencyFlag } from "./CurrencyFlag";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const DialogCurrency = (props) => {
  const currencies = Object.values(data);

  const {
    onSelectItem,
    setVisible,
    searchPlaceholder = "Search",
    textEmpty = "Empty data",
  } = props;

  const [search, setSearch] = useState("");
  const [listCurrency, setListCurrency] = useState(currencies);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      setSearch("");
    };
  }, []);

  const options = Object.assign({
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "code"],
    id: "id",
  });

  const fuse = new Fuse(
    currencies.reduce(
      (acc, item) => [
        ...acc,
        { id: item.code, name: item.name, code: item.code },
      ],
      []
    ),
    options
  );

  const onSelect = (item) => {
    setSearch("");
    handleFilterChange("");
    StatusBar.setHidden(false);
    if (onSelectItem) onSelectItem(item);
    setVisible(false);
  };

  const renderItemTemplate = ({ code, name }) => {
    if (code !== "ILS") {
      return (
        <View style={styles.item}>
          <CurrencyFlag currency={code} width={25} height={25} />
          <Text style={styles.currencyName}>{code}</Text>
          <Text style={styles.commonName}>{name}</Text>
        </View>
      );
    }
  };

  const renderItem = ({ item, index }) => {
    const isLastItem = listCurrency.length - 1 === index;
    return (
      <TouchableOpacity
        style={{ marginBottom: isLastItem ? 150 : 0 }}
        onPress={() => onSelect(item)}
      >
        {renderItemTemplate(item)}
      </TouchableOpacity>
    );
  };

  let _flatList = undefined;

  const handleFilterChange = (value) => {
    setSearch(value);

    let listDataFilter = [];
    if (value === "") {
      listDataFilter = currencies;
    } else {
      const filteredCountries = fuse.search(value);
      if (_flatList) _flatList.scrollToOffset({ offset: 0 });
      filteredCountries.forEach((n) => {
        const item = currencies.filter(
          (i) => i.code === n.item.code.toString()
        );
        if (item.length > 0) listDataFilter.push(item[0]);
      });
    }
    setListCurrency(listDataFilter);
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <View style={styles.textInputContainer}>
          <TextInput
            onChangeText={(text) => handleFilterChange(text)}
            value={search}
            placeholder={searchPlaceholder}
            placeholderTextColor="#808080"
            style={[styles.textTitleSmallerWhite, styles.textInput]}
          />

          {search !== "" ? (
            <Pressable
              style={styles.closeBtn}
              onPress={() => {
                setSearch("");
                handleFilterChange("");
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} size={15} color="#FFFFFF" />
            </Pressable>
          ) : (
            ""
          )}
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          keyboardShouldPersistTaps={"handled"}
          ref={(ref) => (_flatList = ref)}
          data={listCurrency}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          ListEmptyComponent={() => (
            <View style={styles.listNullContainer}>
              <Text style={styles.txtEmpty}>{textEmpty}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const marginBottomByPlatform = Platform.OS === "ios" ? 5 : 0;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight() / 2,
    backgroundColor: "#000000",
    height: height,
  },
  listContainer: {
    paddingTop: getStatusBarHeight() / 2,
    backgroundColor: "#000000",
  },
  title: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  item: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    paddingHorizontal: 25,
  },
  currencyName: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    width: 100,
    fontSize: 16,
    marginBottom: marginBottomByPlatform,
  },
  commonName: {
    color: "#FFFFFF",
    marginBottom: marginBottomByPlatform,
    marginHorizontal: 20,
    fontSize: 14,
  },
  commonSymbolCode: {
    color: "#FFFFFF",
    marginBottom: marginBottomByPlatform,
    marginLeft: 20,
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
  search: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 20,
  },
  textInputContainer: {
    borderRadius: 7,
    backgroundColor: "#1E1E1E",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textTitleSmallerWhite: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  textInput: {
    padding: 10,
    flex: 1,
  },
  listNullContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  titleModal: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  txtEmpty: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  flag: {
    fontSize: Platform.OS === "ios" ? 28 : 20,
    lineHeight: 30,
    color: "#000000",
  },
  closeBtn: {
    paddingRight: 10,
    paddingTop: 12,
  },
});
