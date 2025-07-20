# exam-portal - Frontend

A modern React.js frontend for the Goa Testing Agency examination portal, providing an intuitive interface for both students and professors to manage and take exams.

## 🚀 Features

### For Students

- **Secure Login**: JWT-based authentication system
- **Take Exams**: Interactive exam interface with timer
- **Multiple Question Types**: Support for MCQ and numerical answer questions
- **Exam History**: View past exam results and performance
- **Real-time Timer**: Countdown timer during exam sessions
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### For Professors  

- **Exam Creation**: Create exams with multiple question types
- **Question Management**: Add, edit, and remove questions dynamically
- **Marking Scheme**: Configurable marking for correct, incorrect, and unattempted answers
- **Student Responses**: View and analyze student performance
- **Exam Analytics**: Charts and statistics for exam results
- **Dashboard**: Overview of created exams and student participation

### General Features

- **Modern UI/UX**: Clean and intuitive interface
- **Role-based Access**: Separate dashboards for students and professors
- **Real-time Updates**: Dynamic content updates
- **Error Handling**: Comprehensive error handling and user feedback
- **Secure Routing**: Protected routes based on authentication

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Backend API** (Goa Testing Agency Backend running on port 3000)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   The application is configured to work with the backend running on `http://localhost:3000`. If your backend is running on a different port, update the API URLs in the source files.

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another available port).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 🎨 Tech Stack

### Core Technologies

- **React 19.1.0**: Modern React with latest features
- **Vite 7.0.4**: Fast build tool and dev server
- **React Router DOM 7.6.3**: Client-side routing

### UI/Styling

- **CSS3**: Custom styling with modern CSS features
- **Responsive Design**: Mobile-first approach
- **Chart.js**: Data visualization for analytics

### State Management

- **React Context API**: Global state management for exam data
- **Local Storage**: Authentication token storage
- **Session Storage**: Temporary data storage

### Development Tools

- **ESLint**: Code linting and quality
- **Vite**: Development server with HMR (Hot Module Replacement)

## 🔗 Application Routes

### Public Routes

- `/` - Home page with role selection
- `/login` - Login page for authentication

### Student Routes (Protected)

- `/student` - Student dashboard
- `/student/examHistory` - View exam history
- `/student/examHistory/response` - View specific exam response
- `/student/exam/:examID` - Take exam interface

### Professor Routes (Protected)

- `/professor` - Professor dashboard
- `/professor/creatExam` - Create new exam
- `/professor/examHistory` - View created exams
- `/professor/examHistory/examDetails` - View exam details and responses

## 🔐 Authentication Flow

1. **Role Selection**: Users select their role (Student/Professor) on the home page
2. **Login**: Users authenticate with email/Institue ID and password
3. **Token Storage**: JWT token is stored in localStorage
4. **Route Protection**: Protected routes check for valid authentication
5. **Auto-logout**: Invalid or expired tokens trigger automatic logout

### Authentication States

- **Unauthenticated**: Access to home and login pages only
- **Student**: Access to student dashboard and exam-related pages
- **Professor**: Access to professor dashboard and exam management pages

## 🎯 Key Features Detailed

### Exam Taking Interface

- **Timer**: Real-time countdown with visual warnings
- **Question Navigation**: Easy navigation between questions
- **Answer Tracking**: Visual indication of answered/unanswered questions
- **Auto-submit**: Automatic submission when time expires
- **Progress Saving**: Answers are saved as user progresses

### Exam Creation (Professor)

- **Dynamic Questions**: Add/remove questions dynamically
- **Question Types**: Support for MCQ and numerical answer types
- **Validation**: Form validation for exam data
- **Preview**: Real-time preview of exam structure
- **Flexible Marking**: Configurable marks for different answer states

### Data Visualization

- **Performance Charts**: Visual representation of exam results
- **Statistics**: Detailed analytics for professor insights
- **Responsive Charts**: Charts adapt to different screen sizes

## 🌐 API Integration

The frontend communicates with the backend API through dedicated service functions:

### API Services

- **createExamApi**: Create new exams
- **examDataApi**: Fetch exam data
- **examResultApi**: Fetch exam results
- **studentApi**: Student-related operations
- **studentResponseApi**: Fetch student responses

### Request Configuration

All API requests include:

- **Base URL**: `http://localhost:3000/api/v1`
- **Authentication**: Bearer token in headers
- **Content Type**: JSON
- **Error Handling**: Comprehensive error catching

## 🎨 Styling 6 Design

### Design System

- **Color Scheme**: Green-based theme representing growth and education
- **Typography**: Segoe UI font family for readability
- **Spacing**: Consistent spacing using CSS custom properties
- **Components**: Reusable styled components

### Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Responsive breakpoints for different screen sizes
- **Flexible Layouts**: CSS Grid and Flexbox for layouts
- **Touch Friendly**: Large touch targets for mobile devices

### CSS Features

- **CSS Grid**: Modern layout system
- **Flexbox**: Flexible component layouts
- **CSS Transitions**: Smooth interactions
- **Custom Properties**: CSS variables for theming
- **Media Queries**: Responsive design breakpoints

## 🔧 Configuration

### Vite Configuration

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
```

### ESLint Configuration

The project uses ESLint for code quality with React-specific rules and hooks validation.

## 🐛 Error Handling

### Client-side Error Handling

- **API Errors**: Graceful handling of API failures
- **Authentication Errors**: Automatic logout on auth failures  
- **Network Errors**: User-friendly error messages
- **Form Validation**: Real-time form validation feedback

### User Feedback

- **Success Messages**: Confirmation of successful actions
- **Error Alerts**: Clear error messages with suggested actions
- **Loading States**: Visual feedback during API operations
- **Toast Notifications**: Non-intrusive notifications

## 🧪 Testing

### Manual Testing

- Test all user flows for both student and professor roles
- Verify responsive design on different devices
- Test authentication and authorization flows
- Validate form submissions and error handling

### Browser Compatibility

- **Chrome**: Latest versions
- **Firefox**: Latest versions  
- **Safari**: Latest versions
- **Edge**: Latest versions

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Static Hosting

The built application can be deployed to any static hosting service:

- **Netlify**: Easy deployment with automatic builds
- **Vercel**: Optimized for React applications
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repositories

### Environment Variables

For production deployment, ensure:

1. Update API URLs to production backend
2. Configure CORS on the backend for production domain
3. Use HTTPS for production deployment
4. Set up proper error tracking

## 🔒 Security Considerations

- **JWT Token Storage**: Tokens stored in localStorage
- **HTTPS**: Use HTTPS in production
- **CORS**: Proper CORS configuration
- **Input Validation**: Client-side input validation
- **Route Protection**: Authentication required for sensitive routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👤 Author

### Krunal Asari

## 🔗 Related Projects

- Backend Repository: <https://github.com/KNL110/exam-portal-backend.git>

---

For any issues or questions, please create an issue in the repository or contact me.
