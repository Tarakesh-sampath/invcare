from fastapi import FastAPI, HTTPException, Depends
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from bson import ObjectId
app = FastAPI()

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

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/register")
async def create_user(req_data: dict):
    if req_data["password"] == req_data["c_password"]:
        data = {
            "username": req_data["username"],
            "createdAt": str(datetime.now()),
            "updatedAt": str(datetime.now()),
            "password": req_data["password"],
            "email": req_data["email"],
            "server": req_data["server"],
        }
        in_data = await user_data_collection.insert_one(data)
        return {"message": "true", "username": req_data["username"], "userid": str(in_data.inserted_id)}
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

    return {"username": user["username"], "userid": str(user["_id"]),"message" : "true" }

@app.get("/getdb")
async def getdb(objid:str,item:str):
    try:
        obj_id = ObjectId(objid)
        item = await user_data_collection.find_one({"_id": obj_id})
        # Connect to the MongoDB server
        client = AsyncIOMotorClient(item["server"])
        # Access the database and collection
        shop_db = client["shop_db"]
        inventory = shop_db["inventory"]
        
        # Fetch all items from the inventory collection
        items_cursor = inventory.find({"name": {"$regex": item, "$options": "i"}})
        items = await items_cursor.to_list(length=100)  # Adjust length as needed
        
        # Convert MongoDB ObjectId to string if needed
        for item in items:
            item['_id'] = str(item['_id'])
        
        return {"items": items}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))