import { SiteCard } from '../../components/SiteCard'
import { useNavigate } from 'react-router-dom'
import { ResponseCard } from '../../components/ResponseCard'
import { useState } from 'react'
import { downloadResultsPDF, getStudentDataFromResponse } from '../../utils/pdf/pdfUtils'

export const Response = () => {

    const navigate = useNavigate();
    const [isDownloading, setIsDownloading] = useState(false);

    const response = JSON.parse(sessionStorage.getItem('selectedResponse')) || {};
    const exam = JSON.parse(sessionStorage.getItem('selectedResponseExam')) || {};

    // Calculate total marks based on exam marking scheme and questions
    const calculateTotalMarks = () => {
        if (!exam.questions || !exam.markingScheme) return 0;
        return exam.questions.length * exam.markingScheme.correct;
    };
    
    const totalMarks = calculateTotalMarks();
    const percentage = totalMarks > 0 ? ((response.score || 0) / totalMarks * 100).toFixed(2) : 0;

    const handleDownloadPDF = async () => {
        if (isDownloading) return;
        
        setIsDownloading(true);
        try {
            const studentData = await getStudentDataFromResponse();
            const result = await downloadResultsPDF(exam, response, studentData);
            
            if (result.success) {
                alert('PDF downloaded successfully!');
            } else {
                alert('Failed to download PDF: ' + result.message);
            }
        } catch (error) {
            console.error('Error downloading PDF:', error);
            alert('Error downloading PDF: ' + error.message);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <SiteCard id="resultsPage">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Exam Results - {exam.examName}</h2>
                </div>
                <div id="resultsContent">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value">{response.score || 0}</div>
                            <div className="stat-label">Your Marks</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{totalMarks}</div>
                            <div className="stat-label">Total Marks</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{percentage}%</div>
                            <div className="stat-label">Percentage</div>
                        </div>
                    </div>

                    <h3 style={{ color: '#2e7d32', marginTop: '30px', marginBottom: '20px' }}>Detailed Response</h3>
                    
                    {response.answers && response.answers.map((answer, index) => {
                        const question = exam.questions?.find(q => q._id === answer.questionID);
                        return question ? (
                            <ResponseCard 
                                key={index} 
                                question={question}
                                answer={answer}
                                examMarkingScheme={exam.markingScheme}
                            />
                        ) : null;
                    })}

                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                    >
                        {isDownloading ? 'Generating PDF...' : 'Download PDF Report'}
                    </button>
                    <button type="button" className="btn" onClick={() => navigate("/student/examHistory")}>Back to Exam History</button>
                </div>
            </div>
        </SiteCard>
    )
}
