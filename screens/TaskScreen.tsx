import {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/Theme/EditScreenInfo';
import { Text, View } from '../components/Theme/Themed';
import {getActiveTask} from "../services/taskService";

interface TaskDetail{
    content: string,
    priority: string,
    due: {
        date: string
    }
}
export default function TaskScreen({route}) {
    const [taskDetail, setTaskDetail] = useState({});
    const item = route.params;

    const fetchTaskDetail = async () => {
        const res = await getActiveTask(item.id);
        setTaskDetail(res.data);
        //console.log('test data', res.data);
    }
    useEffect(()=> {
        fetchTaskDetail();
    },[])
    const setPriority = ({taskDetail}) => {
        console.log("p",taskDetail.priority)
        switch(taskDetail.priority) {
            case 1:
                return <Text>Normal</Text>
                break;
            case 2:
                return <Text>High</Text>
                break;
            case 3:
                return <Text>Low</Text>
                break;
            case 4:
                return <Text>Urgent</Text>
                break;
            default:
            return;
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Details</Text>
            <Text >Task Content: {taskDetail.content}</Text>
            <Text>Task Priority: {({taskDetail}) => setPriority(taskDetail)}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            {/*<EditScreenInfo path="/screens/ModalScreen.tsx" />*/}
            <Text >Edit Form</Text>

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
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
