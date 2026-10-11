import pandas as pd #importing the file reading library
from pathlib import Path #import path from the pathlib library

file_path = Path(__file__).parent / "wine_company_inventory.xlsx" #turns the file into a path and finds route to the excell sheet

df = pd.read_excel(file_path, sheet_name="Wine Inventory") #Gets panda to open the excell sheet and what page to read from

print(df.head()) #print results

country_counts = df["Country of Origin"].value_counts() #finds the country of origin colloum and counts how many time each country apears

print(country_counts)