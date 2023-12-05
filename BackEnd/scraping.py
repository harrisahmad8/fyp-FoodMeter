from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from googletrans import Translator
import re
import pymongo

def get_reviews_and_info(keyword, chromedriver_path, num_reviews=10):
    # MongoDB connection string
    mongo_uri = "mongodb+srv://chaudhryhamid655:hamid5678@cluster0.orho31g.mongodb.net/FoodMeter?retryWrites=true&w=majority"
    
    # Connect to MongoDB
    client = pymongo.MongoClient(mongo_uri)

    # Select the database and collection
    db = client.FoodMeter
    collection = db.restaurants

    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    options.add_argument('--disable-extensions')
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    chrome_service = Service(chromedriver_path)

    driver = webdriver.Chrome(
        service=chrome_service,
        options=options,
    )

    translator = Translator()

    try:
        driver.maximize_window()
        driver.get("https://www.tripadvisor.com/")

        # Wait for the search input field to be present
        search_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "q"))
        )
        search_input.send_keys(keyword)
        search_input.send_keys(Keys.RETURN)

        # Wait for the first result to be present
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "result-title"))
        )
        first_result = driver.find_element(By.CLASS_NAME, "result-title")

        onclick_value = first_result.get_attribute("onclick")

        if onclick_value:
            match = re.search(r"('/[^']+\.html')", onclick_value)

            if match:
                url = match.group(1).strip("'")
                full_url = "https://www.tripadvisor.com/" + url
                print("Full URL:", full_url)

                # Open the extracted URL in a new browser window
                driver.get(full_url)

                # Wait for the individual restaurant page to load
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "review-container"))
                )

                # Get the name of the restaurant using CSS selector
                restaurant_name = driver.find_element(By.CSS_SELECTOR, 'h1[data-test-target="top-info-header"]').text
                print(f"Restaurant Name: {restaurant_name}")

                # Check if the restaurant name already exists in the database
                if collection.find_one({'name': restaurant_name}):
                    print(f"Restaurant '{restaurant_name}' already exists in the database. Skipping.")
                    return

                # Get the cuisine types using class name
                cuisine_types = driver.find_elements(By.CLASS_NAME, 'SrqKb')
                cuisine_list = [cuisine.text for cuisine in cuisine_types]
                print(f"Cuisine Types: {', '.join(cuisine_list)}")

                # Find all reviews in the "review-container" class and "partial_entry" class
                reviews = driver.find_elements(By.CSS_SELECTOR, ".review-container .partial_entry")[:num_reviews]

                # Store data in MongoDB
                restaurant_data = {
                    'name': restaurant_name,
                    'foodType': cuisine_list,
                    'systemComments': [review.text for review in reviews]
                }
                collection.insert_one(restaurant_data)
                
                print("Data added to MongoDB.")

            else:
                print("URL not found in the onclick attribute.")

        else:
            print("No onclick attribute found.")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        driver.quit()
        client.close()  # Close MongoDB connection
    return restaurant_data