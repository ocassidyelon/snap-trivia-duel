import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, spacing, typography, radii } from '../../constants/theme';
import { CATEGORIES } from '../../constants/categories';

export default function Setup() {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);

    const canStart = player1.trim().length > 0 && player2.trim().length > 0;

    const start = () => {
        if (!canStart) return;
        router.push({
            pathname: '/game/play',
            params: {
                p1: player1.trim(),
                p2: player2.trim(),
                categoryId: String(categoryId),
            },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Pressable onPress={() => router.back()} style={styles.back}>
                    <Text style={styles.backText}>← Back</Text>
                </Pressable>

                <Text style={styles.title}>Hot Seat Setup</Text>
                <Text style={styles.subtitle}>Two players, one phone</Text>

                <Text style={styles.label}>Player 1</Text>
                <TextInput
                    style={[styles.input, { borderColor: colors.pink }]}
                    placeholder="Name…"
                    placeholderTextColor={colors.textMuted}
                    value={player1}
                    onChangeText={setPlayer1}
                    maxLength={16}
                />

                <Text style={styles.label}>Player 2</Text>
                <TextInput
                    style={[styles.input, { borderColor: colors.blue }]}
                    placeholder="Name…"
                    placeholderTextColor={colors.textMuted}
                    value={player2}
                    onChangeText={setPlayer2}
                    maxLength={16}
                />

                <Text style={[styles.label, { marginTop: spacing.lg }]}>Category</Text>
                <View style={styles.catGrid}>
                    {CATEGORIES.map(cat => {
                        const selected = cat.id === categoryId;
                        return (
                            <Pressable
                                key={cat.id}
                                onPress={() => setCategoryId(cat.id)}
                                style={[
                                    styles.catChip,
                                    selected && { backgroundColor: cat.color, borderColor: cat.color },
                                ]}
                            >
                                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                                <Text style={[styles.catLabel, selected && styles.catLabelSelected]}>
                                    {cat.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                <Pressable
                    onPress={start}
                    disabled={!canStart}
                    style={({ pressed }) => [
                        styles.startBtn,
                        !canStart && styles.startBtnDisabled,
                        pressed && canStart && { opacity: 0.9 },
                    ]}
                >
                    <Text style={styles.startBtnText}>Start Match</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll:    { padding: spacing.lg, paddingBottom: spacing.xxl },
    back:      { marginBottom: spacing.md },
    backText:  { ...typography.body, color: colors.pink, fontWeight: '600' },
    title:     { ...typography.title, marginBottom: spacing.xs },
    subtitle:  { ...typography.body, color: colors.textMuted, marginBottom: spacing.xl },
    label:     { ...typography.caption, fontWeight: '700', marginBottom: spacing.xs, marginTop: spacing.md },
    input: {
        backgroundColor: colors.card,
        borderRadius: radii.md,
        padding: spacing.md,
        borderWidth: 2,
        fontSize: 16,
        color: colors.text,
    },
    catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    catChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radii.pill,
        borderWidth: 2,
        borderColor: colors.border,
        gap: 6,
    },
    catEmoji: { fontSize: 18 },
    catLabel: { fontSize: 14, fontWeight: '600', color: colors.text },
    catLabelSelected: { color: '#FFFFFF' },
    startBtn: {
        backgroundColor: colors.pink,
        borderRadius: radii.lg,
        padding: spacing.lg,
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    startBtnDisabled: { backgroundColor: colors.border },
    startBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});