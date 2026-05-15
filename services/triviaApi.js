const BASE_URL = 'https://opentdb.com/api.php';

// Open Trivia DB returns text like "Don&#039;t Stop Believin&#039;".
// This decodes those HTML entities back to readable text.
function decodeHtml(str) {
    return str
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&eacute;/g, 'é')
        .replace(/&Eacute;/g, 'É')
        .replace(/&rsquo;/g, '’')
        .replace(/&ldquo;/g, '“')
        .replace(/&rdquo;/g, '”');
}

// Fisher-Yates shuffle so the correct answer isn't always in the same spot.
function shuffle(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export async function fetchQuestions({ amount = 5, categoryId, difficulty = 'easy' }) {
    const params = new URLSearchParams({
        amount: String(amount),
        type: 'multiple',
        difficulty,
    });
    if (categoryId && categoryId !== 9) {
        // category 9 = "General Knowledge", we use it as our "Random" — no filter
        params.append('category', String(categoryId));
    }

    const url = `${BASE_URL}?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Trivia API returned ${res.status}`);
    }

    const data = await res.json();

    if (data.response_code !== 0 || !data.results?.length) {
        throw new Error('No questions returned from API');
    }

    return data.results.map((q, index) => ({
        id: index,
        question: decodeHtml(q.question),
        correctAnswer: decodeHtml(q.correct_answer),
        answers: shuffle([
            decodeHtml(q.correct_answer),
            ...q.incorrect_answers.map(decodeHtml),
        ]),
        category: decodeHtml(q.category),
        difficulty: q.difficulty,
    }));
}