import {useState, useEffect, useCallback} from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import {getActiveTasks} from "../../services/taskService";
import {TaskCard} from "../TaskCard";


const  AllTasks = () => {
    const [taskData, setTaskData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchTasks = async () => {
        try{
            setLoading(true)
            const res = await getActiveTasks();
            setTaskData(res.data);
            console.log("dat",taskData);
            setLoading(false)
        }catch (err: any){
            setLoading(false)
        }

    }
    useEffect(() => {
        fetchTasks();
    },[])
    return(
        <>
        {loading ? (<View><Text>Fetching data ...</Text></View>) : (<FlatList
                data={taskData}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <TaskCard item={item}/>}
                //ItemSeparatorComponent={() => <Separator />}
            />)}
        </>
    )
}

const styles = StyleSheet.create({

});

export default AllTasks;