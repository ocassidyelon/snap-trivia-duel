import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../../constants/theme';
import Avatar from '../ui/Avatar';

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
            <Avatar uri={player.avatar} size={40} color={active ? '#FFFFFF' : color} fallback="👤" />
            <View style={styles.text}>
                <Text style={[styles.name, active && styles.activeText]} numberOfLines={1}>
                    {player.name}
                </Text>
                <Text style={[styles.score, active && styles.activeText]}>{player.score}</Text>
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: radii.md,
        padding: spacing.sm,
        borderWidth: 2,
        borderColor: colors.border,
        gap: spacing.sm,
    },
    text:  { flex: 1 },
    name:  { fontSize: 13, fontWeight: '600', color: colors.text },
    score: { fontSize: 20, fontWeight: '800', color: colors.text },
    activeText: { color: '#FFFFFF' },
    vs: { fontSize: 14, fontWeight: '800', color: colors.textMuted },
});