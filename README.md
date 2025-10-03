## E-Learning Platform ## 

An online learning management system (LMS) built with Node.js, Express, MongoDB, and TypeScript.
This platform allows instructors to create courses and assessments, and students to submit, update, or resubmit their answers.

🚀 Features

## Roles & Authentication

* JWT-based authentication (login/signup)

* Role-based authorization: student, instructor, (and optionally admin)

* Secure routes protected by protect middleware

## Course Management

* Instructors can create, update, delete courses

* List courses

* Enrollments (if implemented)

## Assessment & Quiz Functionality

* Instructors can create assessments under a course:

 - Fields: courseId, title, totalMarks, passingScore, dueDate, questions

 - Supports multiple question types: mcq, boolean

 - Validations via Zod schema

* Students can submit answers to assessments

* Resubmissions: multiple attempts allowed (up to a limit)

* Update submission: students can update their answers before deadline (depending on business rules)

* Automatic score calculation and pass/fail status

## Submission Management

* Submission documents store: student, assessment, answers, score, status, timestamps

* Business logic:

 - Prevent duplicate initial submissions

 - Check due date for submissions / resubmissions / updates

 - Limit on number of resubmissions

 - Ownership checks (only the student who submitted can update / resubmit)

## Additional Features (depending on your implementation)

* Pagination, sorting, filtering for listing courses / submissions

* Populating references (e.g. student in submissions, assessment in queries)

* Validation middleware (via Zod) for request bodies

* Error handling and centralized error middleware

📁 Repository Structure

E-learning-Platform/
├── src/
│   ├── config/
│   │   └── database.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── course.controller.ts
│   │   ├── lesson.controller.ts
│   │   ├── enrollment.controller.ts
│   │   ├── assessment.controller.ts
│   │   ├── submission.controller.ts
│   │   └── user.controller.ts
│   │
│   ├── validations/
│   │   ├── course.validator.ts
│   │   ├── lesson.validator.ts
│   │   ├── enrollment.validator.ts
│   │   ├── assessment.validator.ts
│   │   ├── submission.validator.ts
│   │   └── user.validator.ts
│   │
│   ├── exceptions/
│   │   └── ApiError.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── error.middleware.ts
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Course.ts
│   │   ├── Lesson.ts
│   │   ├── Enrollment.ts
│   │   ├── Assessment.ts
│   │   ├── Submission.ts
│   │   └── Comment.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── course.routes.ts
│   │   ├── lesson.routes.ts
│   │   ├── enrollment.routes.ts
│   │   ├── assessment.routes.ts
│   │   ├── submission.routes.ts
│   │   └── user.routes.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── course.service.ts
│   │   ├── lesson.service.ts
│   │   ├── enrollment.service.ts
│   │   ├── assessment.service.ts
│   │   ├── submission.service.ts
│   │   └── user.service.ts
│   │
│   ├── types/
│   │   ├── user.type.ts
│   │   ├── course.type.ts
│   │   ├── lesson.type.ts
│   │   ├── enrollment.type.ts
│   │   ├── assessment.type.ts
│   │   ├── submission.type.ts
│   │   └── auth.type.ts
│   │
│   ├── utils/
│   │   ├── jwt.util.ts
│   │   ├── submission.utils.ts
│   │   ├── enrollmentQueryBuilder.util.util.ts
│   │   ├── hash.util.ts
│   │   ├── helper.util.ts
│   │   ├── pagination.util.ts
│   │   ├── validateObjectId.util.ts
│   │   └── zod.util.ts
│   │
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
└── README.md


🛠️ Setup & Installation

## Prerequisites

* Node.js v16+

* MongoDB (local or remote)

* Yarn or npm

# Steps

1- Clone the repository
- git clone https://github.com/ahmedeid101/E-learning-Platform.git
- cd E-learning-Platform

2- Install dependencies
- npm install
# or
- yarn install

3- Configure environment variables (.env file)
Example variables (you may already have these in your project):
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/e-learningdb
NODE_ENV=development
JWT_SECRET=your_secret_key

4- Build / transpile
- npm run build

5- Start the server
- npm run dev     # for development (with nodemon / ts-node)
- npm start       # for production

6- API will be running on http://localhost:<PORT>

⚙ Business Logic / Rules Summary
- Feature	             >>   Rule / Behavior
- Initial submission	 >>   Must be before dueDate; only once per assessment per student
- Resubmission	         >>   Allowed up to a set limit (e.g. 3) before dueDate
- Update submission	     >>   Allowed before dueDate (subject to your rule)
- Score                  >>   calculation	Based on number of correct answers or scaled to totalMarks
- Status	             >>   Marked passed if score >= passingScore, else failed
- Ownership	             >>   Only the student who submitted can update / resubmit their own submission
- Role-based access	     >>   Only instructors can manage courses, assessments, etc.


🧩 Future Enhancements

# Add pagination, filtering, search for courses / assessments

# Add upload support (images, files) for questions / assignments

# Add timed assessments and auto-submit at deadline

# Add grading by instructor override (manual marks input)

# Add analytics / dashboards (student performance, class average)

# Add notifications / email reminders for due dates

# Add role admin / super admin features

# Add frontend client (React, Vue, etc.) that consumes this API


📚 Contributing & License

* You can adapt this project for your own needs. If you’d like to contribute features, bug fixes, or improvements, feel free to   fork and open PRs.

* (License information here, e.g. MIT)


📝 Credits

- Built by Ahmed Eid (GitHub: ahmedeid101)
- Inspired by typical LMS / quiz platforms, customized as a learning exercise in backend architecture with Node, Express, MongoDB, and TypeScript.