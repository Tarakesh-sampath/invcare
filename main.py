from fastapi import FastAPI, HTTPException
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
import httpx
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from contextlib import asynccontextmanager
import json

#python -m venv .venv; .\.venv\Scripts\Activate; pip install "fastapi[standard]" "pymongo[srv]" motor

app = FastAPI()
scheduler = BackgroundScheduler()
logging.basicConfig(level=logging.INFO)

client = AsyncIOMotorClient("mongodb+srv://Backend:1234@invdb.y7d9vxz.mongodb.net/")
print("client connected")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = client["Invcare"]
user_data_collection = db["user_data"]

async def fetch_and_log_data():
    url = "https://invcare-1.onrender.com/"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            if response.status_code == 200:
                logging.info(f"Root endpoint called successfully: {response.text}")
            else:
                logging.error(f"Failed to call root endpoint: {response.status_code}")
        except httpx.RequestError as e:
            logging.error(f"An error occurred: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start the scheduler
    scheduler.add_job(
        fetch_and_log_data,
        IntervalTrigger(minutes=12),  # Adjust the interval as needed
        id="fetch_root_endpoint",
        name="Fetch root endpoint periodically",
        replace_existing=True,
    )
    scheduler.start()
    logging.info("Scheduler started")
    
    # Yield control to FastAPI
    yield
    
    # Shutdown the scheduler
    scheduler.shutdown()
    logging.info("Scheduler shut down")

# Create FastAPI app with lifespan
app = FastAPI(lifespan=lifespan)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/register")
async def create_user(req_data: dict):
    if( req_data["password"] == req_data["c_password"]):
        data = {
            "username": req_data["username"],
            "createdAt": str(datetime.now()),
            "updatedAt": str(datetime.now()),
            "password": req_data["password"],
            "email": req_data["email"],
            "server": req_data["server"],
        }
        in_data = await user_data_collection.insert_one(data)
        return {"message": "true", "username": req_data["username"],"userid" : str(in_data.inserted_id)}
    return {"message": "false"}

@app.post("/login")
async def login(req_data: dict):
    username = req_data.get("username")
    password = req_data.get("password")

    # Fetch the user from the database
    user = await user_data_collection.find_one({"username": username})

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the password matches
    if user["password"] != password:
        raise HTTPException(status_code=401, detail="Incorrect password")
    print(username,password)
    return {"message": "true", "username": user["username"],"userid" : str(user["_id"])}