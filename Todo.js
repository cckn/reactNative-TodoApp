import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");
class Todo extends Component {
  state = {
    isEditing: false,
    isCompleted: false
  };
  render() {
    const { isCompleted } = this.state;
    return (
      <View style={styles.container}>
      <View></View>
        <TouchableOpacity onPress={this._toggleComplete}>
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.uncompletedCircle
            ]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.text,
            isCompleted ? styles.completedText : styles.uncompletedText
          ]}
        >
          {" "}
          Hello i'm Todo Component
        </Text>
      </View>
    );
  }

  _toggleComplete = () => {
    this.setState(preState => {
      return {
        isCompleted: !preState.isCompleted
      };
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "red"
  },
  text: { fontWeight: "600", fontSize: 20, marginVertical: 20 },
  completedText:{
    color:"#bbb",
    textDecorationLine:"line-through"
  },
  uncompletedText:{
color:"#353839"
  }
});

export default Todo;
