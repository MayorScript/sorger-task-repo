import {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Theme/Themed';
import {getActiveTask, updateTask} from "../services/taskService";
import EditTaskForm from "../components/Forms/EditTaskForm";
import Toast from "react-native-root-toast";
import {useNavigation} from "@react-navigation/native";

export default function TaskScreen({route}) {
    const item = route.params;
    const navigation = useNavigation();

    const onTaskSubmit = async (values:any) => {
        try{
            const res = await updateTask(values,item.id);
            if(res){
                Toast.show(`Task updated successfully`, {
                    duration: Toast.durations.LONG,
                });
                navigation.navigate("HomeScreen");
            }
        }catch(err: any){
            Toast.show(`Oops! Task could not be updated`, {
                duration: Toast.durations.LONG,
            });
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Details</Text>
            <Text style={styles.content}>Task Content: {item.content}</Text>
            <Text style={styles.content}>Task Priority: {item.priority}</Text>
            <Text style={styles.content}>Due Date: {item.due?.string || "No due date"}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text >Edit Task</Text>
            <EditTaskForm onFormSubmit={onTaskSubmit} item={item} />
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    content: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'right',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
