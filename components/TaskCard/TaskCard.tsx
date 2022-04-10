import {useEffect} from 'react';
import {StyleSheet, Pressable, Alert} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../Theme/Themed';
import Colors from "../../constants/Colors";
import * as React from "react";
import useColorScheme from "../../hooks/useColorScheme";
import {useNavigation} from "@react-navigation/native";
import Toast from 'react-native-root-toast';
import {closeTask, deleteTask} from "../../services/taskService";

const LeftSwipeActions = (colorScheme, item) => {
    return (
        <Pressable>
            <View style={styles.container} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
                <Text numberOfLines={1}>{item.content}</Text>
                <Text>Status: <Text style={{color: 'green'}}>Completed</Text></Text>
            </View>
        </Pressable>
    );
};
const rightSwipeActions = (colorScheme, item) => {
    const deleteTaskConfirm = () => {
             Alert.alert(
                "Delete Task",
                `Are you sure you want to delete this task ${item.id}?`,
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Delete",
                        onPress: () => confirmDelete(item),
                        style: "destructive",
                    },
                ],
                {
                    cancelable: true,
                }
            );
    }
    const confirmDelete = async (item, navigation) => {
        const nav: any = {navigation};
        try{
            //console.log(item);
            //await deleteTask(item.id);
            // Toast.show(`Task deleted successfully`, {
            //     duration: Toast.durations.LONG,
            // });

        }catch(err: any){
            Toast.show('Request failed to send.', {
                duration: Toast.durations.LONG,
            });
        }

    }
    return (
        <Pressable onPress={() => deleteTaskConfirm()}>
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}
        >
            <Text
                style={{
                    color: '#1b1a17',
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    paddingVertical: 20,
                }}
            >
                <FontAwesome
                    name="trash"
                    size={25}
                    color={Colors[colorScheme].text}
                    style={{ marginRight: 15 }}
                />
            </Text>
        </View>
        </Pressable>
    );
};
const swipeFromLeftOpen = async (item) => {
        try{
            console.log("item test", item)
            await closeTask(item.id);
            Toast.show(`Task marked as completed !`, {
                duration: Toast.durations.LONG,
            });
        }catch(err: any){
            Toast.show(`Unable to mark as completed !`, {
                duration: Toast.durations.LONG,
            });
        }
};
export const TaskCard = ({item}) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <Swipeable
            renderLeftActions={() => LeftSwipeActions(colorScheme, item)}
            renderRightActions={() => rightSwipeActions(colorScheme, item)}
             onSwipeableLeftOpen={() => swipeFromLeftOpen(item)}
        >
            <Pressable onPress={() => navigation.navigate("Task", item)}>
                <View style={styles.container} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
                    <Text numberOfLines={1}>{item.content}</Text>
                    {item.completed ? (
                            <Text style={styles.status}>Status: <Text style={{color: 'green'}}>Completed</Text></Text>
                    )
                        : (
                            <Text style={styles.status}>Status: <Text style={{ color: 'red'}}>Not Completed</Text></Text>
                        )
                    }

                </View>
            </Pressable>
        </Swipeable>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 12,
        width: 370,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        marginVertical: 10
    },
    status: {
        marginTop: 10
    }
});