import {useState, useEffect} from 'react';
import { FlatList } from 'react-native';
import { Text, View } from '../Theme/Themed';
import {getActiveTasks} from "../../services/taskService";
import {TaskCard} from "../TaskCard";
import Toast from "react-native-root-toast";

const  AllTasks = () => {
    const [taskData, setTaskData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [refreshing, setrefreshing] = useState(false);
    const fetchTasks = async () => {
        try{
            setLoading(true)
            const res = await getActiveTasks();
            if(res){
                setTaskData(res.data);
            }
            setLoading(false)
        }catch (err: any){
            setLoading(false);
            Toast.show(`Unable to fetch tasks !`, {
                duration: Toast.durations.LONG,
            });
            setError(true);
        }

    }
    useEffect(() => {
        fetchTasks();
    },[]);
    const onRefresh = () => {
        setrefreshing(true);
        setTimeout(async () => {
            const res = await getActiveTasks();
            if(res){
                setTaskData(res.data);
            }
            setrefreshing(false);
        }, 2000);
    };
    return(
        <>
        {loading ? (<View><Text>{error ? "Unable to fetch tasks" : "Fetching data ..."}</Text></View>) : (<FlatList
                data={taskData}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => !item ?
                    <View><Text>You haven't created any tasks yet.</Text></View>
                    :
                    <TaskCard item={item}/>}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />)}
        </>
    )
}

export default AllTasks;