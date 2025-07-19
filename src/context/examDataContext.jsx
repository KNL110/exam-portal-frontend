import { createContext, useContext, useState, useEffect } from 'react';
import { examDataApi } from '../api/examDataApi';
import { examResultApi } from '../api/examResultApi';

const examDataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useExamData = () => useContext(examDataContext);

export const ExamDataProvider = ({ children }) => {
    const [examsData, setExamData] = useState([]);
    const [responseData, setResponseData] = useState([]);

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
            setResponseData(data);
        } catch (error) {
            console.error('Error fetching responses:', error);
        }
    };

    return (
        <examDataContext.Provider value={{
            examsData,
            responseData
        }}>
            {children}
        </examDataContext.Provider>
    );
};
