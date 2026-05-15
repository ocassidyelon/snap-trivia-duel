export function computeStats(matches) {
    if (!matches || matches.length === 0) {
        return {
            totalMatches: 0,
            avgScore: 0,
            topCategory: '—',
            lastWinner: '—',
        };
    }

    // average total points scored per match (both players combined out of 10)
    const totalPoints = matches.reduce((sum, m) => sum + Number(m.s1) + Number(m.s2), 0);
    const avgScore = (totalPoints / matches.length).toFixed(1);

    // most-played category
    const catCount = {};
    matches.forEach(m => {
        catCount[m.categoryLabel] = (catCount[m.categoryLabel] || 0) + 1;
    });
    const topCategory = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0][0];

    return {
        totalMatches: matches.length,
        avgScore,
        topCategory,
        lastWinner: matches[0]?.winner || '—',
    };
}