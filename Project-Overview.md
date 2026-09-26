# 🎓 Advanced Learning & Performance Management System

> **A practical LMS and academic performance analysis platform built to track student progress, identify learning gaps, and support data-driven teaching.**
> ---
>

[![Status](https://img.shields.io/badge/Status-Active%20Development-orange?style=for-the-badge)](#-current-project-status)
[![Prototype](https://img.shields.io/badge/Prototype-In%20Real--World%20Use-success?style=for-the-badge)](#-real-world-use)
[![Students](https://img.shields.io/badge/Students-50%2B-blue?style=for-the-badge)](#-real-world-use)



[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vihela%20Panawala-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vihela-s-panawala/)
[![Instagram](https://img.shields.io/badge/Instagram-v1h3l4-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/v1h3l4/)

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

## 🤖 AI-Powered Analysis — BETA
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

# 🧠 Answer-Sheet Analysis — BETA

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

# 📚 Multi-Subject Support — BETA

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

Copyright 2026 Vihela Panawala

---

# 👨‍💻 Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vihela%20Panawala-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vihela-s-panawala/)
[![Instagram](https://img.shields.io/badge/Instagram-v1h3l4-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/v1h3l4/)



---

<p align="center">

### 🚧 Built, tested, and continuously improved through real-world use.

**From marks → data → insights → better decisions.**

</p>

---

# 📸 Screenshots

<img width="1893" height="981" alt="Screenshot 2026-09-26 155003" src="https://github.com/user-attachments/assets/b5e5ef25-9a33-494a-9356-e9526105759f" />
<img width="1881" height="986" alt="Screenshot 2026-09-26 155123gggg" src="https://github.com/user-attachments/assets/55af1aec-ca75-463f-8e24-bbad9faf1d9a" />
<img width="655" height="957" alt="Screenshot 2026-09-26 155406" src="https://github.com/user-attachments/assets/b25057a5-2b28-4ca5-a23e-a6000e4713c6" />
<img width="645" height="283" alt="Screenshot 2026-09-26 155437" src="https://github.com/user-attachments/assets/e610f1a1-a6ca-42b9-97ef-f1ddb02f8b8d" />

<img width="1906" height="975" alt="Screenshot 2026-09-26 155255" src="https://github.com/user-attachments/assets/9df1316b-2156-4664-a1e2-327bd4e12cf8" />
<img width="1901" height="977" alt="Screenshot 2026-09-26 155201" src="https://github.com/user-attachments/assets/c13b58d3-df5a-4ff0-9104-c44bd0b67390" />
<img width="1911" height="977" alt="Screenshot 2026-09-26 155232" src="https://github.com/user-attachments/assets/0a02d264-7a64-442f-9fa9-c74ed05d403a" />
<img width="1917" height="982" alt="Screenshot 2026-09-26 155332" src="https://github.com/user-attachments/assets/8a818ce2-e4a7-45be-9fa4-58e84a8bd5f2" />
---
