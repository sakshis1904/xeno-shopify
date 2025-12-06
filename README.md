### 🛍️ Shopify 

<div align = "centre" >### Live Demo : https://shopify1-wpxc.onrender.com/ </div> 

</br>

This solution demonstrates how I would help enterprise retailers onboard and analyse their Shopify data at scale.
It supports multiple stores, performs continuous ingestion of customer/order/product data, stores them tenant-isolated in an RDBMS, and visualizes growth metrics through an analytics dashboard.

My goal while building this was simple:
Make it production-lean, scalable, and business-driven — not just functional.

</br> 
 
### 🚀 What This System Solves

💠 A retailer should not worry about integration complexity
💠 Plug-in onboarding → Shopify store gets fully synced securely
💠 Data stays isolated per tenant → No cross-visibility
💠 Business team can view insights instantly instead of manual exports

</br> 

### ⚡ Tech Stack

Frontend: React
Backend: Node.js, Express
Database: MySQL
API: REST API
Authentication: JWT
Deployment : Render

</br> 

### 🔗 Shopify Integration

Shopify provides REST APIs and Webhooks that allow external applications to pull or receive store data like products, customers and orders. By integrating with Shopify, our system connects using API keys and fetches data for each store (tenant). This data is then stored in our database and converted into insights on the dashboard.

In simple terms:
Shopify Store → API/Webhook → Our Backend → Database → Dashboard Insights

</br> 

### Screenshot

![WhatsApp Image 2025-12-06 at 19 51 34_500d71e7](https://github.com/user-attachments/assets/867b5d40-127c-4f0a-99cd-e5b48dc5452a)

</br>

![WhatsApp Image 2025-12-06 at 19 52 15_94554d95](https://github.com/user-attachments/assets/9ede950c-bbac-4bd5-8a82-3aaabe1104c8)

</br>

![WhatsApp Image 2025-12-06 at 19 52 35_36093e53](https://github.com/user-attachments/assets/14bab552-611d-40f1-8e7f-27e25ea804d4)

</br>

![WhatsApp Image 2025-12-06 at 19 52 53_b851297e](https://github.com/user-attachments/assets/57f0ff2e-9164-4e65-8307-78f1fe8323a3)

</br>

### 🛠 Setup Instructions

1. Clone the repository
2. Navigate to backend and install dependencies (npm install)
3. Navigate to frontend and install dependencies (npm install)
4. Create a .env file and add:
     - Shopify API Key
     - Shopify Secret
     - MySQL connection string
5. Start the MySQL server and create the required database
6. Run the backend server (npm start)
7. Run the frontend (npm run dev)
8. Connect your Shopify store → initiate sync → data will start ingesting

</br> 

### 🏗 Architecture Diagram 

The system begins with a Shopify store, where data such as products, orders, and customers exists.
Our backend connects to Shopify using API credentials or webhooks and pulls that data into the application.
Once data is fetched, it is stored inside a MySQL database, where each tenant’s records are saved separately to maintain isolation and security.
The frontend dashboard (built using React) reads this stored data and displays it as insights, charts, and metrics for analysis.

So the flow goes like this:
Shopify Store → Backend Ingestion → MySQL Database → React Dashboard / Insights UI

</br> 

### 🗄 Database Schema 

* tenants → stores Shopify store details & access tokens
* products → product info (title, price, inventory, tenant_id)
* customers → customer details (name, email, tenant_id)
* orders → order data (amount, date, customer_id, tenant_id)

All tables use tenant_id to keep data isolated per store.

</br> 

### ⚠ Known Limitations / Assumptions

The current build fetches Shopify data on demand or scheduled intervals, not fully real-time unless webhooks are integrated. Large-scale stores with heavy order volumes may require queueing systems or background workers for faster ingestion. The dashboard displays core insights but advanced analytics, segmentation, and role-based access are still not implemented. These features can be added as the project scales into a more production-ready retail intelligence platform.

</br>

### 👩‍💻 Author
Sakshi Shrivastava
Full Stack Developer | React | Node.js
🔗 GitHub: https://github.com/sakshis1904
🔗 LinkedIn: https://www.linkedin.com/in/sakshi-shrivastava19/
