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
    paddingLeft: 15,
    paddingRight: 15
  },
  imagePanel: {
    borderRadius: 8,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    width: "100%",
    height: 200,
    position: "relative"
  },
  titleView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    left: 20,
    bottom: 15
  },
  title: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Montserrat",
    marginRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 }
  },
  linearGradient: {
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 15,
    borderRadius: 8,
    justifyContent: "flex-end",
    width: "100%"
  },
  headerLabel: {
    color: "#333",
    fontSize: 28,
    fontFamily: "Montserrat",
    alignSelf: "center",
    paddingBottom: 20,
    paddingTop: 10
  },
  subText: {
    fontSize: 10,
    color: "#fff",
    marginTop: 4,
    fontFamily: "Montserrat",
    alignItems: "flex-start",
    marginRight: 22,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 }
  }
});
