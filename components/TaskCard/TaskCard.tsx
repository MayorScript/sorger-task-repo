import {StyleSheet, Pressable, Alert} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../Theme/Themed';
import Colors from "../../constants/Colors";
import * as React from "react";
import useColorScheme from "../../hooks/useColorScheme";
import {useNavigation} from "@react-navigation/native";
import Toast from 'react-native-root-toast';

const LeftSwipeActions = () => {
    return (
        <View
            style={{ flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center' }}
        >
            <Text
                style={{
                    color: '#40394a',
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    paddingVertical: 20,
                }}
            >
                Bookmark
            </Text>
        </View>
    );
};
const rightSwipeActions = (colorScheme, item) => {
    const deleteTask = (item) => {
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
    const confirmDelete = async (item) => {
        try{
            await deleteTask(item.id);
            Toast.show(`Task deleted successfully`, {
                duration: Toast.durations.LONG,
            });
        }catch(err: any){
            Toast.show('Request failed to send.', {
                duration: Toast.durations.LONG,
            });
        }

    }
    return (
        <Pressable onPress={() => deleteTask(item)}>
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
const swipeFromLeftOpen = () => {
    alert('Swipe from left');
};
const swipeFromRightOpen = () => {
    alert('Swipe from right');
};
export const TaskCard = ({item}) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <Swipeable
            renderLeftActions={LeftSwipeActions}
            renderRightActions={() => rightSwipeActions(colorScheme, item)}
            // onSwipeableRightOpen={swipeFromRightOpen}
            // onSwipeableLeftOpen={swipeFromLeftOpen}
        >
            <Pressable onPress={() => navigation.navigate("Task", item)}>
                <View style={styles.container} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
                    <Text numberOfLines={1}>{item.content}</Text>
                </View>
            </Pressable>
        </Swipeable>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        marginVertical: 10
    }
});