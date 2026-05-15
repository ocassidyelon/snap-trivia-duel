import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

export default function useImagePicker() {
    const [loading, setLoading] = useState(false);

    const takePhoto = async () => {
        setLoading(true);
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Camera permission needed',
                    'Snap Trivia Duel needs your camera for reaction snaps. You can enable it in Settings.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Open Settings', onPress: () => Linking.openSettings() },
                    ]
                );
                return null;
            }

            const result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.front,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.6,
            });

            if (result.canceled) return null;
            return result.assets[0].uri;
        } finally {
            setLoading(false);
        }
    };

    return { takePhoto, loading };
}