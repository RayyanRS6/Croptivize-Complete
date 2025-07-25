# Croptivize - AI-Powered Agricultural Assistant

![Croptivize Banner](Frontend/public/hangplant.png)

**Croptivize** is a comprehensive, full-stack web application designed to assist farmers and agriculture enthusiasts. It leverages AI to detect plant diseases, provides a marketplace for agricultural products, and includes a fertilizer calculator to help optimize crop yields.

**Live Demo:** [Link to your deployed application]

---

## ✨ Key Features

*   **🤖 AI-Powered Disease Detection:** Upload an image of a plant leaf and get instant diagnosis of potential diseases using a trained PyTorch model.
*   **🛒 E-commerce Marketplace:** A fully functional online shop for buying and selling agricultural products.
    *   User-friendly product listings with search and filtering.
    *   Secure checkout and order management system.
    *   Admin panel for managing products, orders, and users.
*   **🌾 Fertilizer Calculator:** Recommends the optimal amount of fertilizer based on crop type and soil data.
*   **👤 User Authentication:** Secure user registration and login system with JWT, including Google OAuth for social login.
*   **📞 Contact & Messaging System:** Allows users to send messages and inquiries to the admin.
*   **Responsive Design:** Fully responsive interface built with React and Shadcn/UI, ensuring a seamless experience on all devices.

---

## 🛠️ Technology Stack

This project is a monorepo containing three main parts: a React frontend, a Node.js backend, and a Flask API for the machine learning model.

| Component | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Redux Toolkit, React Router, Axios, Shadcn/UI, Tailwind CSS |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT, Passport.js, Cloudinary, Multer |
| **ML API** | Python, Flask, PyTorch, Pillow |

---

## 📂 Project Structure

```
.
├── Frontend/         # React Frontend Application
├── backend/          # Node.js/Express.js Backend API
├── flaskapi/         # Flask API for the ML Model
└── README.md
```

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your system:
*   Node.js (v18.x or higher)
*   npm / yarn
*   Python (v3.8 or higher)
*   pip
*   MongoDB (local instance or a cloud-based service like MongoDB Atlas)

### ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/RayyanRS6/Croptivize-Complete.git
    cd Croptivize-Complete
    ```

2.  **Setup the Backend:**
    ```sh
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRY=10d
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

3.  **Setup the Frontend:**
    ```sh
    cd ../Frontend
    npm install
    ```
    Create a `.env` file in the `Frontend` directory and add the following variable, pointing to your backend server:
    ```env
    VITE_API_BASE_URL=http://localhost:8000
    ```

4.  **Setup the Flask ML API:**
    ```sh
    cd ../flaskapi
    pip install -r requirements.txt
    ```

### ▶️ Running the Application

1.  **Start the Backend Server:**
    ```sh
    cd backend
    npm run dev
    ```

2.  **Start the Frontend Development Server:**
    ```sh
    cd ../Frontend
    npm run dev
    ```

3.  **Start the Flask API Server:**
    ```sh
    cd ../flaskapi
    python app.py
    ```

Your application should now be running!
*   Frontend: `http://localhost:5173` (or another port specified by Vite)
*   Backend: `http://localhost:8000`
*   Flask API: `http://localhost:5000`

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

Rayyan Sheikh - [rayyansheikh.rs@gmail.com](mailto:rayyansheikh.rs@gmail.com)

Project Link: [https://github.com/RayyanRS6/Croptivize-Complete](https://github.com/RayyanRS6/Croptivize-Complete)
