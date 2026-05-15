import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, spacing, typography, radii } from '../../constants/theme';

export default function Play() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Pick your mode</Text>
                <Text style={styles.subtitle}>Hot-seat now, more coming soon</Text>

                <Pressable
                    style={({ pressed }) => [styles.modeCard, styles.pinkCard, pressed && styles.pressed]}
                    onPress={() => router.push('/game/setup')}
                >
                    <Text style={styles.modeTitle}>👥 Hot Seat</Text>
                    <Text style={styles.modeDesc}>Two players, one phone, take turns</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [styles.modeCard, styles.blueCard, styles.disabled, pressed && styles.pressed]}
                    disabled
                >
                    <Text style={styles.modeTitle}>🤖 vs Bot</Text>
                    <Text style={styles.modeDesc}>Coming if we have time</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content:   { flex: 1, padding: spacing.lg },
    title:     { ...typography.title, marginBottom: spacing.sm },
    subtitle:  { ...typography.body, color: colors.textMuted, marginBottom: spacing.xl },
    modeCard: {
        borderRadius: radii.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    pinkCard:  { backgroundColor: colors.pink },
    blueCard:  { backgroundColor: colors.blue },
    pressed:   { opacity: 0.85, transform: [{ scale: 0.98 }] },
    disabled:  { opacity: 0.5 },
    modeTitle: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', marginBottom: spacing.xs },
    modeDesc:  { fontSize: 14, color: '#FFFFFF', opacity: 0.9 },
});