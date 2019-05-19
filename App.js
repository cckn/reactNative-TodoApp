import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform,
  TextInput,
  ScrollView
} from "react-native";

import { AppLoading } from "expo";
import Todo from "./Todo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newTodo: "",
    loadedTodos: false,
    todos: {}
  };
  componentDidMount = () => {
    this._loadTodos();
  };
  render() {
    const { newTodo, loadedTodos, todos } = this.state;
    // console.log(todos);

    if (!loadedTodos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>NEW TODO</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="TODO"
            value={newTodo}
            onChangeText={this._controlNewTodo}
            placeholderTextColor="#999"
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addTodo}
          />
          <ScrollView contentContainerStyle={styles.todos}>
            {Object.values(todos).map(todo => (
              <Todo
                key={todo.id}
                deleteTodo={this._deleteTodo}
                uncompleteTodo={this._uncompleteTodo}
                completeTodo={this._completeTodo}
                updateTodo={this._updateTodo}
                {...todo}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlNewTodo = text => {
    this.setState({
      newTodo: text
    });
  };
  _loadTodos = () => {
    this.setState({ loadedTodos: true });
  };
  _addTodo = () => {
    const { newTodo } = this.state;
    if (newTodo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newTodoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            createAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newTodo: "",
          todos: {
            ...prevState.todos,
            ...newTodoObject
          }
        };
        return { ...newState };
      });
    }
  };
  _deleteTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos
      };
      return { ...newState };
    });
  };

  _uncompleteTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState, // 기존의 State 요소들
        todos: {
          ...prevState.todos, // 기존의 Todos
          [id]: {
            // 이전의 id가 동일한 Todo가 있다면 덮어쓰기
            ...prevState.todos[id],
            isCompleted: false // 완료 상태는 False로 변경하고
          }
        }
      };
      return { ...newState };
    });
  };

  _completeTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: true
          }
        }
      };
      return { ...newState };
    });
  };

  _updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            text: text
          }
        }
      };
      return { ...newState };
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2057A7",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  title: {
    marginTop: 50,
    fontSize: 40,
    color: "white",
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  todos: {
    alignItems: "center"
  }
});
