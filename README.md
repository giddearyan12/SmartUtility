# Smart Utility Platform

## 🔍 Overview

**Service Finder** is a smart utility platform that enables users to effortlessly search for and book professional services such as electricians, plumbers, mechanics, carpenters, and more. Whether it’s a quick repair or scheduled maintenance, the platform provides a seamless experience through a responsive and intuitive interface.

---

## 🚀 Key Features

- 🔍 **Service Search** – Explore and filter services based on categories and user location.  
- 📅 **Real-Time Booking** – Book appointments instantly with available professionals.  
- 🧰 **Service Provider Dashboard** – Service providers can register, manage services, and accept bookings.  
- 📱 **Responsive UI** – Fully responsive design for a smooth experience on all devices.  
- 🔐 **Authentication** – Secure login/register for both users and providers with JWT & Bcrypt.  
- 💬 **Contact & Feedback** – Easy messaging and review system for better communication.

---

## 🧱 Tech Stack

| Technology      | Purpose                          |
|-----------------|----------------------------------|
| React.js        | Frontend UI development          |
| Node.js         | Backend runtime environment      |
| Express.js      | API development                  |
| MongoDB         | NoSQL database                   |
| Mongoose        | MongoDB object modeling          |
| JWT + Bcrypt.js | Authentication & security        |
| Tailwind CSS    | Frontend styling framework       |


---

## 🔧 Installation & Usage

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/service-finder.git
cd service-finder
2. Install Dependencies

For Backend:
cd server
npm install

For Frontend:
cd client
npm install

3. Setup Environment Variables
Create a .env file in the server/ folder and add:

env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Run the Application
Start Backend:
cd server
npm run dev
Start Frontend:
cd client
npm start

---

📌 Future Enhancements
🔔 Real-time booking notifications using WebSockets or Firebase

📍 Map-based service discovery (e.g., Google Maps API)

📱 Mobile App using React Native

🎯 Role-based dashboards for users, providers, and admins

📊 Admin panel to manage all users, providers, and services
