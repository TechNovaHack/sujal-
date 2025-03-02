// Gemini AI Integration
document.getElementById('gemini-submit').addEventListener('click', async () => {
    const prompt = document.getElementById('gemini-prompt').value;
    const responseContainer = document.getElementById('gemini-response');

    responseContainer.textContent = 'Loading...';

    try {
        const res = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();

        if (data.candidates && data.candidates[0]) {
            const geminiReply = data.candidates[0].content.parts[0].text;
            responseContainer.textContent = geminiReply;
        } else {
            responseContainer.textContent = 'No response from Gemini AI.';
        }
    } catch (err) {
        console.error(err);
        responseContainer.textContent = 'Error communicating with Gemini AI.';
    }
});
