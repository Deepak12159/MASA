# 🏆 MAASA Portal

![MAASA Hero Area](public/hero-section.png)

> **Medicaps University Athletics and Sports Association (MAASA)** is a unified digital platform designed to revolutionize student athletic communities. It features expert coaching info, real-time event updates, secure operations, and a robust role-based administrative dashboard.

---

## 🌟 Key Features

- **Ultra-Premium Design:** Built with a next-generation "Bento Grid" layout, glassmorphism, dynamic mesh backgrounds, and interactive spotlight hover effects.
- **Role-Based Access Control (RBAC):** Secure login portals for different hierarchical levels (Technical Team, Faculty, Superuser).
- **Admin Dashboard:** A sleek, fully functional dashboard to manage (upload/remove) events and media galleries.
- **Dynamic Data Management:** Fully integrated with a real-time **Supabase** backend for secure, persistent data storage (Events, Media, Profiles, Achievements).
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

## 🔐 Admin Dashboard & Authentication

This project uses **Supabase Authentication**. There are no hardcoded dummy accounts for security reasons.

To access the Admin Dashboard:
1. Create a user account in your Supabase project dashboard (`Authentication` -> `Users` -> `Add User`).
2. Log in with those credentials on the `/login` page.
3. Your account will default to the `Technical Team` role.
4. **To become a Superuser:** Run the following SQL in your Supabase SQL Editor once:
   ```sql
   UPDATE profiles SET role = 'superuser' WHERE email = 'your.email@example.com';
   ```
5. Once you are a Superuser, you can manage the roles of all other admins directly from the `Manage Admins` page on the dashboard!

---

## 🎨 UI / UX Highlights

- **Spotlight Cards:** Hovering over elements tracks your cursor and illuminates the borders and background dynamically.
- **Responsive Architecture:** Fully optimized for mobile, tablet, and desktop viewing.
- **Typography:** Custom integration of the `Outfit` sans-serif font for aggressive, modern, athletic aesthetics.

---

*Built with ❤️ for Medicaps University Sports Community.*
