import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, spacing, typography, radii } from '../../constants/theme';
import { CATEGORIES } from '../../constants/categories';
import useImagePicker from '../../hooks/useImagePicker';
import Avatar from '../../components/ui/Avatar';

export default function Setup() {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [avatar1, setAvatar1] = useState(null);
    const [avatar2, setAvatar2] = useState(null);
    const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
    const { takePhoto } = useImagePicker();

    const canStart = player1.trim().length > 0 && player2.trim().length > 0;

    const snapFor = async (player) => {
        const uri = await takePhoto();
        if (!uri) return;
        if (player === 1) setAvatar1(uri); else setAvatar2(uri);
    };

    const start = () => {
        if (!canStart) return;
        const cat = CATEGORIES.find(c => c.id === categoryId);
        router.push({
            pathname: '/game/play',
            params: {
                p1: player1.trim(),
                p2: player2.trim(),
                a1: avatar1 || '',
                a2: avatar2 || '',
                categoryId: String(categoryId),
                categoryLabel: cat.label,
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

                <PlayerRow
                    label="Player 1"
                    color={colors.pink}
                    name={player1}
                    onChange={setPlayer1}
                    avatar={avatar1}
                    onSnap={() => snapFor(1)}
                />

                <PlayerRow
                    label="Player 2"
                    color={colors.blue}
                    name={player2}
                    onChange={setPlayer2}
                    avatar={avatar2}
                    onSnap={() => snapFor(2)}
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

function PlayerRow({ label, color, name, onChange, avatar, onSnap }) {
    return (
        <View style={styles.playerRow}>
            <Pressable onPress={onSnap}>
                <Avatar uri={avatar} size={56} color={color} fallback="📸" />
            </Pressable>
            <View style={styles.playerInputs}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    style={[styles.input, { borderColor: color }]}
                    placeholder="Name…"
                    placeholderTextColor={colors.textMuted}
                    value={name}
                    onChangeText={onChange}
                    maxLength={16}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll:    { padding: spacing.lg, paddingBottom: spacing.xxl },
    back:      { marginBottom: spacing.md },
    backText:  { ...typography.body, color: colors.pink, fontWeight: '600' },
    title:     { ...typography.title, marginBottom: spacing.xs },
    subtitle:  { ...typography.body, color: colors.textMuted, marginBottom: spacing.xl },
    label:     { ...typography.caption, fontWeight: '700', marginBottom: spacing.xs },
    input: {
        backgroundColor: colors.card,
        borderRadius: radii.md,
        padding: spacing.md,
        borderWidth: 2,
        fontSize: 16,
        color: colors.text,
    },
    playerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        marginBottom: spacing.md,
    },
    playerInputs: { flex: 1 },
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