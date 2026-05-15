import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../../constants/theme';

export default function ScoreHeader({ player1, player2, activePlayer }) {
    return (
        <View style={styles.row}>
            <PlayerBlock player={player1} active={activePlayer === 1} color={colors.pink} />
            <Text style={styles.vs}>VS</Text>
            <PlayerBlock player={player2} active={activePlayer === 2} color={colors.blue} />
        </View>
    );
}

function PlayerBlock({ player, active, color }) {
    return (
        <View style={[styles.block, active && { backgroundColor: color, borderColor: color }]}>
            <Text style={[styles.name, active && styles.activeText]} numberOfLines={1}>
                {player.name}
            </Text>
            <Text style={[styles.score, active && styles.activeText]}>{player.score}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
        gap: spacing.sm,
    },
    block: {
        flex: 1,
        backgroundColor: colors.card,
        borderRadius: radii.md,
        padding: spacing.md,
        borderWidth: 2,
        borderColor: colors.border,
        alignItems: 'center',
    },
    name:  { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 2 },
    score: { fontSize: 22, fontWeight: '800', color: colors.text },
    activeText: { color: '#FFFFFF' },
    vs: { fontSize: 14, fontWeight: '800', color: colors.textMuted, paddingHorizontal: spacing.xs },
});