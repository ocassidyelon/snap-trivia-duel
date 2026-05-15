import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../constants/theme';

export default function Profile() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>👤</Text>
                </View>
                <Text style={styles.name}>Player One</Text>
                <Text style={styles.tagline}>Edit profile coming in Sprint 3</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: {
        flex: 1,
        alignItems: 'center',
        padding: spacing.xl,
        paddingTop: spacing.xxl,
    },
    avatar: {
        width: 120, height: 120, borderRadius: 60,
        backgroundColor: colors.pinkLight,
        alignItems: 'center', justifyContent: 'center',
        marginBottom: spacing.lg,
        borderWidth: 3, borderColor: colors.pink,
    },
    avatarText: { fontSize: 48 },
    name:       { ...typography.title, marginBottom: spacing.xs },
    tagline:    { ...typography.caption },
});