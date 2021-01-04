import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Button, CheckBox, Icon, Input, ListItem } from 'react-native-elements';
import {Swipeout} from 'react-native-swipeout';


function App() {

    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos?completed=false')
            .then(res => {
                setTasks(res.data);
            });
    }, [])

    function changeTask(text) {
        setInput(text);
    }

    function addTask() {
        let newTask = { userId: 1, id: uuidv4(), title: input, completed: false};
        setTasks([...tasks, newTask]);
        setInput('');
    }

    function deleteTask(id) {
        const index = tasks.findIndex(task => task.id == id);
        tasks[index].completed = !tasks[index].completed;
        //console.log(tasks);
        //console.log(tasks[index]);
        //console.log(index);
        const updatedTasks = tasks.splice(index,1, tasks[index]);
        setTasks([...tasks,updatedTasks]);
        //console.log(updatedTasks);
        const removeTasks = tasks.filter(task => task.id !== id);
        setTimeout(() => {setTasks(removeTasks)}, 1000);
        //console.log(tasks);
    }

    return ( <View style = { styles.container } >
                <Text style = { styles.title }>My TodoList</Text>
                <View style = { styles.form } >
                <Input inputContainerStyle = { styles.input }
                placeholder = 'Add new goal'
                leftIcon = { < Icon
                    name = 'add'
                    size = { 45 }
                    color = "#35a8ec" />
                }
                onChangeText = { changeTask }
                rightIcon = { < Button titleStyle = { styles.button }
                    color = "#35a8ec"
                    type = "clear"
                    onPress = { addTask }
                    title = "Add"/> }
                /> 
                </View>

                <View>
                    <FlatList 
                    contentContainerStyle = { styles.container }
                    data = { tasks }
                    renderItem = {({ item }) =>
                        <ListItem
                        key = { item.id }
                        title = {< CheckBox 
                            title = { item.title }
                            checkedIcon = 'check-circle-o'
                            uncheckedIcon = 'circle-o'
                            checkedColor = '#35a8ec'
                            uncheckedColor = "#35a8ec"
                            size = { 35 }
                            checked = {item.completed}
                            onIconPress ={() => {deleteTask(item.id)}}
                            containerStyle = { styles.task }
                            />}
                        bottomDivider/>
                        }
                        keyExtractor = { item => item.id }
                    />  
                </View>
            </View>
        );
    }

    export default App;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }, title: {
            marginTop:100,
            color: '#35a8ec',
            fontSize: 30
        },
        input: {
            padding: 30,
            paddingBottom: 20,
            marginTop:10
        },
        taskTitle: {
            textAlign: 'center'
        },
        button: {
            margin: 5,
            color: '#35a8ec'
        },
        task: {
            padding: 20,
            margin: 0,
            borderColor: 'white',
            width: 400,
            height:50,
            marginBottom:20
        },
        form: {
            flex: 1,
            flexDirection: "row"
        }
    });