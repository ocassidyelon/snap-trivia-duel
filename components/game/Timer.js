import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors, radii } from '../../constants/theme';

export default function Timer({ duration, onExpire, resetKey }) {
    const progress = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        progress.setValue(1);
        Animated.timing(progress, {
            toValue: 0,
            duration: duration * 1000,
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished) onExpire?.();
        });
        // resetKey changing restarts the timer for the next question
    }, [resetKey]);

    const width = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const backgroundColor = progress.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [colors.danger, colors.pink, colors.blue],
    });

    return (
        <View style={styles.track}>
            <Animated.View style={[styles.bar, { width, backgroundColor }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        height: 8,
        backgroundColor: colors.border,
        borderRadius: radii.pill,
        overflow: 'hidden',
        marginBottom: 16,
    },
    bar: { height: '100%', borderRadius: radii.pill },
});