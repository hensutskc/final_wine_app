
import pandas as pd  #impoting pandas to read file
from pathlib import Path  #importing path to locate the files
from fastapi import FastAPI  #allows to use fastAPI
from fastapi.middleware.cors import CORSMiddleware  #lets react to accsess the API (allows for information to be shared from the excel sheet to the app)

app = FastAPI()  #creating the application

app.add_middleware(  #uses the import to allow acsess to the API
    CORSMiddleware,  # specifies the import
    allow_origins=[  # connects the website to the API
        "http://localhost:5173",  
        "http://127.0.0.1:5173"  # allows react into the hosting servers
    ],
    allow_methods=["GET"],  # allows for the data to be retrived
    allow_headers=["*"],   #* is declaring the lists as wildcards (just means less push back for future changes)
)

#similar code to before switch
file_path = Path(__file__).parent / "wine_company_inventory.xlsx"  # finds the excel sheet with location in same folder

@app.get("/api/wines-by-country")  #creates a GET endpoint 

def wines_by_country():  #creating fucntion that can be called throughout the code

    df = pd.read_excel(file_path, sheet_name="Wine Inventory")  #turns the excel sheet into readable data

    country_counts = df["Country of Origin"].value_counts()  #tally of wines from each country

    return [  
        {"country": country, "count": int(count)}  # makes a new list that can be read by JSON with all nessesary values e.g country and how many wines
        for country, count in country_counts.items()  #checks through new dictonary created
    ]

