export async function createExamApi(examData) {
    const token = localStorage.getItem('accessToken');

    const response = await fetch('http://localhost:3000/api/v1/exam/creatExam', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(examData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    alert('Exam created successfully!');
}


