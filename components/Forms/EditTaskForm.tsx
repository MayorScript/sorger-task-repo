import {useState} from 'react';
import {Text, View, StyleSheet, Pressable, Button, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import {Formik} from 'formik';
import * as yup from 'yup';

const initialStateValues = {
    content: "",
    description: "",
    dueString: "",
    priority: ""
}
const taskValidationSchema = yup.object().shape({
    content: yup
        .string(),
    description: yup
        .string(),
    dueString: yup
        .string(),
    priority: yup
        .number()
})
const EditTaskForm = ({onFormSubmit}) => {
    return (
        <View style={styles.root}>
            <Formik
                validationSchema={taskValidationSchema}
                initialValues={initialStateValues}
                onSubmit={onFormSubmit}
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
                                name="dueString"
                                placeholder="Due Date"
                                onChangeText={handleChange("dueString")}
                                value={values.dueString}

                                onBlur={handleBlur("dueString")}
                            />
                            {errors.dueString && (
                                <Text style={styles.validationErrors}>{errors.dueString}</Text>
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
export default EditTaskForm;