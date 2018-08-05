import React, {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio
} from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 5
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    width: 350,
    height: 40
  },
  searchIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    tintColor: "#999",
    marginHorizontal: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Montserrat",
    paddingVertical: 15,
    borderRadius: 10,
    // padding: 10,
    // paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 10,
    margin: 0
  }
  // searchWrap: {
  //   margin: 10,
  //   alignItems: "center",
  //   borderRadius: 2,
  //   backgroundColor: "#fff",
  //   marginLeft: 10,
  //   marginRight: 10,
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: "#333",
  //       shadowOffset: {
  //         width: 2,
  //         height: 5
  //       },
  //       shadowRadius: 8,
  //       shadowOpacity: 0.2
  //     },
  //     android: {
  //       elevation: 1.5
  //     }
  //   })
  // },
});
export default styles;
