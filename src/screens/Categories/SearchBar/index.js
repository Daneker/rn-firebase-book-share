import React, { PureComponent } from "react";
import { View, Image, TextInput } from "react-native";
import styles from "./styles";
class SearchBar extends PureComponent {
  state = {
    searchText: ""
  };

  _onSearch = searchText => {
    this.setState({
      searchText
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchWrap}>
          <Image
            style={styles.searchIcon}
            source={require("../../../assets/icons/tab-search.png")}
          />
          <TextInput
            style={styles.input}
            autoCapitalize={"none"}
            autoCorrect={false}
            placeholder={"Найти..."}
            placeholderTextColor="#999"
            underlineColorAndroid={"transparent"}
            clearButtonMode={"while-editing"}
            onChangeText={this._onSearch}
          />
        </View>
      </View>
    );
  }
}

export default SearchBar;
