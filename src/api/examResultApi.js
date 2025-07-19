export async function examResultApi() {
    const token = localStorage.getItem('accessToken');

    const response = await fetch('http://localhost:3000/api/v1/exam/examResult', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });

    const responses = await response.json();

    if (!response.ok) {
        throw new Error(responses.message || `HTTP error! status: ${response.status}`);
    }

    return responses.data;
}