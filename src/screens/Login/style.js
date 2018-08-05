import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window"),
  vw = width / 100,
  vh = height / 100;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    position: "absolute",
    top: 50,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: 'gray'
  },
  tab: {
    paddingBottom: 0,
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  activeTab: {
    height: 0,
    backgroundColor: "#FFFFFF"
  },
  textTab: {
    fontWeight: "200",
    fontSize: 25
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  toolbar: {
    left: 14,
    alignSelf: "flex-start"
  }
});
export default styles;