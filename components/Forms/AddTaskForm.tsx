import {Text, View, StyleSheet, Pressable, Button, TextInput} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {createTask} from "../../services/taskService";
import Toast from "react-native-root-toast";

const initialStateValues = {
    content: "",
    description: "",
    due_string: "",
    priority: ""
}
const taskValidationSchema = yup.object().shape({
    content: yup
        .string()
        .required('Content is required'),
    description: yup
        .string()
        .required('Description is required'),
    due_string: yup
        .string()
        .required('Due Date is required'),
    priority: yup
        .number()
        .required('Priority is required')
})
const AddTaskForm = ({navigation}) => {
    const onTaskSubmit = async (values:any) => {
        try{
            console.log("val", values)
            const res = await createTask(values);
            if(res){
                Toast.show(`Task added successfully`, {
                    duration: Toast.durations.LONG,
                });
                navigation.navigate("HomeScreen");
            }
        }catch(err: any){
            Toast.show(`Oops! Task could not be added`, {
                duration: Toast.durations.LONG,
            });
        }
    }
    return (
        <View style={styles.root}>
            <Formik
                validationSchema={taskValidationSchema}
                initialValues={initialStateValues}
                onSubmit={values => onTaskSubmit(values)}
            >
                {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      isValid,
                      isSubmitting,
                  }) => (
                    <View>
                        <View style={styles.formFields}>
                            <TextInput
                                style={styles.input}
                                name="content"
                                placeholder="Content"
                                onChangeText={handleChange("content")}
                                value={values.content}
                                onBlur={handleBlur("content")}
                            />
                            {errors.content && (
                                <Text style={styles.validationErrors}>{errors.content}</Text>
                            )}
                            <TextInput
                                style={styles.input}
                                name="description"
                                placeholder="Description"
                                onChangeText={handleChange("description")}
                                value={values.description}
                                onBlur={handleBlur("description")}
                            />
                            {errors.description && (
                                <Text style={styles.validationErrors}>{errors.description}</Text>
                            )}
                            <TextInput
                                style={styles.input}
                                name="due_string"
                                placeholder="Due Date. Example - tomorrow at 12:00"
                                onChangeText={handleChange("due_string")}
                                value={values.due_string}

                                onBlur={handleBlur("due_string")}
                            />
                            {errors.due_string && (
                                <Text style={styles.validationErrors}>{errors.due_string}</Text>
                            )}
                            <TextInput
                                style={styles.input}
                                name="priority"
                                placeholder="Priority"
                                onChangeText={handleChange("priority")}
                                value={values.priority}
                                onBlur={handleBlur("priority")}
                            />
                            {errors.priority && (
                                <Text style={styles.validationErrors}>{errors.priority}</Text>
                            )}
                        </View>
                        <View style={styles.buttonFooter}>
                            <Button
                                onPress={handleSubmit}
                                title={isSubmitting ? "Please wait..." : "Submit"}
                                style={styles.button}
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        padding: 10,
        width: '100%',
    },
    input: {
        height: 40,
        borderRadius: 50,
        //borderColor: 'rgba(255, 255, 255, 0.29)',
        //borderWidth: 1,
        backgroundColor: "grey",
        // opacity: 0.2,
        fontSize: 16,
        fontWeight: "400",
        fontFamily: "Helvetica",
        marginVertical: 10,
        paddingHorizontal: 15,
        //justifyContent: 'space-around',
        alignItems: "center",
        flexDirection: "row",
    },
    formFields:{
        justifyContent: 'space-around',
    },
    buttonFooter:{
        marginTop: 10,
        alignItems: 'center'
    },
    button:{
        //backgroundColor: 'blue'
    },
    validationErrors: {
        color: 'red',
        fontSize: 10,
        textAlign: 'center'
    }
})
export default AddTaskForm;