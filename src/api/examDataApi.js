export async function examDataApi() {
    const token = localStorage.getItem('accessToken');

    const response = await fetch("http://localhost:3000/api/v1/exam/getExam", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }
    
    return result.data;
}