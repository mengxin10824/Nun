async function getLeaderboard(env) {
    try {
        const stmt = env.DB.prepare(
            'SELECT ID, REGION, NAME, COUNT, TIME FROM RANK ORDER BY COUNT DESC LIMIT 50'
        );
        const { results } = await stmt.run();
        return results;
    } catch (error) {
        console.log(error)
    }
}


export async function onRequest(context) {
    try {
        const results = await getLeaderboard(context.env);
        return new Response(JSON.stringify(results), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log(error)
        return new Response(error, { status: 500 });
    }
}