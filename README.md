# Practo Clone - Doctor & Practice Search System

## Overview  
This project is a **Doctor and Practice (Hospital/Clinic) Search System**, similar to **Practo**.  
It allows users to:  
- **Search for doctors and healthcare practices** based on **name** and **specialty**  
- **View detailed doctor and practice profiles**  
- **Manage doctor and practice information (Admin Feature)**  

---

## Technology Stack  
- **Backend:** Java (Spring Boot)  
- **Database:** MySQL  
- **Search Engine:** Elasticsearch  
- **Frontend:** React.js  

---

## Key Features  

### **Doctor Search**  
✅ Search by **name**  
✅ Search by **specialty**  
✅ View doctor **profile with details**  

### **Practice (Hospital/Clinic) Search**  
✅ Search by **name**  
✅ Search by **specialty**  
✅ View practice **profile with details**  

### **Admin Features**  
✅ **Add/Update Doctor Information** (Name, Specialty, Contact, Bio, Experience, Fee, Qualifications, Tags, etc.)  
✅ **Add/Update Practice Information** (Name, Specialty, Location, Contact, etc.)  

---

## Database Schema  

### **Doctor Table**  
| Column Name     | Data Type        | Description                 |
|---------------|---------------|-----------------------------|
| id           | INT (PK)       | Unique Doctor ID           |
| name         | VARCHAR(255)   | Doctor Name                |
| email        | VARCHAR(255)   | Email ID                   |
| phone_no     | VARCHAR(20)    | Contact Number             |
| speciality_id | INT (FK)       | Associated Specialization   |
| qualifications | TEXT          | Qualifications List        |
| experience   | INT            | Years of Experience        |
| bio         | TEXT           | Brief description about doctor |
| consultation_fee | DECIMAL(10,2) | Consultation Fee           |

---

### **Practice (Hospital/Clinic) Table**  
| Column Name  | Data Type      | Description                     |
|------------|-------------|---------------------------------|
| id         | INT (PK)     | Unique Practice ID             |
| name       | VARCHAR(255) | Practice/Hospital Name         |
| speciality_id | INT (FK)  | Associated Specialization       |
| city       | VARCHAR(255) | City where practice is located |
| state      | VARCHAR(255) | State                          |
| address    | TEXT         | Full Address                   |
| contact    | VARCHAR(20)  | Contact Number                 |

---

### **Speciality Table**  
| Column Name  | Data Type    | Description               |
|------------|-----------|---------------------------|
| specialityId | INT (PK)   | Unique Specialization ID  |
| name       | VARCHAR(255) | Specialization Name      |

---

### **Doctor-Practice Mapping Table**  
| Column Name  | Data Type | Description                 |
|------------|----------|-----------------------------|
| doctor_id  | INT (FK) | Links to Doctor Table       |
| practice_id | INT (FK) | Links to Practice Table     |

---

## **How to Run the Project**  

### **1. Clone the repository:**  
```sh
git clone https://github.com/Trilok-Singh-Thakur-Practo/FindDoctors.com.git
