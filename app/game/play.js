import { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, spacing, typography, radii } from '../../constants/theme';
import { fetchQuestions } from '../../services/triviaApi';
import QuestionCard from '../../components/game/QuestionCard';
import AnswerButton from '../../components/game/AnswerButton';
import Timer from '../../components/game/Timer';
import ScoreHeader from '../../components/game/ScoreHeader';
import useImagePicker from '../../hooks/useImagePicker';

const QUESTION_COUNT = 5;
const TIMER_SECONDS = 30;

export default function PlayGame() {
    const { p1, p2, a1, a2, categoryId, categoryLabel } = useLocalSearchParams();
    const { takePhoto } = useImagePicker();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [activePlayer, setActivePlayer] = useState(1);
    const [scores, setScores] = useState({ 1: 0, 2: 0 });
    const [avatars, setAvatars] = useState({ 1: a1 || null, 2: a2 || null });
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const advanceTimer = useRef(null);

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

        return () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); };
    }, [categoryId]);

    const currentQuestion = questions[questionIndex];

    const goToNextQuestion = (gotItRight) => {
        const newScores = {
            ...scores,
            [activePlayer]: scores[activePlayer] + (gotItRight ? 1 : 0),
        };

        const isLast = questionIndex >= QUESTION_COUNT - 1;
        if (isLast) {
            router.replace({
                pathname: '/game/results',
                params: {
                    p1, p2,
                    s1: String(newScores[1]),
                    s2: String(newScores[2]),
                    categoryLabel,
                },
            });
        } else {
            setScores(newScores);
            setQuestionIndex(i => i + 1);
            setActivePlayer(p => (p === 1 ? 2 : 1));
            setSelectedAnswer(null);
        }
    };

    const scheduleAdvance = (gotItRight, delayMs = 2500) => {
        if (advanceTimer.current) clearTimeout(advanceTimer.current);
        advanceTimer.current = setTimeout(() => goToNextQuestion(gotItRight), delayMs);
    };

    const handleAnswer = (answer) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(answer);
        const correct = answer === currentQuestion.correctAnswer;
        scheduleAdvance(correct);
    };

    const handleTimeout = () => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer('__timeout__');
        scheduleAdvance(false);
    };

    const handleSnapReaction = async () => {
        if (advanceTimer.current) clearTimeout(advanceTimer.current);
        const uri = await takePhoto();
        if (uri) setAvatars(prev => ({ ...prev, [activePlayer]: uri }));
        const correct = selectedAnswer === currentQuestion?.correctAnswer;
        scheduleAdvance(correct, 500);
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
                <Pressable onPress={() => router.back()} style={[styles.btn, { marginTop: 20 }]}>
                    <Text style={styles.btnText}>Back</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    const answered = selectedAnswer !== null;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScoreHeader
                    player1={{ name: p1, score: scores[1], avatar: avatars[1] }}
                    player2={{ name: p2, score: scores[2], avatar: avatars[2] }}
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

                {answered && (
                    <Pressable onPress={handleSnapReaction} style={styles.snapBtn}>
                        <Text style={styles.snapBtnText}>📸 Snap your reaction</Text>
                    </Pressable>
                )}
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
    snapBtn: {
        marginTop: spacing.md,
        backgroundColor: colors.blueLight,
        borderRadius: radii.md,
        padding: spacing.md,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.blue,
    },
    snapBtnText: { fontSize: 15, fontWeight: '700', color: colors.blueDark },
    btn:     { backgroundColor: colors.pink, padding: spacing.md, borderRadius: radii.md },
    btnText: { color: '#FFF', fontWeight: '700' },
});