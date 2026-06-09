# Croptivize - Project Summary

## Project Overview
**Croptivize** is a comprehensive AI-powered agricultural technology platform designed to help farmers make smarter decisions through disease detection, precision agriculture tools, and an integrated marketplace.

---

## Core Features

### 1. AI-Powered Disease Detection
- **Technology:** Custom ResNet9 deep learning model (PyTorch)
- **Capabilities:**
  - Detects 6 cotton diseases: Aphids, Army Worm, Bacterial Blight, Healthy, Powdery Mildew, Target Spot
  - Image upload or camera capture
  - Plant validation using Plant.id API
  - Provides detailed treatment recommendations:
    - Chemical treatments
    - Biological solutions
    - Prevention strategies
- **Model Architecture:** ResNet9 CNN with 512 feature channels
- **Input:** 256x256 RGB images
- **Output:** Disease classification with confidence scores

### 2. Fertilizer Calculator
- **Functionality:**
  - Calculates optimal NPK (Nitrogen, Phosphorus, Potassium) fertilizer recommendations
  - Supports 10+ crop types (Potato, Wheat, Cotton, Maize, Rice, Sugarcane, Soybean, Barley, Sunflower, Canola)
  - Field area calculation for different shapes (Rectangle, Circle, Triangle)
  - Application method suggestions (Broadcast, Row Banding, Drip Irrigation, Foliar Spray, Top Dressing)
  - Fertilizer type selection (Synthetic, Organic, Custom Blend)
- **Output:** Precise fertilizer amounts in kg/ha

### 3. E-Commerce Marketplace
- **Product Categories:**
  - Fertilizers
  - Tools
  - Seeds
  - Pesticides
  - Equipment
- **Features:**
  - Advanced search and filtering
  - Price range filtering
  - Rating-based filtering
  - Featured products
  - Pagination
  - Product management (Admin)
  - Order management system

### 4. Farming Guide
- **Sections:**
  - General farming practices (Soil Management, Water Management)
  - Seasonal care tips (Spring Preparation, Summer Care)
  - Pest control strategies (Prevention, Organic Solutions, IPM)
  - Fertilizer management (Organic Fertilizers, Application Timing, Nutrient Deficiency)
- **Additional Features:**
  - Real-time weather data integration
  - Spraying condition recommendations based on weather
  - Quick tips section

### 5. User Management & Admin Dashboard
- **User Features:**
  - Registration/Login
  - Google OAuth integration
  - Profile management
  - Disease detection history
  - Order tracking
- **Admin Features:**
  - Product management (CRUD operations)
  - Order management
  - Customer management
  - Disease history tracking
  - Message management (contact form)

---

## Technical Stack

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4.0
- **State Management:** Redux Toolkit
- **Routing:** React Router v7
- **UI Components:** Radix UI (shadcn/ui)
- **Icons:** Lucide React
- **Form Handling:** React Hook Form
- **Notifications:** Sonner (Toast notifications)
- **Charts:** Recharts

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:**
  - JWT (JSON Web Tokens)
  - Passport.js (Google OAuth 2.0)
  - bcrypt (password hashing)
- **File Upload:** Multer + Cloudinary
- **API Structure:** RESTful API
- **Error Handling:** Custom error middleware
- **Pagination:** mongoose-paginate-v2

### Machine Learning Service
- **Framework:** Flask
- **Deep Learning:** PyTorch
- **Model Architecture:** ResNet9 (Custom CNN)
- **Image Processing:** PIL (Pillow), torchvision transforms
- **Deployment:** Standalone microservice

### External APIs & Services
- **Plant Validation:** Plant.id API
- **Weather Data:** OpenWeatherMap API
- **Image Storage:** Cloudinary
- **Authentication:** Google OAuth 2.0

### Deployment
- **Platform:** Vercel
- **Configuration:** vercel.json for both frontend and backend

---

## Project Structure

```
Croptivize/
├── Frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services (RTK Query)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── redux/        # Redux store configuration
│   │   └── utils/        # Utility functions
│   └── package.json
│
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # MongoDB schemas
│   │   ├── routes/      # API routes
│   │   ├── middlewares/ # Auth, error handling, file upload
│   │   ├── utils/       # Helper functions
│   │   └── db/          # Database connection
│   └── package.json
│
└── flaskapi/            # ML service
    ├── app.py           # Flask application
    ├── model_architecture.py  # ResNet9 model definition
    ├── plant-disease-model.pth # Trained model weights
    └── requirements.txt
```

---

## Database Models

### User Model
- Name, Email, Password (hashed)
- Role (user/admin)
- Profile information
- Google OAuth integration

### Product Model
- Name, Description, Price
- Category, Images
- Rating, Stock
- Featured flag

### Order Model
- User reference
- Products with quantities
- Total amount
- Order status
- Timestamps

### Disease Model
- Disease name
- Risk level (confidence)
- User reference
- Timestamp

### Message Model
- Name, Email, Subject, Message
- Timestamp

---

## Key Technical Achievements

1. **Deep Learning Integration**
   - Trained and deployed custom ResNet9 model
   - Integrated ML service with REST API
   - Real-time image processing and classification

2. **Full-Stack Architecture**
   - Separated frontend, backend, and ML service
   - RESTful API design
   - Microservices approach

3. **Modern Development Practices**
   - Component-based architecture
   - State management with Redux Toolkit
   - API integration with RTK Query
   - Responsive design (mobile-first)

4. **Security & Authentication**
   - JWT-based authentication
   - OAuth 2.0 integration
   - Password hashing with bcrypt
   - Role-based access control

5. **User Experience**
   - Intuitive UI/UX design
   - Real-time feedback
   - Error handling
   - Loading states
   - Responsive across devices

---

## Disease Detection Details

### Supported Diseases
1. **Cotton Aphids** - Sap-sucking insects causing leaf curling
2. **Cotton Army Worm** - Caterpillars causing defoliation
3. **Cotton Bacterial Blight** - Water-soaked lesions on leaves
4. **Cotton Healthy** - No disease detected
5. **Cotton Powdery Mildew** - White powdery patches on leaves
6. **Cotton Target Spot** - Circular lesions with concentric rings

### Treatment Information
Each disease detection includes:
- **Description:** What the disease is
- **Cause:** What causes the disease
- **Treatment Options:**
  - Chemical treatments
  - Biological solutions
  - Prevention strategies

---

## Future Enhancement Opportunities

1. **Expand Disease Detection**
   - Support for more crop types
   - Additional disease classes
   - Multi-disease detection

2. **Advanced Features**
   - Mobile app (React Native)
   - Offline mode
   - Push notifications
   - Community features

3. **Analytics & Insights**
   - Disease trend analysis
   - Yield prediction
   - Cost-benefit analysis
   - Historical data visualization

4. **Integration**
   - IoT sensor integration
   - Drone imagery support
   - Satellite data integration
   - Market price tracking

---

## Learning Outcomes

- Full-stack web development
- Deep learning model development and deployment
- RESTful API design and implementation
- Database design and management
- Authentication and authorization
- Cloud deployment
- Real-world problem solving
- Project management and planning

---

## Contact & Links

- **Project Name:** Croptivize
- **Type:** Final Year Project (FYP)
- **Degree:** BS Software Engineering
- **University:** CUST (Capital University of Science and Technology)

---

*This document provides a comprehensive overview of the Croptivize project for reference purposes.*

