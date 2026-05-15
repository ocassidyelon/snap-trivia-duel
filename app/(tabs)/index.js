import { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { colors, spacing, typography, radii } from '../../constants/theme';
import StatCard from '../../components/ui/StatCard';
import { getMatches } from '../../services/storage';
import { computeStats } from '../../services/stats';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalMatches: 0, avgScore: 0, topCategory: '—', lastWinner: '—',
    });

    // re-load every time the tab becomes visible
    useFocusEffect(useCallback(() => {
        (async () => {
            const matches = await getMatches();
            setStats(computeStats(matches));
        })();
    }, []));

    const empty = stats.totalMatches === 0;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.greeting}>Hey there 👋</Text>
                <Text style={styles.title}>Snap Trivia Duel</Text>
                <Text style={styles.subtitle}>Ready to test your pop culture brain?</Text>

                <View style={styles.statsGrid}>
                    <StatCard label="Matches"      value={stats.totalMatches} color={colors.pink} />
                    <StatCard label="Avg Score"    value={`${stats.avgScore}/10`} color={colors.blue} />
                    <StatCard label="Top Category" value={stats.topCategory}  color={colors.pink} />
                    <StatCard label="Last Winner"  value={stats.lastWinner}   color={colors.blue} />
                </View>

                <View style={styles.cta}>
                    <Text style={styles.ctaText}>
                        {empty
                            ? 'No matches yet — tap Play to start your first duel!'
                            : `${stats.totalMatches} ${stats.totalMatches === 1 ? 'match' : 'matches'} played on this phone 🎉`}
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