import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  txt: {
    marginLeft: "10%",
    marginRight: "10%",
    padding: 10,
    fontSize: 20,
    width: "80%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },

  HomeContainer: {
    backgroundColor: "#fff",
    color: "#fff",
    flex: 1,
    height: "100%",
    paddingHorizontal: "5%",
    // paddingVertical: "5%",
  },

  screen_header: {
    color: "dodgerblue",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    marginVertical: "35%",
  },

  fieldText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  link: {
    color: "orange",
  },

  hometext: {
    fontSize: 24,
    alignSelf: "center",
    paddingVertical: 20,
  },

  Home: {
    backgroundColor: "#fff",
  },

  iconalign: {
    backgroundColor: "whitesmoke",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    width: "100%",
    paddingLeft: 20,
    elevation: 10,
  },

  History: {
    height: "auto",
    paddingBottom: "5%",
    borderRadius: 10,
    marginVertical: "5%",
    marginHorizontal: "5%",
    backgroundColor: "#f0f0f0",
    borderColor: "lightgray",
    elevation: 2,
    borderWidth: 0.5,
  },

  appointment_container: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    alignSelf: "flex-start",
    padding: 10,
  },

  search_Input: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    paddingLeft: 20,
    borderRadius: 50,
    borderColor: "lightgrey",
    elevation: 10,
    borderWidth: 2,
  },

  flatlist_avoid_bottom: {
    flex: 1,
    backgroundColor: "white",
    // backgroundColor: "#f0f0f0",
  },

  history_content: {
    fontWeight: "bold",
    fontSize: 15,
  },

  search_container: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },

  partition: {
    borderBottomWidth: 0.8,
    borderBottomColor: "lightgrey",
    marginBottom: "2%",
  },

  history_title: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingBottom: 2,
  },

  eyeIcons: {
    position: "absolute",
    right: 0,
    bottom: 0,
    fontSize: 25,
    padding: 20,
    paddingRight: 15,
  },

  underline_btn_text: {
    color: "#3B71F3",
    textDecorationLine: "underline",
  },
});

export default styles;
