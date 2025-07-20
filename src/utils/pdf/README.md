# PDF Generation Functionality

This folder contains the PDF generation functionality for exam results.

## Files

### `ExamResultsPDF.jsx`
React-PDF component that defines the structure and styling of the PDF document. Creates a professional-looking exam results report with:
- Student information (name, roll number, email)
- Exam summary (score, total marks, percentage)
- Detailed question-wise analysis
- Answer comparisons (student's answer vs correct answer)
- Marks breakdown

### `pdfUtils.js`
Utility functions for PDF generation and email functionality:
- `getStudentDataFromResponse()` - Fetches student data from existing API
- `generatePDFBlob()` - Creates PDF blob from React-PDF component
- `sendPDFViaEmail()` - Sends PDF via email with HTML template
- `autoGenerateAndSendResultsPDF()` - Main function for automatic PDF generation after exam submission
- `downloadResultsPDF()` - Downloads PDF locally

### `index.js`
Exports all PDF-related functions for clean imports

## Usage

### Automatic PDF Generation (After Exam Submission)
The PDF is automatically generated and sent to the student's email address 3 seconds after successful exam submission. This is handled in the `TakeExam` component.

### Manual PDF Download
Students can download their results PDF from the Response page using the "Download PDF Report" button.

## Features

### PDF Content
- Professional header with exam name
- Student details section
- Summary statistics with color coding
- Question-by-question breakdown showing:
  - Question text
  - Student's answer
  - Correct answer (if different)
  - Marks awarded
  - Answer status (correct/incorrect/unattempted)

### Email Template
- Responsive HTML email design
- Summary of results in email body
- Professional styling with color-coded sections
- PDF attachment with meaningful filename

## Dependencies
- `@react-pdf/renderer` - For PDF generation
- Existing `getStudentResponsesApi` - For fetching student data

## Email Service
The functionality attempts to send emails via `/api/v1/email/send-results` endpoint. If the email service is unavailable, it gracefully handles the error and still allows PDF download functionality.

## Future Enhancements
- Add more detailed analytics to the PDF
- Support for different PDF templates
- Batch email sending for multiple students
- Email delivery confirmation
