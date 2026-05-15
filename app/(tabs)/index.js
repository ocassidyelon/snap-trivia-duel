import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radii } from '../../constants/theme';
import StatCard from '../../components/ui/StatCard';

export default function Dashboard() {
    const stats = {
        matchesPlayed: 0,
        winRate: 0,
        currentStreak: 0,
        bestCategory: '—',
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.greeting}>Hey there 👋</Text>
                <Text style={styles.title}>Snap Trivia Duel</Text>
                <Text style={styles.subtitle}>Ready to test your pop culture brain?</Text>

                <View style={styles.statsGrid}>
                    <StatCard label="Matches"   value={stats.matchesPlayed}     color={colors.pink} />
                    <StatCard label="Win Rate"  value={`${stats.winRate}%`}     color={colors.blue} />
                    <StatCard label="Streak"    value={stats.currentStreak}     color={colors.pink} />
                    <StatCard label="Best Topic" value={stats.bestCategory}     color={colors.blue} />
                </View>

                <View style={styles.cta}>
                    <Text style={styles.ctaText}>
                        No matches yet — tap Play to start your first duel!
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll:    { padding: spacing.lg },
    greeting:  { ...typography.caption, marginBottom: spacing.xs },
    title:     { ...typography.title, marginBottom: spacing.sm },
    subtitle:  { ...typography.body, color: colors.textMuted, marginBottom: spacing.xl },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    cta: {
        backgroundColor: colors.pinkLight,
        borderRadius: radii.lg,
        padding: spacing.lg,
        alignItems: 'center',
    },
    ctaText: {
        ...typography.body,
        color: colors.pinkDark,
        textAlign: 'center',
    },
});