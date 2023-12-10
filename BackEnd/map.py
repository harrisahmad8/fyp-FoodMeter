from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.common.exceptions import StaleElementReferenceException
import time
def scroll_incrementally(driver, scroll_distance):
    driver.execute_script(f"window.scrollBy(0, {scroll_distance});")
def get_reviews(keyword):
    try:
    # Set up the web driver (assuming you have ChromeDriver)
        driver = webdriver.Chrome()
        # Maximize the browser window for a full-screen view
        driver.set_window_size(800, 600)

        # Open Google Maps
        driver.get("https://www.google.com/maps")

        # Find the search box and enter the keyword
        search_box = driver.find_element(By.NAME, "q")
        search_box.send_keys(keyword)
        search_box.send_keys(Keys.RETURN)

        # Wait for the search results to load
        time.sleep(5)

        # Click on the first result in the list
        first_result_xpath = '/html/body/div[1]/div[3]/div[8]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[1]/div[1]/div[3]/div/a'
        first_result = driver.find_element(By.XPATH, first_result_xpath)
        first_result.click()
        print("first result clicked")

        # Wait for the location details to load
        time.sleep(3)

        # Wait for the review button to be clickable
        print("before reviews button")
        review_button_xpath = '//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[3]/div/div/button[2]/div[2]/div[2]'
        review_button = WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, review_button_xpath))
        )
        review_button.click()
        print("after clicking review button")

        # Wait for the review section to load
        time.sleep(3)
        reviews=[]

        max_scroll_attempts = 5  # You can adjust the number of attempts
        scroll_attempt = 1
        scroll_distance=200

        while scroll_attempt <= max_scroll_attempts:
                    scroll_attempt += 1
        # Scroll down to load more reviews
                    scroll_incrementally(driver, scroll_distance)
                    time.sleep(2)
                    #driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                    #time.sleep(3)
                    print("After scroll attempt", scroll_attempt)

        # Find and scrape all reviews
                    print("Before getting reviews")
                    review_elements = driver.find_elements(By.XPATH, '//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[9]/div[1]/div/div/div[4]/div[2]')
                    reviewsExtracted = [element.text for element in review_elements]
                    print("After getting reviews")


                    reviews.extend(reviewsExtracted)

                    #if reviews:
            # If reviews are found, break out of the loop
                     #break
                #except StaleElementReferenceException:
        # Handle StaleElementReferenceException, which might occur if the DOM is changing
                    #print("StaleElementReferenceException. Retrying...")
    
    
        
        return reviews

    except NoSuchElementException as e:
        print(f"Element not found: {e}")
    except TimeoutException as e:
        print(f"Timeout waiting for element: {e}")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        # Close the browser window
        driver.quit()

if __name__ == "__main__":
    # Example usage: provide a keyword to search for
    keyword_to_search = input("Enter a restaurant name or keyword: ")
    results = get_reviews(keyword_to_search)

    if results:
        print(f"\nReviews for '{keyword_to_search}':")
        for i, result in enumerate(results, start=1):
            print(f"Review {i}: {result}")
    else:
        print("No reviews found.")
