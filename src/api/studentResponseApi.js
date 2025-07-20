export const getStudentResponsesApi = async () => {
    const token = localStorage.getItem('accessToken');
    const identifier = localStorage.getItem('identifier');
    
    const response = await fetch(`http://localhost:3000/api/v1/exam/examResult/${identifier}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }
    
    return result.data;
}

// export async function getExamByIdApi(examId) {
//     const token = localStorage.getItem('accessToken');

//     const response = await fetch(`http://localhost:3000/api/v1/exam/getExam/${examId}`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         },
//     });

//     const result = await response.json();

//     if (!response.ok) {
//         throw new Error(result.message || `HTTP error! status: ${response.status}`);
//     }

//     return result.data;
// }
