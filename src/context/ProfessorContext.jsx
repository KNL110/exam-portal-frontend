/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from 'react';
import { examDataApi } from '../api/examDataApi.js';
import { examResultApi } from '../api/examResultApi.js';
import { getStudentResponsesApi } from '../api/studentResponseApi.js'

const ProfessorContext = createContext();

export const useExamData = () => useContext(ProfessorContext);

export const ExamDataProvider = ({ children }) => {
    const [examsData, setExamData] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const [studentResponses, setStudentResponses] = useState([]);

    useEffect(() => {
        fetchExams();
        fetchResponses();
    }, []);

    const fetchExams = async () => {
        try {
            const data = await examDataApi();
            setExamData(data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const fetchResponses = async () => {
        try {
            const data = await examResultApi();
            const response = await getStudentResponsesApi();
            setResponseData(data);
            setStudentResponses(response);
            console.log(data);

        } catch (error) {
            console.error('Error fetching responses:', error);
        }
    };

    return (
        <ProfessorContext.Provider value={{
            examsData,
            responseData,
            studentResponses
        }}>
            {children}
        </ProfessorContext.Provider>
    );
};
