from fastapi import FastAPI, HTTPException, Depends
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from bson import ObjectId
app = FastAPI()
#http://127.0.0.1:8000 
client = AsyncIOMotorClient("mongodb+srv://demo:demopass@invcare-demo.wpinr.mongodb.net/")

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

async def get_user_by_email(email: str):
    user = await user_data_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

async def get_user_db_link(email: str):
    user = await get_user_by_email(email)
    mongodb_url = str(user["server"])  # Assuming "server" holds the MongoDB URL
    if not mongodb_url:
        raise HTTPException(status_code=500, detail="MongoDB URL not found for the user")
    db = AsyncIOMotorClient(str(mongodb_url))
    return db["shop_db"] # Assuming database name is "shop_db"

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
    return {"username": user["username"], "email": str(user["email"]),"message" : "true" }


#add items
@app.post("/additem")
async def add_item(req_data: dict ):
    try:
        shop = await get_user_db_link(str(req_data.get("email")))
        inventory = shop["inventory"]
        print("server connected")
        new_item = {
            "name": req_data.get("item_name"),
            "quantity": int(req_data.get("quantity")),
            "price": int(req_data.get("price")),
            "description": req_data.get("description")
        }
        result = await inventory.insert_one(new_item)
        return {"message": "Item added successfully", "item_id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/getdb")
async def getdb(req_data: dict):
    try:
        print(str(req_data.get("email")))
        shop = await get_user_db_link(str(req_data.get("email")))
        inventory = shop["inventory"]
        # Perform the search operation
        items_cursor = inventory.find({"name": {"$regex": str(req_data.get("item_name")), "$options": "i"}})
        items = await items_cursor.to_list(length=100)

        # Convert MongoDB ObjectId to string if needed
        for itm in items:
            itm['_id'] = str(itm['_id'])
        return {"items": items}

    except Exception as e:
        print(f"Error: {str(e)}")  # Print error to the server log
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/getdata")
async def getdb(req_data: dict):
    try:
        print(str(req_data.get("email")))
        shop = await get_user_db_link(str(req_data.get("email")))
        inventory = shop["inventory"]
        # Perform the search operation
        items_cursor = inventory.find()
        items = await items_cursor.to_list(length=100)

        # Convert MongoDB ObjectId to string if needed
        for itm in items:
            itm['_id'] = str(itm['_id'])
        return {"items": items}

    except Exception as e:
        print(f"Error: {str(e)}")  # Print error to the server log
        raise HTTPException(status_code=500, detail=str(e))