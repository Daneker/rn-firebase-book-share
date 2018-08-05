import { Platform, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  sliderContainer: {
    paddingVertical: 8,
    alignItems: "center"
  },
  imageTitle: {
    position: "absolute",
    bottom: -20,
    color: "#999",
    fontSize: 14,
    textAlign: "center"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  linearGradient: {
    height: height * 0.3,
    zIndex: 3,
    width: width,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 0
  },
  titleView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    zIndex: 9
  },
  title: {
    fontSize: 20,
    textAlign: "left",
    color: "#fff",
    fontFamily: "MontserratBold"
  },
  count: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
    backgroundColor: "transparent",
    fontFamily: "Montserrat"
  },
  body: {
    ...Platform.select({
      ios: {
        zIndex: 9
      }
    })
  },
  headerLabel: {
    color: "#333",
    fontSize: 28,
    fontFamily: "Montserrat",
    alignSelf: "center",
    paddingBottom: 8,
    marginLeft: 14,
    paddingTop: 46,

  }
});
export default styles;
