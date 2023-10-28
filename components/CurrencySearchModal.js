import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import filter from "lodash.filter";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
} from "react-native";

export default function CurrencySearchModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(currencyList, (currency) => {
      return contains(currency, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({ title }, query) => {
    if (title.includes(query)) {
      return true;
    }
    return false;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=20`
      );
      const data = await response.json();

      setData(data);
      setCurrencyList(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Select a currency"
          placeholderTextColor="#808080"
          style={styles.searchBarInput}
          value={searchQuery}
          onChangeText={(query) => handleSearchQuery(query)}
        />
        {searchQuery !== "" ? (
          <Pressable onPress={() => setSearchQuery("")}>
            <FontAwesomeIcon icon={faCircleXmark} size={15} color="#FFFFFF" />
          </Pressable>
        ) : (
          ""
        )}
      </View>

      <FlatList
        style={styles.currencyListContainer}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.currencyItem}>
            <Text style={{ color: "#FFFFFF" }}>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    height: 50,
    width: 350,
    backgroundColor: "#000000",
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarInput: {
    height: 50,
    width: 300,
    fontSize: 16,
    color: "#FFFFFF",
  },
  currencyItem: {
    flex: 1,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
  },
  currencyListContainer: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 20,
  },
});
