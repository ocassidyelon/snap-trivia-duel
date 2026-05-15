import { useState, useCallback } from 'react';
import { ScrollView, View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { colors, spacing, typography, radii } from '../../constants/theme';
import { getMatches, clearMatches } from '../../services/storage';

export default function Profile() {
    const [matches, setMatches] = useState([]);

    useFocusEffect(useCallback(() => {
        (async () => setMatches(await getMatches()))();
    }, []));

    const handleClear = () => {
        Alert.alert(
            'Clear match history?',
            'This deletes all match records from this phone. This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear', style: 'destructive',
                    onPress: async () => { await clearMatches(); setMatches([]); },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>🎮</Text>
                    </View>
                    <Text style={styles.name}>Snap Trivia Duel</Text>
                    <Text style={styles.tagline}>
                        {matches.length} {matches.length === 1 ? 'match' : 'matches'} played
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Recent Matches</Text>

                {matches.length === 0 ? (
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No matches yet — play a duel and come back!</Text>
                    </View>
                ) : (
                    matches.slice(0, 10).map((m, idx) => (
                        <View key={idx} style={styles.matchRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.matchTitle}>
                                    {m.p1} vs {m.p2}
                                </Text>
                                <Text style={styles.matchMeta}>
                                    {m.categoryLabel} • {new Date(m.timestamp).toLocaleDateString()}
                                </Text>
                            </View>
                            <Text style={styles.matchScore}>
                                <Text style={{ color: colors.pink }}>{m.s1}</Text>
                                {' – '}
                                <Text style={{ color: colors.blue }}>{m.s2}</Text>
                            </Text>
                        </View>
                    ))
                )}

                {matches.length > 0 && (
                    <Pressable
                        onPress={handleClear}
                        style={({ pressed }) => [styles.clearBtn, pressed && { opacity: 0.8 }]}
                    >
                        <Text style={styles.clearBtnText}>Clear History</Text>
                    </Pressable>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll:    { padding: spacing.lg, paddingBottom: spacing.xxl },
    header:    { alignItems: 'center', marginBottom: spacing.xl, marginTop: spacing.md },
    avatar: {
        width: 100, height: 100, borderRadius: 50,
        backgroundColor: colors.pinkLight,
        alignItems: 'center', justifyContent: 'center',
        marginBottom: spacing.md,
        borderWidth: 3, borderColor: colors.pink,
    },
    avatarText: { fontSize: 44 },
    name:       { ...typography.title, marginBottom: spacing.xs },
    tagline:    { ...typography.caption },
    sectionTitle: {
        ...typography.heading,
        fontSize: 18,
        marginBottom: spacing.md,
    },
    empty: {
        backgroundColor: colors.pinkLight,
        borderRadius: radii.md,
        padding: spacing.lg,
        alignItems: 'center',
    },
    emptyText: { ...typography.body, color: colors.pinkDark, textAlign: 'center' },
    matchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: radii.md,
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    matchTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
    matchMeta:  { fontSize: 12, color: colors.textMuted, marginTop: 2 },
    matchScore: { fontSize: 18, fontWeight: '800' },
    clearBtn: {
        marginTop: spacing.xl,
        padding: spacing.md,
        borderRadius: radii.md,
        borderWidth: 2,
        borderColor: colors.danger,
        alignItems: 'center',
    },
    clearBtnText: { color: colors.danger, fontWeight: '700' },
});