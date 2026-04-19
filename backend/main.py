from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Literal
import sqlite3
import uuid

# =============================
# MODELS
# =============================
class LoginModel(BaseModel):
    email: str
    password: str

class DeliveryData(BaseModel):
    pickup: str
    dropoff: str
    date: str
    time: str
    packageType: Literal["small", "medium", "large"]
    ecoFriendly: bool

# =============================
# DATABASE IMPORTS & INIT
# =============================
from database import init_db, insert_delivery, get_all_deliveries
from login_database import init_login_db

# Initialize DBs
init_db()
init_login_db()

# =============================
# FASTAPI APP
# =============================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================
# DASHBOARD MOCK DATA
# =============================
dashboard_data = {
    "total_deliveries": 18,
    "eco_deliveries": 8,
    "fuel_saved_liters": 13.4,
    "co2_reduced_kg": 31.2,
    "eco_points": 240
}

# =============================
# SEND DELIVERY
# =============================
@app.post("/submit-delivery")
def submit_delivery(data: DeliveryData):
    insert_delivery(data)

    dashboard_data["total_deliveries"] += 1
    if data.ecoFriendly:
        dashboard_data["eco_deliveries"] += 1
        dashboard_data["fuel_saved_liters"] += 1.7
        dashboard_data["co2_reduced_kg"] += 3.2
        dashboard_data["eco_points"] += 25

    return {
        "status": "success",
        "message": "Delivery route received and stored.",
        "ecoMatch": data.ecoFriendly,
        "estimated_co2_saved": 3.2 if data.ecoFriendly else 0.0,
        "delivery_group": "cust_1 + cust_2" if data.ecoFriendly else None
    }

# =============================
# DASHBOARD SUMMARY
# =============================
@app.get("/dashboard-summary")
def get_dashboard_summary():
    return dashboard_data

# =============================
# DELIVERY HISTORY
# =============================
@app.get("/deliveries")
def fetch_all_deliveries():
    deliveries = get_all_deliveries()
    delivery_list = [
        {
            "id": d[0],
            "pickup": d[1],
            "dropoff": d[2],
            "date": d[3],
            "time": d[4],
            "packageType": d[5],
            "ecoFriendly": bool(d[6])
        }
        for d in deliveries
    ]
    return JSONResponse(content=delivery_list)

# =============================
# LOGIN ROUTE
# =============================
@app.post("/login")
def login(user: LoginModel):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = ?", (user.email,))
    result = cursor.fetchone()

    if not result:
        raise HTTPException(
            status_code=401,
            detail="電子郵件或密碼錯誤"
        )

    stored_password = result[2]

    if stored_password != user.password:
        raise HTTPException(
            status_code=401,
            detail="電子郵件或密碼錯誤"
        )

    token = "sample-token"
    return {"token": token}

@app.delete("/delete-delivery/{delivery_id}")
def delete_delivery(delivery_id: int):
    conn = sqlite3.connect("deliveries.db")
    cur = conn.cursor()

    cur.execute("DELETE FROM deliveries WHERE id = ?", (delivery_id,))
    conn.commit()
    conn.close()

    return {"status": "success", "message": "Delivery deleted"}
