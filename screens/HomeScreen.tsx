import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Theme/Themed';
import { RootTabScreenProps } from '../types';
import AllTasks from "../components/templates/AllTasks";

export default function HomeScreen({ navigation }: RootTabScreenProps<'HomeScreen'>) {
    return (
        <View style={styles.container}>
            <AllTasks />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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
