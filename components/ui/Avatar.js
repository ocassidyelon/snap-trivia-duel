import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';

export default function Avatar({ uri, size = 48, color = colors.pink, fallback = '👤' }) {
    const radius = size / 2;

    if (uri) {
        return (
            <Image
                source={{ uri }}
                style={[
                    styles.image,
                    { width: size, height: size, borderRadius: radius, borderColor: color },
                ]}
            />
        );
    }

    return (
        <View
            style={[
                styles.fallback,
                {
                    width: size, height: size, borderRadius: radius,
                    borderColor: color, backgroundColor: colors.pinkLight,
                },
            ]}
        >
            <Text style={{ fontSize: size * 0.5 }}>{fallback}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    image:    { borderWidth: 2 },
    fallback: { borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
});