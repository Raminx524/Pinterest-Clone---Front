import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const CreatePin = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');

    const handleCreatePin = async () => {
        // Validate inputs
        if (!title || !description || !link) {
            Alert.alert("Input Error", "Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post('http://<YOUR_BACKEND_URL>/api/pin-images', {
                title,
                description,
                link
            });

            console.log("Pin created successfully:", response.data);
            Alert.alert("Success", "Pin created successfully!");
            // Clear the input fields after successful submission
            setTitle('');
            setDescription('');
            setLink('');
        } catch (error) {
            console.error("Error creating pin:", error);
            Alert.alert("Error", "Failed to create pin. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Pin</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Link"
                value={link}
                onChangeText={setLink}
                keyboardType="url" // Ensure URL keyboard is shown
            />
            <Pressable style={styles.button} onPress={handleCreatePin}>
                <Text style={styles.buttonText}>Create Pin</Text>
            </Pressable>
        </View>
    );
};

export default CreatePin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
