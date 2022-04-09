import {useState, useEffect} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {getActiveTasks} from "../../services/taskService";
import {TaskCard} from "../TaskCard";


const  AllTasks = () => {
    const [taskData, setTaskData] = useState([]);
    const fetchTasks = async () => {
        const res = await getActiveTasks();
        setTaskData(res.data);
        console.log("data",taskData);
    }
    useEffect(() => {
        fetchTasks();
    },[])
    return(
        <FlatList
            data={taskData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaskCard item={item} />}
            //ItemSeparatorComponent={() => <Separator />}
        />
    )
}

const styles = StyleSheet.create({

});

export default AllTasks;