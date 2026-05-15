import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, spacing, typography, radii } from '../../constants/theme';

export default function Results() {
    const { p1, p2, s1, s2 } = useLocalSearchParams();
    const score1 = Number(s1);
    const score2 = Number(s2);

    let winnerText, winnerColor;
    if (score1 > score2) {
        winnerText = `🏆 ${p1} wins!`;
        winnerColor = colors.pink;
    } else if (score2 > score1) {
        winnerText = `🏆 ${p2} wins!`;
        winnerColor = colors.blue;
    } else {
        winnerText = "🤝 It's a tie!";
        winnerColor = colors.text;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={[styles.winner, { color: winnerColor }]}>{winnerText}</Text>

                <View style={styles.scoreboard}>
                    <View style={[styles.scoreBlock, { borderColor: colors.pink }]}>
                        <Text style={styles.scoreName}>{p1}</Text>
                        <Text style={[styles.scoreValue, { color: colors.pink }]}>{score1}</Text>
                    </View>
                    <View style={[styles.scoreBlock, { borderColor: colors.blue }]}>
                        <Text style={styles.scoreName}>{p2}</Text>
                        <Text style={[styles.scoreValue, { color: colors.blue }]}>{score2}</Text>
                    </View>
                </View>

                <Pressable
                    style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && { opacity: 0.9 }]}
                    onPress={() => router.replace('/game/setup')}
                >
                    <Text style={styles.btnText}>Play Again</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [styles.btn, styles.btnSecondary, pressed && { opacity: 0.9 }]}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text style={[styles.btnText, { color: colors.text }]}>Back to Home</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content:   { flex: 1, padding: spacing.xl, justifyContent: 'center' },
    winner:    { ...typography.title, fontSize: 36, textAlign: 'center', marginBottom: spacing.xxl },
    scoreboard: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.xxl,
    },
    scoreBlock: {
        flex: 1,
        backgroundColor: colors.card,
        borderRadius: radii.lg,
        padding: spacing.lg,
        borderWidth: 3,
        alignItems: 'center',
    },
    scoreName:  { ...typography.body, fontWeight: '600', marginBottom: spacing.sm },
    scoreValue: { fontSize: 48, fontWeight: '800' },
    btn: {
        borderRadius: radii.lg,
        padding: spacing.lg,
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    btnPrimary:   { backgroundColor: colors.pink },
    btnSecondary: { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.border },
    btnText:      { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});