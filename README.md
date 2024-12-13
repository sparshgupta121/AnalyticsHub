**Analytics Dashboard**
=======================

**Project Overview**
--------------------

The **Analytics Dashboard** is a comprehensive web application built using **React**, **Redux**, **TypeScript**, and **Recharts**. It serves as an interactive tool for **user management** and **data analytics**. The dashboard is designed with a responsive UI, utilizing **Tailwind CSS**, and offers visualizations like **line charts**, **pie charts**, and **bar charts** for tracking user activity.

### **Key Features:**

*   **Authentication System**:
    
    *   **Login Page**: Secure login functionality with username/password.
        
    *   **Protected Routes**: Routes are protected and require authentication.
        
    *   **Session Management**: Handled using **Redux** for persistent login across sessions.
        
*   **User Management Dashboard**:
    
    *   **User Listing**: Display users with pagination (5 users per page).
        
    *   **Search & Filter**: Search users by name or email, filter by status.
        
    *   **User Details Modal**: View user details in a modal.
        
    *   **Delete Functionality**: Admins can delete users.
        
    *   **User Status Indicators**: Easily identify active vs inactive users.
        
*   **Analytics Dashboard**:
    
    *   **Overview Cards**: Show key metrics such as **Total Users**, **Active Users**, and **Deleted Users**.
        
    *   **Registration Trend**: Line chart depicting user registrations over time.
        
    *   **Active vs Inactive Users**: Pie chart visualizing active vs inactive users.
        
    *   **User Distribution by Region**: Bar chart showing users' regional distribution.
        
    *   **Filters**: Date range and region filters to refine analytics data.
        
*   **Technical Implementation**:
    
    *   **State Management**: Managed via **Redux** for consistent and scalable data handling.
        
    *   **TypeScript**: Ensures type safety and minimal reliance on any type.
        
    *   **Recharts**: Provides rich, interactive data visualizations.
        
    *   **Tailwind CSS**: Built with **Tailwind CSS** for a responsive and mobile-first design.
        
    *   **Mock API Calls**: Simulated data using mock APIs for both user management and analytics.
        

**Installation Guide**
----------------------

To get the application up and running on your local machine, follow these steps:

### **1\. Clone the Repository:**

`   git clone [https://github.com/sparshgupta121/AnalyticsHub](https://github.com/sparshgupta121/AnalyticsHub)   `

### **2\. Install Dependencies:**

Ensure you have Node.js installed on your machine, then run the following command to install the project’s dependencies:

`   npm install   `

### **3\. Run the Project Locally:**

Start the development server with:

`   npm run dev   `

This will launch the application in your browser at http://localhost:3000.

**Login Credentials**
---------------------

*   **Username**: admin
    
*   **Password**: admin
    

Use these credentials to log in and access the dashboard.

**Navigation & Usage**
----------------------

### **Sidebar Navigation**:

*   **User Management**: View and manage users, search, and filter them.
    
*   **Analytics**: View trends and analytics with interactive charts.
    

### **Core Features**:

*   **User Management**:
    
    *   **Search**: Filter users by name or email.
        
    *   **View User Details**: View detailed user information in a modal.
        
    *   **Delete Users**: Admins can remove users.
        
    *   **Pagination**: List users with pagination (5 per page).
        
*   **Analytics Dashboard**:
    
    *   **Charts**:
        
        *   **Line Chart**: Displays user registration trends.
            
        *   **Pie Chart**: Visualizes active vs inactive users.
            
        *   **Bar Chart**: Shows user distribution across regions.
            
    *   **Filters**:
        
        *   Use **Date Range** and **Region** filters to update the charts dynamically.
            

### **Responsive Design**:

*   Fully responsive, ensuring optimal user experience on desktops, tablets, and mobile devices.
    

**Assumptions & Notes**
-----------------------

*   **Mock Data**: All data is simulated using mock APIs.
    
*   **No Real API Integration**: Currently, the app uses mock data for user and analytics information.
    

**Deployment**
--------------

The application is deployed to **Vercel** \[[Live](https://analyticshub.vercel.app/login)\].
