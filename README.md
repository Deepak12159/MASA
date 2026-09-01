# 🏆 MAASA Portal

![MAASA Hero Area](public/hero-section.png)

> **Medicaps University Athletics and Sports Association (MAASA)** is a unified digital platform designed to revolutionize student athletic communities. It features expert coaching info, real-time event updates, secure operations, and a robust role-based administrative dashboard.

---

## 🌟 Key Features

- **Ultra-Premium Design:** Built with a next-generation "Bento Grid" layout, glassmorphism, dynamic mesh backgrounds, and interactive spotlight hover effects.
- **Role-Based Access Control (RBAC):** Secure login portals for different hierarchical levels (Technical Team, Faculty, Superuser).
- **Admin Dashboard:** A sleek, fully functional dashboard to manage (upload/remove) events and media galleries.
- **Dynamic Data Mocking:** Fully integrated `React Context` and `LocalStorage` architecture allowing complete offline testing of data mutation without a backend.
- **Scroll Animations:** Buttery smooth scroll and entrance animations powered by Framer Motion.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (CSS Variables, Flexbox/Grid, CSS Modules)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router v6

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/maasa-portal.git
   cd maasa-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Visit `http://localhost:5174` (or the port specified in your terminal) to view the application.

---

## 🔐 Admin Dashboard Testing

Since this project currently operates without a live backend database, all user mutations (adding events, deleting media) are persisted locally in your browser's `localStorage`.

To test the **Admin Dashboard** and **RBAC**, use the following mock credentials on the `/login` page:

| Role | Email Address | Password |
| :--- | :--- | :--- |
| **Technical Team** | `tech@maasa.com` | `password123` |
| **Faculty Coordinator** | `sir@maasa.com` | `password123` |
| **Superuser** | `admin@maasa.com` | `password123` |

Once logged in, you can add new sporting events or upload media to the gallery. Log out and visit the public site to see your updates live!

---

## 🎨 UI / UX Highlights

- **Spotlight Cards:** Hovering over elements tracks your cursor and illuminates the borders and background dynamically.
- **Responsive Architecture:** Fully optimized for mobile, tablet, and desktop viewing.
- **Typography:** Custom integration of the `Outfit` sans-serif font for aggressive, modern, athletic aesthetics.

---

*Built with ❤️ for Medicaps University Sports Community.*
