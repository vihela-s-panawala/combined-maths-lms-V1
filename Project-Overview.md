# 🎓 Advanced Learning & Performance Management System

> **A practical LMS and academic performance analysis platform built to track student progress, identify learning gaps, and support data-driven teaching.**

[![Status](https://img.shields.io/badge/Status-Active%20Development-orange?style=for-the-badge)](#-project-status)
[![Prototype](https://img.shields.io/badge/Prototype-In%20Real--World%20Use-success?style=for-the-badge)](#-real-world-use)
[![Students](https://img.shields.io/badge/Students-50%2B-blue?style=for-the-badge)](#-real-world-use)
[![Frontend](https://img.shields.io/badge/Frontend-JavaScript-yellow?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-TBD-lightgrey?style=for-the-badge)](#-license)

---

## 📌 Overview

This project started from a problem I experienced as an **A/L student**: academic performance is often reduced to a single mark or grade, while the actual weaknesses behind that result remain difficult to identify.

The goal of this project is to build a learning management and academic performance analysis system that goes beyond simply recording marks.

The system is designed to help track:

- 📊 Student performance
- 📝 Individual paper results
- 🔎 Question-level weaknesses
- 📈 Performance trends
- 🎯 Areas requiring additional focus
- 📚 Subject and paper-level progress
- 👨‍🏫 Class-level academic insights

The project is being developed **iteratively**, with the current prototype already being used in a real tuition-class environment.

---

# 🚀 Real-World Use

Unlike a purely conceptual or portfolio-only project, the current prototype is **actively being used in a tuition class with approximately 50 students**.

This allows the system to be tested against real usage patterns and provides practical feedback for future development.

> **Current scale:** ~50 students  
> **Environment:** Tuition / A/L education  
> **Purpose:** Student performance and paper-score analysis  
> **Development approach:** Iterative development based on practical usage

The real-world testing phase is particularly useful for identifying issues that are difficult to discover when developing against only dummy data.

---

# 🎯 Project Goals

The long-term goal is to develop a system capable of answering questions such as:

> **"A student scored 65%. But where exactly are they losing marks?"**

Instead of looking only at the final score, the system aims to analyse performance at multiple levels.

```text
Student
   │
   ├── Subject
   │      │
   │      ├── Paper
   │      │      │
   │      │      ├── Section
   │      │      │      │
   │      │      │      └── Question
   │      │      │
   │      │      └── Score
   │      │
   │      └── Performance Trend
   │
   └── Learning Weaknesses
          │
          ├── Weak Topics
          ├── Weak Question Types
          ├── Repeated Mistakes
          └── Recommended Focus Areas
```

The eventual objective is to turn raw academic results into **actionable learning information**.

---

# ✨ Core Features

## 📊 Performance Analysis

The system is designed to analyse student performance rather than simply store marks.

Potential analysis includes:

- Paper scores
- Question-level scores
- Topic-level performance
- Unit-level performance
- Performance trends
- Weak areas
- Strong areas
- Repeated mistakes
- Class-level comparisons

---

## 📝 Paper Score Analysis

The current prototype focuses on analysing examination and practice-paper performance.

Students' results can be broken down into individual questions rather than treating an entire paper as a single score.

This makes it possible to identify patterns that would otherwise be hidden inside the final percentage.

---

## 👨‍🎓 Student Progress Tracking

The planned system will maintain a longitudinal view of student performance.

Instead of analysing each paper independently:

```text
Paper 01 → Paper 02 → Paper 03 → Paper 04
   ↓          ↓          ↓          ↓
  52%        61%        58%        73%
```

the system can eventually identify:

```text
Overall Trend
      ↓
Topic Performance
      ↓
Recurring Weaknesses
      ↓
Recommended Focus
```

---

## 🤖 AI-Powered Analysis — Planned

One of the major future components is an AI-driven analysis engine.

The planned system will use student performance data to identify:

- Current weak areas
- Frequently missed concepts
- Question types causing difficulties
- Areas requiring additional practice
- Potential focus areas
- Targeted quizzes
- Relevant past-paper questions

The AI component is **part of the planned development roadmap and is not being represented as a fully implemented feature of the current prototype.**

---

# 🧠 Answer-Sheet Analysis — Planned

A future version is intended to explore an **image-reading AI pipeline** capable of analysing submitted answer sheets.

The objective is to move beyond manually entering marks and eventually allow the system to extract useful information from submitted work.

The planned pipeline can be represented as:

```text
Answer Sheet
     │
     ▼
Image Processing
     │
     ▼
Question Detection
     │
     ▼
Answer / Mark Extraction
     │
     ▼
Question-Level Analysis
     │
     ▼
Topic / Unit Performance
     │
     ▼
Learning Insights
```

This is a longer-term development area and will require additional experimentation and validation.

---

# 📚 Multi-Subject Support — Planned

Although the project initially focuses on **A/L Combined Mathematics**, the architecture is being designed with expansion in mind.

Future versions are intended to support different:

- Subjects
- Paper structures
- Question formats
- Marking schemes
- Assessment types

Potential question formats include:

- Multiple Choice Questions
- Structured Questions
- Essay Questions
- Other subject-specific formats

---

# 🏗️ Current Prototype

The current public repository contains the prototype used to demonstrate and test the system.

### Current prototype characteristics

- Frontend-based prototype
- Performance analysis interface
- Sample-data demonstration
- Combined Mathematics focus
- Designed around real academic use cases
- Currently being used in a tuition-class environment

The public preview is intentionally limited and does **not** represent the complete long-term system architecture.

---

# 🖥️ Live Preview

### 🌐 Try the prototype

**[Open Live Preview](https://combined-maths-lms-v1.vercel.app/)**

> **Note:** The public preview currently uses sample data and is intended to demonstrate the interface and workflow. Real student information is not exposed through the public demo.

---

# 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Performance Analysis

![Performance Analysis](screenshots/performance-analysis.png)

### Student Performance

![Student Performance](screenshots/student-performance.png)

> Replace the image paths above with the actual screenshots inside the repository.

---

# 🛠️ Technology Stack

## Current / Existing

| Technology | Purpose |
|---|---|
| JavaScript | Frontend development |
| HTML / CSS | Interface structure and styling |
| Vercel | Prototype deployment |
| Git | Version control |
| GitHub | Source code and project management |

---

## Planned Technologies / Components

The following components are part of the planned development roadmap:

| Component | Purpose |
|---|---|
| Database | Persistent student and performance data |
| Authentication | Secure student / teacher access |
| Google Authentication | Planned authentication option |
| AI Analysis Engine | Performance and weakness analysis |
| Image Processing / AI | Answer-sheet analysis |
| Analytics Engine | Question and topic-level insights |
| Expanded Subject Support | Support for different subjects |
| Feedback System | Student / teacher feedback |

---

# 🏛️ System Architecture

The long-term architecture is intended to move toward a multi-layer system:

```text
                    ┌─────────────────────┐
                    │       Users         │
                    │                     │
                    │ Students / Teachers │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Frontend UI     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Backend API     │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
       │  Database   │  │   Analytics │  │ AI Engine   │
       └─────────────┘  └─────────────┘  └─────────────┘
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Performance Insights│
                    └─────────────────────┘
```

The architecture will evolve as the project moves from prototype to a more complete production-oriented system.

---

# 🔐 Privacy & Security

Student academic information is sensitive.

The public prototype is designed so that **real student information is not exposed through the public demo**.

The current public preview uses sample data.

Future development will focus on:

- Secure authentication
- Access control
- Database security
- User-specific data isolation
- Secure API communication
- Protection of student information
- Appropriate handling of uploaded answer sheets

Security considerations will become increasingly important as the system moves from prototype usage toward larger-scale deployment.

---

# 📈 Development Approach

This project follows an **iterative development approach**.

Instead of attempting to build the complete LMS before putting it into use:

```text
Idea
  ↓
Prototype
  ↓
Real-World Testing
  ↓
Feedback
  ↓
Improvement
  ↓
New Version
  ↓
More Testing
  ↺
```

The current tuition-class deployment provides an opportunity to continuously identify practical requirements and improve the system accordingly.

---

# 🗺️ Roadmap

## ✅ Completed / Current

- [x] Initial system concept
- [x] Combined Mathematics performance-analysis prototype
- [x] Frontend prototype
- [x] Live prototype deployment
- [x] Sample-data demonstration
- [x] Real-world testing
- [x] Prototype currently used with ~50 students

---

## 🔄 In Development

- [ ] Database integration
- [ ] Authentication system
- [ ] Improved student management
- [ ] Expanded performance analytics
- [ ] Improved reporting
- [ ] Multi-tenant implementation improvements

---

## 🔮 Future

- [ ] AI-powered performance analysis
- [ ] Automated weakness detection
- [ ] Targeted quiz recommendations
- [ ] Past-paper recommendations
- [ ] Question-level analytics
- [ ] Unit-level analytics
- [ ] Multi-subject support
- [ ] Student feedback system
- [ ] Image-reading AI pipeline
- [ ] Automated answer-sheet analysis
- [ ] Expanded assessment formats
- [ ] More advanced teacher dashboards

---

# 📊 From Marks to Insights

The central idea behind the project can be summarized as:

```text
                    RAW DATA
                       │
                       ▼
                Student Scores
                       │
                       ▼
              Question Analysis
                       │
                       ▼
               Topic / Unit Data
                       │
                       ▼
              Performance Trends
                       │
                       ▼
               Weakness Detection
                       │
                       ▼
             Recommended Actions
                       │
                       ▼
              Better Learning
```

The goal isn't simply to answer:

> **"What did the student score?"**

but eventually:

> **"Why did the student score that way, where are they struggling, and what should they work on next?"**

---

# 💡 Why I Built This

As an A/L student, I experienced first-hand how difficult it can be to understand academic performance beyond a final grade.

A student might know that they scored poorly, but that doesn't necessarily tell them:

- Which topics they struggle with
- Which question types cause problems
- Whether the problem is consistent
- Whether their performance is improving
- What they should practise next

This project is my attempt to explore how software, analytics, and eventually AI can be used to make that process more useful.

---

# 🧪 Current Project Status

> 🟠 **Active Development**

This project is currently between the **prototype and development stages**.

The existing prototype is already being used in a real tuition-class environment with approximately 50 students, while the more complete system is being developed iteratively.

Some features described in this README are **planned rather than currently implemented**.

---

# ⚠️ Important Note

This repository should not be considered a finished commercial LMS.

It is an actively evolving project being developed through:

**Prototype → Real-World Testing → Feedback → Development → Iteration**

The public repository represents only part of the overall development process.

---

# 🤝 Contributing

This project is currently primarily developed as an individual project.

As the system evolves, contribution guidelines may be added for:

- Bug reports
- Feature requests
- UI improvements
- Analytics ideas
- AI experimentation
- Documentation
- Testing

---

# 📄 License

License information will be added as the project progresses.

---

# 👨‍💻 Developer

**Vihela Panawala**

IT / MIT Undergraduate  
Sri Lanka

Interested in:

- Full-Stack Development
- Automation
- Cloud & DevOps
- Software Architecture
- FinTech & FinOps
- Data & Analytics
- AI-driven Applications
- Solution Design

---

<p align="center">

### 🚧 Built, tested, and continuously improved through real-world use.

**From marks → data → insights → better decisions.**

</p>