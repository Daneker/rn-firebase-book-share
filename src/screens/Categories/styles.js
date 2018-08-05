import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  panel: {
    flex: 1,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff"
  },
  imagePanel: {
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    width: 160,
    height: 220
  },
  titleView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 20,
    bottom: 10
  },
  title: {
    fontSize: 14,
    color: "white",
    // fontFamily: "MontserratBold",
    marginRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 }
  },
  count: {
    fontSize: 15,
    color: "#fff",
    marginTop: 4,
    backgroundColor: "transparent"
    // fontFamily: "Montserrat"
  },
  headerTitle: {
    marginTop: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10
  },
  headerText: {
    fontSize: 22,
    color: "#333",
    letterSpacing: 0.5
    // fontFamily: "MontserratBold"
  },
  linearGradient: {
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 8,
    borderRadius: 8,
    justifyContent: "flex-end",
    width: 160
  },
  closeWrap: {
    position: "absolute",
    top: 2,
    right: 10,
    zIndex: 9999
  },
  btnCloseSearch: {
    zIndex: 9999
  },
  
});
