import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../../constants/theme';

export default function StatCard({ label, value, color = colors.pink }) {
    return (
        <View style={[styles.card, { borderLeftColor: color }]}>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.value, { color }]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: colors.card,
        borderRadius: radii.md,
        padding: spacing.md,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.textMuted,
        marginBottom: spacing.xs,
    },
    value: {
        fontSize: 24,
        fontWeight: '800',
    },
});