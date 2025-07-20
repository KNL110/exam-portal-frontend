import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: '2 solid #2e7d32',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  studentInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  studentInfoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    width: '40%',
    color: '#333333',
  },
  value: {
    fontSize: 12,
    width: '60%',
    color: '#555555',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 5,
  },
  statItem: {
    textAlign: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 10,
    color: '#666666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 15,
    marginTop: 10,
  },
  questionContainer: {
    marginBottom: 15,
    padding: 12,
    border: '1 solid #ddd',
    borderRadius: 5,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionType: {
    fontSize: 10,
    backgroundColor: '#f0f0f0',
    padding: '3 6',
    borderRadius: 3,
  },
  answerStatus: {
    fontSize: 10,
    padding: '3 8',
    borderRadius: 3,
    fontWeight: 'bold',
  },
  correct: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  incorrect: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  unattempted: {
    backgroundColor: '#e2e3e5',
    color: '#6c757d',
  },
  questionText: {
    fontSize: 11,
    marginBottom: 8,
    lineHeight: 1.4,
  },
  answerSection: {
    marginTop: 8,
  },
  answerRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  answerLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    width: '25%',
  },
  answerValue: {
    fontSize: 10,
    width: '75%',
  },
  correctAnswer: {
    color: '#28a745',
  },
  incorrectAnswer: {
    color: '#dc3545',
  },
  unattemptedAnswer: {
    color: '#6c757d',
  },
  marksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTop: '1 solid #eee',
  },
  marksLabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  marksValue: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  positiveMarks: {
    color: '#28a745',
  },
  negativeMarks: {
    color: '#dc3545',
  },
  zeroMarks: {
    color: '#6c757d',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 10,
    color: '#999999',
    borderTop: '1 solid #eee',
    paddingTop: 10,
  },
});

const ExamResultsPDF = ({ examData, responseData, studentData }) => {
  const calculateTotalMarks = () => {
    if (!examData.questions || !examData.markingScheme) return 0;
    return examData.questions.length * examData.markingScheme.correct;
  };

  const totalMarks = calculateTotalMarks();
  const percentage = totalMarks > 0 ? ((responseData.score || 0) / totalMarks * 100).toFixed(2) : 0;

  const getAnswerDisplay = (question, answer) => {
    if (question.questionType === 'MCQ') {
      return answer.selectedOptions && answer.selectedOptions.length > 0
        ? question.options[parseInt(answer.selectedOptions[0])]
        : 'Not answered';
    } else if (question.questionType === 'NAT') {
      return answer.numericalAnswer || 'Not answered';
    }
    return 'Not answered';
  };

  const getCorrectAnswerDisplay = (question) => {
    if (question.questionType === 'MCQ') {
      return question.options[question.correctOption];
    } else if (question.questionType === 'NAT') {
      return question.correctValue.toString();
    }
    return 'Unknown';
  };

  const getAnswerStatus = (question, answer) => {
    if (question.questionType === 'MCQ') {
      if (!answer.selectedOptions || answer.selectedOptions.length === 0) {
        return 'unattempted';
      }
      return parseInt(answer.selectedOptions[0]) === question.correctOption ? 'correct' : 'incorrect';
    } else if (question.questionType === 'NAT') {
      if (!answer.numericalAnswer) {
        return 'unattempted';
      }
      return parseFloat(answer.numericalAnswer) === question.correctValue ? 'correct' : 'incorrect';
    }
    return 'unattempted';
  };

  const getMarks = (question, answer) => {
    const status = getAnswerStatus(question, answer);
    if (status === 'correct') return examData.markingScheme.correct;
    if (status === 'incorrect') return examData.markingScheme.incorrect;
    return examData.markingScheme.unattempted;
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'correct': return '✓ Correct';
      case 'incorrect': return '✗ Incorrect';
      case 'unattempted': return '— Unattempted';
      default: return '';
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Exam Results Report</Text>
          <Text style={styles.subtitle}>{examData.examName}</Text>
        </View>

        {/* Student Information */}
        <View style={styles.studentInfo}>
          <View style={styles.studentInfoRow}>
            <Text style={styles.label}>Student Name:</Text>
            <Text style={styles.value}>{studentData.name}</Text>
          </View>
          <View style={styles.studentInfoRow}>
            <Text style={styles.label}>Roll Number:</Text>
            <Text style={styles.value}>{studentData.rollNumber}</Text>
          </View>
          <View style={styles.studentInfoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{studentData.email}</Text>
          </View>
          <View style={styles.studentInfoRow}>
            <Text style={styles.label}>Exam Date:</Text>
            <Text style={styles.value}>{new Date(responseData.createdAt || Date.now()).toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{responseData.score || 0}</Text>
            <Text style={styles.statLabel}>Your Marks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalMarks}</Text>
            <Text style={styles.statLabel}>Total Marks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{percentage}%</Text>
            <Text style={styles.statLabel}>Percentage</Text>
          </View>
        </View>

        {/* Questions Analysis */}
        <Text style={styles.sectionTitle}>Detailed Question-wise Analysis</Text>
        
        {responseData.answers && responseData.answers.map((answer, index) => {
          const question = examData.questions?.find(q => q._id === answer.questionID);
          if (!question) return null;

          const status = getAnswerStatus(question, answer);
          const marks = getMarks(question, answer);

          return (
            <View key={index} style={styles.questionContainer}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionType}>{question.questionType}</Text>
                <Text style={[
                  styles.answerStatus,
                  status === 'correct' ? styles.correct :
                  status === 'incorrect' ? styles.incorrect : styles.unattempted
                ]}>
                  {getStatusText(status)}
                </Text>
              </View>
              
              <Text style={styles.questionText}>
                Q{index + 1}: {question.question}
              </Text>

              <View style={styles.answerSection}>
                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>Your Answer:</Text>
                  <Text style={[
                    styles.answerValue,
                    status === 'correct' ? styles.correctAnswer :
                    status === 'incorrect' ? styles.incorrectAnswer : styles.unattemptedAnswer
                  ]}>
                    {getAnswerDisplay(question, answer)}
                  </Text>
                </View>
                
                {status !== 'correct' && (
                  <View style={styles.answerRow}>
                    <Text style={styles.answerLabel}>Correct Answer:</Text>
                    <Text style={[styles.answerValue, styles.correctAnswer]}>
                      {getCorrectAnswerDisplay(question)}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.marksRow}>
                <Text style={styles.marksLabel}>Marks:</Text>
                <Text style={[
                  styles.marksValue,
                  marks > 0 ? styles.positiveMarks :
                  marks < 0 ? styles.negativeMarks : styles.zeroMarks
                ]}>
                  {marks > 0 ? `+${marks}` : marks}
                </Text>
              </View>
            </View>
          );
        })}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated on {new Date().toLocaleString()}</Text>
          <Text>This is a computer-generated document.</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ExamResultsPDF;
