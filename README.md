<div align="center">

  <h1>💰 Expense Tracker CRUD App</h1>
  
  <p>
    A beautiful, responsive expense tracker built with <strong>Vanilla JavaScript</strong> featuring full CRUD operations, real-time analytics, and a stunning <strong>Glassmorphism</strong> design.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Expense-Tracker-blue?style=for-the-badge&logo=appveyor" alt="Expense Tracker" />
  </p>

  <p>
    <a href="#">View Live Demo</a> • 
    <a href="#-tech-stack">Tech Stack</a> 
  </p>
  
  <img src="/assets/screenshoot.jpg" alt="Project Screenshot" width="100%" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />

</div>

---

## ✨ Features

### 🎯 Core Functionality
* **Complete CRUD Operations:** Create, Read, Update, and Delete expenses seamlessly.
* **Data Persistence:** Uses `LocalStorage` so data is never lost on refresh.
* **Form Validation:** Prevents empty submissions and ensures positive numbers.
* **Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile.

### 🔍 Filtering & Organization
* **Smart Filtering:** Filter by `Food`, `Transport`, `Entertainment`, `Bills`, or `All`.
* **Visual Badges:** Color-coded categories for quick scanning.
* **Date Tracking:** Automatically captures the date of entry.

### 📊 Analytics & Insights
* **Interactive Charts:** Dynamic **Doughnut Chart** (using Chart.js) visualizing spending distribution.
* **Real-time Metrics:**
    * Total Expenses Amount
    * Average Expense Value
    * Highest Spending Category
    * Total Transaction Count

### 🎨 Design & UX
* **Glassmorphism UI:** Modern semi-transparent aesthetic with backdrop blur.
* **Smooth Animations:** Hover effects and fluid transitions.
* **Empty States:** User-friendly messages when data is empty.

---

## 🛠️ Tech Stack
```text
| Technology | Usage |
|Data Persistence| **LocalStorage** |
| Styling | **Bootstrap 5** + Custom CSS (Glassmorphism) |
| Scripting | **Vanilla JavaScript (ES6+)** |
| Charts | **Chart.js** |
| Icons | **Font Awesome** |
```
---

## 🚀 Quick Start

### Method 1: Direct Run
1.  Clone or download the repository.
2.  Open `index.html` in any modern web browser.

### Method 2: Project Structure
```text
expense-tracker/
│
├── index.html          # Main application file
├── README.md           # Documentation
├── style.css           # Custom Glassmorphism styles
├── script.js           # Logic & CRUD operations
