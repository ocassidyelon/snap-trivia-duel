import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography } from '../../constants/theme';

export default function QuestionCard({ question, questionNumber, total }) {
    return (
        <View style={styles.card}>
            <Text style={styles.counter}>Question {questionNumber} of {total}</Text>
            <Text style={styles.question}>{question}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: radii.lg,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 3,
    },
    counter: {
        ...typography.caption,
        color: colors.pink,
        fontWeight: '700',
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    question: {
        ...typography.heading,
        lineHeight: 30,
    },
});