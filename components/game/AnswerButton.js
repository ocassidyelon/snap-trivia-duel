import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../../constants/theme';

export default function AnswerButton({ answer, onPress, state = 'idle', disabled }) {
    // state: 'idle' | 'correct' | 'wrong' | 'revealed'
    const stateStyle = styles[state] || styles.idle;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                stateStyle,
                pressed && !disabled && styles.pressed,
                disabled && styles.disabled,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, state !== 'idle' && styles.textOnColor]}>
                {answer}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: radii.md,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderWidth: 2,
        minHeight: 56,
        justifyContent: 'center',
    },
    idle:     { backgroundColor: colors.card,    borderColor: colors.border },
    correct:  { backgroundColor: colors.success, borderColor: colors.success },
    wrong:    { backgroundColor: colors.danger,  borderColor: colors.danger },
    revealed: { backgroundColor: colors.success, borderColor: colors.success, opacity: 0.6 },
    pressed:  { opacity: 0.7, transform: [{ scale: 0.99 }] },
    disabled: { opacity: 0.85 },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        textAlign: 'center',
    },
    textOnColor: { color: '#FFFFFF' },
});