import { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, spacing, typography } from '../../constants/theme';
import { fetchQuestions } from '../../services/triviaApi';
import QuestionCard from '../../components/game/QuestionCard';
import AnswerButton from '../../components/game/AnswerButton';
import Timer from '../../components/game/Timer';
import ScoreHeader from '../../components/game/ScoreHeader';

const QUESTION_COUNT = 5;
const TIMER_SECONDS = 30;

export default function PlayGame() {
    const { p1, p2, categoryId } = useLocalSearchParams();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [activePlayer, setActivePlayer] = useState(1);
    const [scores, setScores] = useState({ 1: 0, 2: 0 });
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const advancing = useRef(false);

    useEffect(() => {
        (async () => {
            try {
                const q = await fetchQuestions({
                    amount: QUESTION_COUNT,
                    categoryId: Number(categoryId),
                    difficulty: 'easy',
                });
                setQuestions(q);
                setLoading(false);
            } catch (e) {
                setError(e.message || 'Could not load questions');
                setLoading(false);
            }
        })();
    }, [categoryId]);

    const currentQuestion = questions[questionIndex];

    const advance = (gotItRight) => {
        if (advancing.current) return;
        advancing.current = true;

        if (gotItRight) {
            setScores(prev => ({ ...prev, [activePlayer]: prev[activePlayer] + 1 }));
        }

        setTimeout(() => {
            const isLast = questionIndex >= QUESTION_COUNT - 1;
            if (isLast) {
                router.replace({
                    pathname: '/game/results',
                    params: {
                        p1, p2,
                        // include the just-earned point if applicable
                        s1: String(scores[1] + (gotItRight && activePlayer === 1 ? 1 : 0)),
                        s2: String(scores[2] + (gotItRight && activePlayer === 2 ? 1 : 0)),
                    },
                });
            } else {
                setQuestionIndex(i => i + 1);
                setActivePlayer(p => (p === 1 ? 2 : 1));
                setSelectedAnswer(null);
                advancing.current = false;
            }
        }, 1500);
    };

    const handleAnswer = (answer) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(answer);
        const correct = answer === currentQuestion.correctAnswer;
        advance(correct);
    };

    const handleTimeout = () => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer('__timeout__');
        advance(false);
    };

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={colors.pink} />
                <Text style={styles.loadingText}>Loading questions…</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>😕 {error}</Text>
                <Text style={[styles.loadingText, { marginTop: 12 }]}>
                    Check your internet and tap Back to retry.
                </Text>
            </SafeAreaView>
        );
    }

    const answered = selectedAnswer !== null;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScoreHeader
                    player1={{ name: p1, score: scores[1] }}
                    player2={{ name: p2, score: scores[2] }}
                    activePlayer={activePlayer}
                />

                <Timer
                    duration={TIMER_SECONDS}
                    onExpire={handleTimeout}
                    resetKey={questionIndex}
                />

                <QuestionCard
                    question={currentQuestion.question}
                    questionNumber={questionIndex + 1}
                    total={QUESTION_COUNT}
                />

                {currentQuestion.answers.map((answer) => {
                    let state = 'idle';
                    if (answered) {
                        if (answer === currentQuestion.correctAnswer) state = 'correct';
                        else if (answer === selectedAnswer)           state = 'wrong';
                        else                                          state = 'revealed';
                    }
                    return (
                        <AnswerButton
                            key={answer}
                            answer={answer}
                            onPress={() => handleAnswer(answer)}
                            state={state}
                            disabled={answered}
                        />
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content:   { flex: 1, padding: spacing.lg },
    center:    { alignItems: 'center', justifyContent: 'center' },
    loadingText: { ...typography.body, color: colors.textMuted, marginTop: spacing.md },
    errorText:   { ...typography.heading, color: colors.danger, textAlign: 'center' },
});