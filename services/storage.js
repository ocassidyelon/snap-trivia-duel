import AsyncStorage from '@react-native-async-storage/async-storage';

const MATCHES_KEY = 'snap-trivia:matches';

export async function saveMatch(match) {
    // match: { p1, p2, s1, s2, categoryLabel, winner, timestamp }
    try {
        const existing = await getMatches();
        const updated = [match, ...existing].slice(0, 50); // keep most recent 50
        await AsyncStorage.setItem(MATCHES_KEY, JSON.stringify(updated));
    } catch (err) {
        console.warn('Could not save match:', err);
    }
}

export async function getMatches() {
    try {
        const raw = await AsyncStorage.getItem(MATCHES_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.warn('Could not read matches:', err);
        return [];
    }
}

export async function clearMatches() {
    try {
        await AsyncStorage.removeItem(MATCHES_KEY);
    } catch (err) {
        console.warn('Could not clear matches:', err);
    }
}