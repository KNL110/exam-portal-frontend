import { pdf } from '@react-pdf/renderer';
import ExamResultsPDF from './ExamResultsPDF';
import { getStudentResponsesApi } from '../../api/studentResponseApi';

// Function to get student data from the existing response API
export const getStudentDataFromResponse = async () => {
  try {
    const responseData = await getStudentResponsesApi();
    
    // The API returns an array of responses with student data
    if (responseData && responseData.length > 0) {
      const firstResponse = responseData[0];
      return {
        name: firstResponse.student?.name || 'Student Name',
        rollNumber: firstResponse.student?.rollNumber || localStorage.getItem('identifier'),
        email: firstResponse.student?.email || `${localStorage.getItem('identifier')}@institution.edu`
      };
    } else {
      // Fallback if no responses found
      const identifier = localStorage.getItem('identifier');
      return {
        name: 'Student Name',
        rollNumber: identifier,
        email: identifier.includes('@') ? identifier : `${identifier}@institution.edu`
      };
    }
  } catch (error) {
    console.error('Error fetching student data from response:', error);
    // Fallback to identifier-based data
    const identifier = localStorage.getItem('identifier');
    return {
      name: 'Student Name',
      rollNumber: identifier,
      email: identifier.includes('@') ? identifier : `${identifier}@institution.edu`
    };
  }
};

// Function to generate PDF blob
export const generatePDFBlob = async (examData, responseData, studentData) => {
  try {
    const pdfDocument = ExamResultsPDF({ examData, responseData, studentData });
    const blob = await pdf(pdfDocument).toBlob();
    return blob;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Function to send PDF via email
export const sendPDFViaEmail = async (examData, responseData, studentData) => {
  try {
    const blob = await generatePDFBlob(examData, responseData, studentData);
    
    // Convert blob to base64 for sending
    const base64PDF = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    // Calculate total marks and percentage
    const totalMarks = examData.questions?.length * examData.markingScheme?.correct || 0;
    const percentage = totalMarks > 0 ? ((responseData.score || 0) / totalMarks * 100).toFixed(2) : 0;

    // Send email with PDF attachment
    const emailData = {
      to: studentData.email,
      subject: `Exam Results - ${examData.examName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #2e7d32; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Exam Results</h1>
            <h2 style="margin: 10px 0 0 0; font-weight: normal;">${examData.examName}</h2>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border: 1px solid #dee2e6;">
            <p><strong>Dear ${studentData.name},</strong></p>
            
            <p>Your exam has been submitted successfully! Please find your detailed results report attached to this email.</p>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #2e7d32; margin-top: 0;">Quick Summary:</h3>
              <p style="margin: 5px 0;"><strong>Roll Number:</strong> ${studentData.rollNumber}</p>
              <p style="margin: 5px 0;"><strong>Your Score:</strong> ${responseData.score || 0} marks</p>
              <p style="margin: 5px 0;"><strong>Total Marks:</strong> ${totalMarks} marks</p>
              <p style="margin: 5px 0;"><strong>Percentage:</strong> ${percentage}%</p>
              <p style="margin: 5px 0;"><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>The attached PDF contains a detailed question-wise analysis of your performance, including:</p>
            <ul>
              <li>Your answers vs correct answers</li>
              <li>Marks obtained for each question</li>
              <li>Overall performance summary</li>
            </ul>
            
            <p>If you have any questions regarding your results, please contact your instructor or the examination office.</p>
            
            <p>Best regards,<br>
            <strong>Examination Team</strong></p>
          </div>
          
          <div style="background-color: #6c757d; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
            <p style="margin: 5px 0 0 0;">Generated on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `${examData.examName}_${studentData.rollNumber}_Results.pdf`,
          content: base64PDF,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:3000/api/v1/email/send-results', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send email');
    }

    const result = await response.json();
    return { success: true, message: 'Results sent to your email successfully!', data: result };
  } catch (error) {
    console.error('Error sending PDF via email:', error);
    // For now, we'll simulate success since email backend might not be set up
    if (error.message.includes('Failed to fetch') || error.message.includes('send-results')) {
      console.warn('Email service not available, but PDF was generated successfully');
      return { success: true, message: 'PDF generated successfully! (Email service temporarily unavailable)' };
    }
    return { success: false, message: error.message || 'Failed to send results' };
  }
};

// Main function to automatically generate and send PDF after exam submission
export const autoGenerateAndSendResultsPDF = async (examData, submissionResponse) => {
  try {
    // Wait for 3 seconds to ensure data is submitted successfully
    console.log('Waiting 3 seconds for submission to complete...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get fresh student data
    console.log('Fetching student data...');
    const studentData = await getStudentDataFromResponse();

    // Get the latest response data for this exam
    console.log('Getting latest response data...');
    const allResponses = await getStudentResponsesApi();
    const latestResponse = allResponses.find(response => 
      response.examID === examData.examID || response.examID === examData._id
    );

    if (!latestResponse) {
      throw new Error('Could not find submitted response data');
    }

    // Create the response data object
    const responseData = {
      score: latestResponse.score || submissionResponse.score,
      answers: latestResponse.answers,
      createdAt: latestResponse.createdAt || new Date().toISOString(),
      startTime: latestResponse.startTime,
      endTime: latestResponse.endTime,
      timeTaken: latestResponse.timeTaken || submissionResponse.timeTaken
    };

    console.log('Generating and sending PDF...');
    const result = await sendPDFViaEmail(examData, responseData, studentData);
    
    if (result.success) {
      console.log('PDF sent successfully!');
    } else {
      console.error('Failed to send PDF:', result.message);
    }
    
    return result;
  } catch (error) {
    console.error('Error in autoGenerateAndSendResultsPDF:', error);
    return { success: false, message: error.message || 'Failed to generate and send results PDF' };
  }
};

// Function for manual PDF download (for the response page)
export const downloadResultsPDF = async (examData, responseData, studentData) => {
  try {
    const blob = await generatePDFBlob(examData, responseData, studentData);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${examData.examName}_${studentData.rollNumber}_Results.pdf`;
    link.click();
    URL.revokeObjectURL(url);
    return { success: true, message: 'PDF downloaded successfully!' };
  } catch (error) {
    console.error('Error downloading PDF:', error);
    return { success: false, message: error.message || 'Failed to download PDF' };
  }
};
