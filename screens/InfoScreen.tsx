import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/Theme/EditScreenInfo';
import { Text, View } from '../components/Theme/Themed';
import { RootTabScreenProps } from '../types';

export default function InfoScreen({ navigation }: RootTabScreenProps<'InfoScreen'>) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>How to use</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <EditScreenInfo />
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
