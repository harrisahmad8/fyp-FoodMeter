import nltk
from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional,List
import instaloader
import time


from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from googletrans import Translator
import re
import pymongo
from bson import ObjectId
import numpy as np
from googletrans import Translator
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
from insta import getKeywordCaptions


app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


nltk.download('punkt')

nltk.download('vader_lexicon')
loaded_model = load_model('D:\\university\\FYP\\fyp-FoodMeter\\BackEnd\\FakeeDetection.h5')

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize




sia = SentimentIntensityAnalyzer()

custom_lexicon = {
    'admiration': 1.5,
    'affection': 1.5,
    'approval': 1.5,
    'gratitude': 1.5,
    'liking': 1.5,
    'love': 1.5,
    'praise': 1.5,
    'satisfaction': 1.5,
    'contentment': 1.5,
    'delight': 1.5,
    'happiness': 1.5,
    'joy': 1.5,
    'pleasure': 1.5,
    'optimism': 1.5,
    'hope': 1.5,
    'confidence': 1.5,
    'faith': 1.5,
    'inspiration': 1.5,
    'motivation': 1.5,
    'enthusiasm': 1.5,
    'passion': 1.5,
    'ambition': 1.5,
    'interest': 1.0,
    'curiosity': 1.0,
    'wonder': 1.0,
    'fascination': 1.0,
    'amusement': 1.0,
    'daring': 1.0,
    'honor': 1.0,
    'respect': 1.0,
    'trust': 1.0,
    'excitement': 1.0,
    'eagerness': 1.0,
    'admiration': 1.0,
    'appreciation': 1.0,
    'wonder': 1.0,
    'awe': 1.0,
    'fascination': 1.0,
    'empathy': 1.0,
    'kindness': 1.0,
    'sympathy': 1.0,
    'goodness': 1.0,
    'compassion': 1.0,
    'serenity': 1.0,
    'relaxation': 1.0,
    'relief': 1.0,
    'contentment': 1.0,
    'excitement': 1.0,
    'interest': 1.0,
    'curiosity': 1.0,
    'amazement': 1.0,
    'hope': 1.0,
    'motivation': 1.0,
    'relief': 1.0,
    'peace': 1.0,
    'tolerance': 1.0,
    'forgiveness': 1.0,
    'calmness': 1.0,
    'warmth': 1.0,
    'comfort': 1.0,
    'ease': 1.0,
    'tranquility': 1.0,
    'confidence': 1.0,
    'euphoria': 1.0,
    'bliss': 1.0,
    'gratitude': 1.0,
    'inspiration': 1.0,
    'ambition': 1.0,
    'enthusiasm': 1.0,
    'drive': 1.0,
    'energy': 1.0,
    'intimacy': 1.0,
    'tenderness': 1.0,
    'affection': 1.0,
    'eagerness': 1.0,
    'persistence': 1.0,
    'amusement': 1.0,
    'fun': 1.0,
    'relaxation': 1.0,
    'surprise': 1.0,
    'excitement': 1.0,
    'thrill': 1.0,
    'interest': 1.0,
    'curiosity': 1.0,
    'wonder': 1.0,
    'relief': 1.0,
    'amazement': 1.0,
    'awe': 1.0,
    'compassion': 1.0,
    'tolerance': 1.0,
    'kindness': 1.0,
    'friendliness': 1.0,
    'humanity': 1.0,
    'charity': 1.0,
    'generosity': 1.0,
    'peace': 1.0,
    'patience': 1.0,
    'confidence': 1.0,
    'euphoria': 1.0,
    'kindness': 1.0,
    'sympathy': 1.0,
    'goodness': 1.0,
    'selflessness': 1.0,
    'tolerance': 1.0,
    'forgiveness': 1.0,
    'comfort': 1.0,
    'ease': 1.0,
    'compassion': 1.0,
    'empathy': 1.0,
    'contentment': 1.0,
    'serenity': 1.0,
    'relaxation': 1.0,
    'peace': 1.0,
    'relief': 1.0,
    'relaxation': 1.0,
    'serenity': 1.0,
    'delight': 1.0,
    'elation': 1.0,
    'bliss': 1.0,
    'love': 1.0,
    'passion': 1.0,
    'optimism': 1.0,
    'enthusiasm': 1.0,
    'hope': 1.0,
    'inspiration': 1.0,
    'motivation': 1.0,
    'ambition': 1.0,
    'drive': 1.0,
    'energy': 1.0,
    'excitement': 1.0,
    'interest': 1.0,
    'curiosity': 1.0,
    'wonder': 1.0,
    'fascination': 1.0,
    'amusement': 1.0,
    'daring': 1.0,
    'confidence': 1.0,
    'eagerness': 1.0,
    'persistence': 1.0,
    'optimism': 1.0,
    'joy': 1.0,
    'happiness': 1.0,
    'wonder': 1.0,
    'surprise': 1.0,
    'enthusiasm': 1.0,
    'thrill': 1.0,
    'hope': 1.0,
    'inspiration': 1.0,
    'motivation': 1.0,
    'amusement': 1.0,
    'fun': 1.0,
    'pleasure': 1.0,
    'relief': 1.0,
    'calmness': 1.0,
    'comfort': 1.0,
    'interest': 1.0,
    'curiosity': 1.0,
    'wonder': 1.0,
    'amazement': 1.0,
    'awe': 1.0,
    'compassion': 1.0,
    'tolerance': 1.0,
    'kindness': 1.0,
    'friendliness': 1.0,
    'humanity': 1.0,
    'charity': 1.0,
    'generosity': 1.0,
    'peace': 1.0,
    'patience': 1.0,
    'confidence': 1.0,
    'euphoria': 1.0,
    'kindness': 1.0,
    'sympathy': 1.0,
    'goodness': 1.0,
    'selflessness': 1.0,
    'tolerance': 1.0,
    'forgiveness': 1.0,
    'comfort': 1.0,
    'ease': 1.0,
    'compassion': 1.0,
    'empathy': 1.0,
    'contentment': 1.0,
    'serenity': 1.0,
    'relaxation': 1.0,
    'peace': 1.0,
    'relief': 1.0,
    'relaxation': 1.0,
    'serenity': 1.0,
    'delight': 1.0,
    'elation': 1.0,
    'bliss': 1.0,
    'love': 1.0,
    'passion': 1.0,
    'optimism': 1.0,
    'enthusiasm': 1.0,
    'hope': 1.0,
    'inspiration': 1.0,
    'motivation': 1.0,
    'ambition': 1.0,
    'drive': 1.0,
    'energy': 1.0,
    'excitement': 1.0,
    'interest': 1.0,
    'curiosity': 1.0,
    'wonder': 1.0,
    'fascination': 1.0,
    'amusement': 1.0,
    'daring': 1.0,
    'confidence': 1.0,
    'eagerness': 1.0,
    'persistence': 1.0,
    'optimism': 1.0,
    'joy': 1.0,
    'happiness': 1.0,
    'wonder': 1.0,
    'surprise': 1.0,
    'enthusiasm': 1.0,
    'thrill': 1.0,
    'hope': 1.0,
    'inspiration': 1.0,
    'motivation': 1.0,
    'amusement': 1.0,
    'fun': 1.0,
    'pleasure': 1.0,
    'relief': 1.0,
    'calmness': 1.0,
    'comfort': 1.0,
    'interest': 1.0,
    'curiosity': 1.0,
    'wonder': 1.0,
    'amazement': 1.0,
    'awe': 1.0,
    'compassion': 1.0,
    'tolerance': 1.0,
    'kindness': 1.0,
    'friendliness': 1.0,
    'humanity': 1.0,
    'charity': 1.0,
    'generosity': 1.0,
    'peace': 1.0,
    'patience': 1.0,
    'confidence': 1.0,
    'euphoria': 1.0,
    'kindness': 1.0,
    'sympathy': 1.0,
    'goodness': 1.0,
    'selflessness': 1.0,
    'tolerance': 1.0,
    'forgiveness': 1.0,
    'comfort': 1.0,
    'ease': 1.0,
    'compassion': 1.0,
    'empathy': 1.0,
    'contentment': 1.0,
    'serenity': 1.0,
    'relaxation': 1.0,
    'peace': 1.0,
    'relief': 1.0,
    'relaxation': 1.0,
    'serenity': 1.0,
    'delight': 1.0,
    'elation': 1.0,
    'bliss': 1.0,
    'kindness': 1.0,
    'sympathy': 1.0,
    'goodness': 1.0,
    'selflessness': 1.0,
    'patience': 1.0,
    'tolerance': 1.0,
    'forgiveness': 1.0,
    'peace': 1.0,
    'calmness': 1.0,
    'comfort': 1.0,
    'ease': 1.0,
    'compassion': 1.0,
    'empathy': 1.0,
    'contentment': 1.0,
    'serenity': 1.0,
    'relaxation': 1.0,
    'peace': 1.0,
    'relief': 1.0,
    'relaxation': 1.0,
    'serenity': 1.0,
    'delight': 1.0,
    'elation': 1.0,
    'bliss': 1.0,
    'sadness': -1.5,
    'anger': -1.5,
    'fear': -1.5,
    'disgust': -1.5,
    'loneliness': -1.5,
    'disappointment': -1.5,
    'grief': -1.5,
    'guilt': -1.5,
    'shame': -1.5,
    'regret': -1.5,
    'pain': -1.5,
    'anxiety': -1.5,
    'stress': -1.5,
    'confusion': -1.5,
    'frustration': -1.5,
    'boredom': -1.5,
    'indifference': -1.5,
    'disinterest': -1.5,
    'apathy': -1.5,
    'ennui': -1.5,
    'irritation': -1.5,
    'hostility': -1.5,
    'jealousy': -1.5,
    'envy': -1.5,
    'greed': -1.5,
    'selfishness': -1.5,
    'bitterness': -1.5,
    'resentment': -1.5,
    'hate': -1.5,
    'indifference': -1.5,
    'neglect': -1.5,
    'rejection': -1.5,
    'isolation': -1.5,
    'hopelessness': -1.5,
    'despair': -1.5,
    'grief': -1.5,
    'remorse': -1.5,
    'anxiety': -1.5,
    'fear': -1.5,
    'stress': -1.5,
    'panic': -1.5,
    'tension': -1.5,
    'disgust': -1.5,
    'loathing': -1.5,
    'abhorrence': -1.5,
    'regret': -1.5,
    'remorse': -1.5,
    'shame': -1.5,
    'embarrassment': -1.5,
    'nervousness': -1.5,
    'discomfort': -1.5,
    'sorrow': -1.5,
    'melancholy': -1.5,
    'dissatisfaction': -1.5,
    'frustration': -1.5,
    'discontent': -1.5,
    'anger': -1.5,
    'rage': -1.5,
    'hostility': -1.5,
    'irritation': -1.5,
    'annoyance': -1.5,
    'bitterness': -1.5,
    'distrust': -1.5,
    'paranoia': -1.5,
    'guilt': -1.5,
    'remorse': -1.5,
    'shame': -1.5,
    'self-pity': -1.5,
    'jealousy': -1.5,
    'envy': -1.5,
    'greed': -1.5,
    'selfishness': -1.5,
    'malice': -1.5,
    'hatred': -1.5,
    'cruelty': -1.5,
    'neglect': -1.5,
    'rejection': -1.5,
    'abandonment': -1.5,
    'isolation': -1.5,
    'hopelessness': -1.5,
    'despair': -1.5,
    'shock': -1.5,
    'disbelief': -1.5,
    'confusion': -1.5,
    'fear': -1.5,
    'disorientation': -1.5,
    'surprise': -1.5,
    'horror': -1.5,
    'revulsion': -1.5,
    'disgust': -1.5,
    'indifference': -1.5,
    'apathy': -1.5,
    'boredom': -1.5,
    'ennui': -1.5,
    'disinterest': -1.5,
    'insomnia': -1.5,
    'fatigue': -1.5,
    'weariness': -1.5,
    'exhaustion': -1.5,
    'irritation': -1.5,
    'annoyance': -1.5,
    'frustration': -1.5,
    'anger': -1.5,
    'rage': -1.5,
    'hostility': -1.5,
    'jealousy': -1.5,
    'envy': -1.5,
    'greed': -1.5,
    'selfishness': -1.5,
    'bitterness': -1.5,
    'resentment': -1.5,
    'hate': -1.5,
    'indifference': -1.5,
    'neglect': -1.5,
    'rejection': -1.5,
    'isolation': -1.5,
    'hopelessness': -1.5,
    'despair': -1.5,
    'grief': -1.5,
    'remorse': -1.5,
    'anxiety': -1.5,
    'fear': -1.5,
    'stress': -1.5,
    'panic': -1.5,
    'tension': -1.5,
    'disgust': -1.5,
    'loathing': -1.5,
    'abhorrence': -1.5,
    'regret': -1.5,
    'remorse': -1.5,
    'shame': -1.5,
    'embarrassment': -1.5,
    'nervousness': -1.5,
    'discomfort': -1.5,
    'sorrow': -1.5,
    'melancholy': -1.5,
    'dissatisfaction': -1.5,
    'frustration': -1.5,
    'discontent': -1.5,
    'anger': -1.5,
    'rage': -1.5,
    'hostility': -1.5,
    'irritation': -1.5,
    'annoyance': -1.5,
    'bitterness': -1.5,
    'distrust': -1.5,
    'paranoia': -1.5,
    'guilt': -1.5,
    'remorse': -1.5,
    'shame': -1.5,
    'self-pity': -1.5,
    'jealousy': -1.5,
    'envy': -1.5,
    'greed': -1.5,
    'selfishness': -1.5,
    'malice': -1.5,
    'hatred': -1.5,
    'cruelty': -1.5,
    'neglect': -1.5,
    'rejection': -1.5,
    'abandonment': -1.5,
    'isolation': -1.5,
    'hopelessness': -1.5,
    'despair': -1.5,
    'shock': -1.5,
    'disbelief': -1.5,
    'confusion': -1.5,
    'fear': -1.5,
    'disorientation': -1.5,
    'surprise': -1.5,
    'horror': -1.5,
    'revulsion': -1.5,
    'disgust': -1.5,
    'indifference': -1.5,
    'apathy': -1.5,
    'boredom': -1.5,
    'ennui': -1.5,
    'disinterest': -1.5,
    'insomnia': -1.5,
    'fatigue': -1.5,
    'weariness': -1.5,
    'exhaustion': -1.5,
    'irritation': -1.5,
    'annoyance': -1.5,
    'frustration': -1.5,
    'anger': -1.5,
    'rage': -1.5,
    'hostility': -1.5,
    'jealousy': -1.5,
    'envy': -1.5,
    'greed': -1.5,
    'selfishness': -1.5,
    'bitterness': -1.5,
    'resentment': -1.5,
    'hate': -1.5,
    'indifference': -1.5,
    'neglect': -1.5,
    'rejection': -1.5,
    'isolation': -1.5,
    'hopelessness': -1.5,
    'despair': -1.5,
    'grief': -1.5,
    'remorse': -1.5,
    'anxiety': -1.5,
    'fear': -1.5,
    'stress': -1.5,
    'panic': -1.5,
    'tension': -1.5,
    'disgust': -1.5,
    'loathing': -1.5,
    'abhorrence': -1.5,
    'regret': -1.5,
    'remorse': -1.5,
    'shame': -1.5,
    'embarrassment': -1.5,
    'nervousness': -1.5,
    'discomfort': -1.5,
    'sorrow': -1.5,
    'melancholy': -1.5,
    'dissatisfaction': -1.5,
    'frustration': -1.5,
    'discontent': -1.5,
    'anger': -1.5,
    'rage': -1.5,
    'hostility': -1.5,
    'irritation': -1.5,
    'annoyance': -1.5,
    'bitterness': -1.5,
    'distrust': -1.5,
    'paranoia': -1.5,
    'guilt': -1.5,
    'remorse': -1.5,
    'shame': -1.5,
    'self-pity': -1.5,
    'jealousy': -1.5,
    'envy': -1.5,
    'greed': -1.5,
    'selfishness': -1.5,
    'malice': -1.5,
    'hatred': -1.5,
    'cruelty': -1.5,
    'neglect': -1.5,
    'rejection': -1.5,
    'abandonment': -1.5,
    'isolation': -1.5,
    'hopelessness': -1.5,
    'despair': -1.5,
    'shock': -1.5,
    'disbelief': -1.5,
    'confusion': -1.5,
    'fear': -1.5,
    'disorientation': -1.5,
    'surprise': -1.5,
    'horror': -1.5,
    'revulsion': -1.5,
    'disgust': -1.5,
    'indifference': -1.5,
    'apathy': -1.5,
    'boredom': -1.5,
    'ennui': -1.5,
    'disinterest': -1.5,
    'insomnia': -1.5,
    'fatigue': -1.5,
    'weariness': -1.5,
    'exhaustion': -1.5,
    'irritation': -1.5,
    'annoyance': -1.5,
    'frustration': -1.5,
    'anger': -1.5,
    'rage': -1.5,
    'hostility': -1.5,
    'jealousy': -1.5,
    'envy': -1.5,
    'greed': -1.5,
    'selfishness': -1.5,
    'bitterness': -1.5,
    'resentment': -1.5,
    'hate': -1.5,
    'indifference': -1.5,
    'neglect': -1.5,
    'rejection': -1.5,
    'isolation': -1.5,
    'hopelessness': -1.5,
    'despair': -1.5,
    'grief': -1.5,
    'remorse': -1.5,
    'anxiety': -1.5,
    'fear': -1.5,
    'stress': -1.5,
    'panic': -1.5,
    'tension': -1.5,
    'disgust': -1.5,
    'loathing': -1.5,
    'abhorrence': -1.5,
    'regret': -1.5,
    'remorse': -1.5,
    'shame': -1.5,
    'embarrassment': -1.5,
    'nervousness': -1.5,
    'discomfort': -1.5,
    'sorrow': -1.5,
    'melancholy': -1.5,
    'dissatisfaction': -1.5,
    'frustration': -1.5,
    'discontent': -1.5,
    'anger': -1.5,
    'rage': -1.5,
    'hostility': -1.5,
    'irritation': -1.5,
    'annoyance': -1.5,
    'bitterness': -1.5,
    'distrust': -1.5,
    'paranoia': -1.5,
    'guilt': -1.5,
    'remorse': -1.5,
    'shame': -1.5,
    'self-pity': -1.5,
    'jealousy': -1.5,
    'envy': -1.5,
    'greed': -1.5,
    'selfishness': -1.5,
    'malice': -1.5,
    'hatred': -1.5,
    'cruelty': -1.5,
    'neglect': -1.5,
    'rejection': -1.5,
    'abandonment': -1.5,
    'isolation': -1.5,
    'hopelessness': -1.5,
    'despair': -1.5,
    'shock': -1.5,
    'disbelief': -1.5,
    'confusion': -1.5,
    'fear': -1.5,
    'disorientation': -1.5,
    'surprise': -1.5,
    'horror': -1.5,
    'revulsion': -1.5,
    'disgust': -1.5,
    'indifference': -1.5,
    'apathy': -1.5,
    'boredom': -1.5,
    'ennui': -1.5,
    'disinterest': -1.5,
    'insomnia': -1.5,
    'fatigue': -1.5,
    'weariness': -1.5,
    'exhaustion': -1.5,
    'irritation': -1.5,
    'annoyance': -1.5,
    'frustration': -1.5,
    'anger': -1.5,
    'rage': -1.5,
    'hostility': -1.5,
    'jealousy': -1.5,
    'envy': -1.5,
    'greed': -1.5,
    'selfishness': -1.5,
    'bitterness': -1.5,
    'resentment': -1.5,
    'hate': -1.5,
    'indifference': -1.5,
    'neglect': -1.5,
    'rejection': -1.5,
    'isolation': -1.5,
    'hopelessness': -1.5,
    'despair': -1.5,
    'grief': -1.5,
    'remorse': -1.5,
    'anxiety': -1.5,
    'fear': -1.5,
    'stress': -1.5,
    'panic': -1.5,
    'tension': -1.5,
    'disgust': -1.5,
    'loathing': -1.5,
    'abhorrence': -1.5,
    'regret': -1.5,
    'remorse': -1.5,
    'shame': -1.5,
    'embarrassment': -1.5,
    'nervousness': -1.5,
    'discomfort': -1.5,
    'sorrow': -1.5,
    'melancholy': -1.5,
    'dissatisfaction': -1.5,
    'frustration': -1.5,
    'discontent': -1.5,
    'anger': -1.5,
    'rage': -1.5,
    'hostility': -1.5,
    'irritation': -1.5,
    'annoyance': -1.5,
    'bitterness': -1.5,
    'distrust': -1.5,
    'paranoia': -1.5,
    'guilt': -1.5,
    'remorse': -1.5,
    'shame': -1.5,
    'self-pity': -1.5,
    'jealousy': -1.5,
    'envy': -1.5,
    'greed': -1.5,
    'selfishness': -1.5,
    'malice': -1.5,
    'hatred': -1.5,
    'cruelty': -1.5,
    'neglect': -1.5,
    'rejection': -1.5,
    'abandonment': -1.5,
    'isolation': -1.5,
    'hopelessness': -1.5,
    'despair': -1.5,
    'shock': -1.5,
    'disbelief': -1.5,
    'confusion': -1.5,
    'fear': -1.5,
    'disorientation': -1.5,
    'surprise': -1.5,
    'horror': -1.5,
    'revulsion': -1.5,
    'disgust': -1.5,
    'indifference': -1.5,
    'apathy': -1.5,
    'boredom': -1.5,
    'ennui': -1.5,
    'disinterest': -1.5,
    'insomnia': -1.5,
    'fatigue': -1.5,
    'weariness': -1.5,
    'exhaustion': -1.5
}

sia.lexicon.update(custom_lexicon)


negation_words = [
    "Not",
    "No",
    "Neither",
    "Nor",
    "None",
    "Never",
    "Nothing",
    "Nobody",
    "Nowhere",
    "Hardly",
    "Barely",
    "Rarely",
    "Scarcely",
    "Seldom",
    "Few",
    "Little",
    "Lack",
    "Lacking",
    "Without",
    "Absence",
    "Negative",
    "Opposite",
    "Reversal",
    "Contrary",
    "Antithesis",
    "Anti",
    "Deny",
    "Refuse",
    "Reject",
    "Resist",
    "Block",
    "Prevent",
    "Stop",
    "Inhibit",
    "Halt",
    "Counter",
    "Contradict",
    "Contra",
    "However",
    "Nevertheless",
    "Nonetheless",
    "Although",
    "Though",
    "Yet",
    "But",
    "Despite",
    "In spite of",
    "Even though",
    "Although",
    "While",
    "Don't",
    "Doesn't",
    "Didn't",
    "Can't",
    "Couldn't",
    "Won't",
    "Wouldn't",
    "Shouldn't",
    "Mustn't",
    "Isn't",
    "Aren't",
    "Hasn't",
    "Haven't",
    "Hadn't",
    "Wasn't",
    "Weren't",
    "Isn't",
    "Wain't",
    "Needn't",
    "Nor",
    "Hardly",
    "Barely",
    "Scarcely",
    "Seldom",
    "Few",
    "Little",
    "Lack",
    "Lacking",
    "Without",
    "Absence",
    "Negative",
    "Opposite",
    "Reversal",
    "Contrary",
    "Antithesis",
    "Anti",
    "Deny",
    "Refuse",
    "Reject",
    "Resist",
    "Block",
    "Prevent",
    "Stop",
    "Inhibit",
    "Halt",
    "Counter",
    "Contradict",
    "Contra",
    "However",
    "Nevertheless"
]

#insta scraper
def getKeywordCaptions(keyword, num_posts_per_user=6):
    print("insta loader is running")

    loader = instaloader.Instaloader()

    # Load session from file
    loader.load_session_from_file("halima.abbas6")

    # List of Instagram usernames
    usernames = ['food_exploration_with_umair', 'islamabadfoodgram', 'thefoodloverfromcapital']

    captions_list = []  

    for username in usernames:
        
        profile = instaloader.Profile.from_username(loader.context, username)

        count = 0
        for post in profile.get_posts():
            # Limit the search to the specified number of posts per user
            if count >= num_posts_per_user:
                break

            # Increment the count for every post
            count += 1

            # Check if the keyword is in the post caption
            if keyword.lower() in post.caption.lower():
                caption = post.caption if post.caption else ''
                captions_list.append(caption)

            # Add a 2-second delay between posts
            time.sleep(2)

    # Close the session
    loader.context.log("Closed session")
    loader.close()

    # Join the individual captions into a single string
    

    return captions_list


def adjust_for_negation(sentiments, text):
    words = word_tokenize(text)
    for i in range(len(words)):
        if words[i].lower() in negation_words:
            j = i + 1
            while j < len(words) and words[j] not in [',', '.', '!', '?', ';']:
                if words[j].lower() in custom_lexicon:
                    sentiments['compound'] *= -1  
                    break
                j += 1
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

def analyze_review(review):
    sentiment_scores = sia.polarity_scores(review)
    adjust_for_negation(sentiment_scores,review)
    min_score = -1.0
    max_score = 1.0
    scaled_rating = 1 + 4 * (sentiment_scores['compound'] - min_score) / (max_score - min_score)
    review_rating = max(1, min(5, scaled_rating))
    return {'content': review, 'rating': review_rating}

def restaurant_review_rating(reviews):
    analyzed_reviews = [analyze_review(review) for review in reviews]

    total_score = sum(review['rating'] for review in analyzed_reviews)
    average_score = total_score / len(analyzed_reviews)
    return average_score, analyzed_reviews

class Comment(BaseModel):
    content: str
    rating: float

class RestaurantResponse(BaseModel):
    _id:ObjectId
    name: str
    foodType: List[str]
    systemComments: List[Comment]
    systemRating:Optional[float]=None
    logoPath:Optional[str]=None

#Fake reviews detection
def fakeReviewDetection(text):
      input_text = text
      max_len = 100
      tokenizer = Tokenizer(num_words=max_len)
      predicted_label = predict_text_label(input_text, loaded_model, tokenizer, max_len)
      custom_label = "fake" if predicted_label == 0 else "original"
      print("Predicted Custom Label:", custom_label)
      return custom_label
      

def predict_text_label(text, model, tokenizer, max_len):
    # Tokenize the input text
    sequences = tokenizer.texts_to_sequences([text])

    # Pad the sequence
    padded_sequence = pad_sequences(sequences, maxlen=max_len)

    # Make the prediction
    prediction = model.predict(padded_sequence)

    # Convert the probability to a binary label (0 or 1)
    predicted_label = np.round(prediction).astype(int)

    return predicted_label



@app.get("/rating/{keyword}")




def get_reviews_and_info(keyword:str, num_reviews=10):
    chromedriver_path = 'C:/Users\chaud\Downloads\chromedriver-win64\chromedriver-win64/chromedriver.exe'
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
    options.add_argument('--headless')

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
        WebDriverWait(driver, 20).until(
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
                WebDriverWait(driver, 20).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "review-container"))
                )
                restaurantXpath='//*[@id="taplc_resp_rr_photo_mosaic_0"]/div/div[1]/div[1]/div[2]/div[2]/div[1]/div/img'
                restaurant_image = driver.find_element(By.XPATH, restaurantXpath).get_attribute('src')
                print(f"Restaurant Image URL: {restaurant_image}")

                # Get the name of the restaurant using CSS selector
                restaurant_name = driver.find_element(By.CSS_SELECTOR, 'h1[data-test-target="top-info-header"]').text
                print(f"Restaurant Name: {restaurant_name}")

                # Check if the restaurant name already exists in the database
                restaurant_data = collection.find_one({'name': restaurant_name})
                print("mongodb:",restaurant_data)
                

                if restaurant_data:
                       data = {
                           
                        '_id':restaurant_data["_id"],
                        'name': restaurant_name,
                        'foodType': restaurant_data["foodType"],
                        'systemComments':restaurant_data["systemComments"],
                        'systemRating':restaurant_data["systemRating"],
                        'logoPath':restaurant_image
                       }     
                    
                       print(f"Restaurant '{restaurant_name}' already exists in the database. Skipping.")
    
                       print("Restaurant Data:", data)
                       response_data = RestaurantResponse(**data)
                       return (response_data)
                else:

                    # Get the cuisine types using class name
                    cuisine_types = driver.find_elements(By.CLASS_NAME, 'SrqKb')
                    cuisine_list = [cuisine.text for cuisine in cuisine_types]
                    print(f"Cuisine Types: {', '.join(cuisine_list)}")



                    class RomanUrduDictionary:
                        def __init__(self):
                            self.dictionary = {}

                        def add_word(self, roman_urdu, english_translation):
                            self.dictionary[roman_urdu.lower()] = english_translation.lower()

                        def translate(self, roman_urdu):
                            return self.dictionary.get(roman_urdu.lower())

                    def translate_reviews(reviews, dictionary):
                        translated_reviews = []

                        for review in reviews:
                            words = review.split()
                            translated_words = []

                            for word in words:
                                translated_word = dictionary.translate(word)
                                if word.lower() in dictionary.dictionary:
                                    print(f"Found translation for '{word}': '{translated_word}'")
                                    word = translated_word  # Update the word with the translated version
                                translated_words.append(word)

                            translated_review = ' '.join(translated_words)
                            translated_reviews.append(translated_review)

                        return translated_reviews

                    custom_dict = RomanUrduDictionary()
                    custom_dict.add_word("Acha", "Good (Translated)")
                    custom_dict.add_word("Bura", "Bad (Translated)")
                    custom_dict.add_word("Burra", "Bad (Translated)")
                    custom_dict.add_word("Maza", "Enjoy (Translated)")
                    custom_dict.add_word("Mazay", "Enjoy (Translated)")
                    custom_dict.add_word("Ganda", "Dirty (Translated)")
                    custom_dict.add_word("Ganday", "Dirty (Translated)")
                    custom_dict.add_word("Behtareen", "Excellent (Translated)")
                    custom_dict.add_word("Kharab", "Poor (Translated)")
                    custom_dict.add_word("Mazboot", "Strong (Translated)")
                    custom_dict.add_word("Kamzor", "Weak (Translated)")
                    custom_dict.add_word("Baraabar", "Equal (Translated)")
                    custom_dict.add_word("Ala", "Superb (Translated)")
                    custom_dict.add_word("Nakara", "Useless (Translated)")
                    custom_dict.add_word("Kamal", "Amazing (Translated)")
                    custom_dict.add_word("Bakwas", "Nonsense (Translated)")
                    custom_dict.add_word("Mumkin", "Possible (Translated)")
                    custom_dict.add_word("Namumkin", "Impossible (Translated)")
                    custom_dict.add_word("Behtar", "Better (Translated)")
                    custom_dict.add_word("Buraai", "Evil (Translated)")
                    custom_dict.add_word("Umda", "Excellent (Translated)")
                    custom_dict.add_word("Zarb", "Hit (Translated)")
                    custom_dict.add_word("Khatra", "Danger (Translated)")
                    custom_dict.add_word("Saf", "Pure (Translated)")
                    custom_dict.add_word("Ganda", "Dirty (Translated)")
                    custom_dict.add_word("Sundar", "Beautiful (Translated)")
                    custom_dict.add_word("Bekaar", "Worthless (Translated)")
                    custom_dict.add_word("Mushkil", "Difficult (Translated)")
                    custom_dict.add_word("Asaan", "Easy (Translated)")
                    custom_dict.add_word("Husn", "Beauty (Translated)")
                    custom_dict.add_word("Jhoot", "Lie (Translated)")
                    custom_dict.add_word("Sach", "Truth (Translated)")
                    custom_dict.add_word("Mazaaq", "Joke (Translated)")
                    custom_dict.add_word("Hasi", "Laughter (Translated)")
                    custom_dict.add_word("Swadisht", "Delicious (Translated)")
                    custom_dict.add_word("Nihayat Swaadisht", "Extremely Delicious (Translated)")
                    custom_dict.add_word("Khaas", "Special (Translated)")
                    custom_dict.add_word("Shandaar", "Fantastic (Translated)")
                    custom_dict.add_word("Mazedaar", "Tasty (Translated)")
                    custom_dict.add_word("Shandar", "Impressive (Translated)")
                    custom_dict.add_word("Lajawab", "Unmatched (Translated)")
                    custom_dict.add_word("Khoobsurat", "Beautiful (Translated)")
                    custom_dict.add_word("Nawazi", "Hospitality (Translated)")
                    custom_dict.add_word("Sajawat", "Decoration (Translated)")
                    custom_dict.add_word("Safai", "Cleanliness (Translated)")
                    custom_dict.add_word("Taza", "Fresh (Translated)")
                    custom_dict.add_word("Takmeel", "Fulfilling (Translated)")
                    custom_dict.add_word("Hunarmandi", "Skillfulness (Translated)")
                    custom_dict.add_word("Bartari", "Excellence (Translated)")
                    custom_dict.add_word("Ravayati", "Innovative (Translated)")
                    custom_dict.add_word("Dilchasp", "Interesting (Translated)")
                    custom_dict.add_word("Mehak", "Fragrance (Translated)")
                    custom_dict.add_word("Pyaara", "Lovely (Translated)")
                    custom_dict.add_word("Bebas", "Helpless (Translated)")
                    custom_dict.add_word("Khushi", "Joy (Translated)")
                    custom_dict.add_word("Gham", "Sorrow (Translated)")
                    custom_dict.add_word("Hairat", "Amazement (Translated)")
                    custom_dict.add_word("Umeed", "Hope (Translated)")
                    custom_dict.add_word("Taqatwar", "Powerful (Translated)")
                    custom_dict.add_word("Rozmarra", "Everyday (Translated)")
                    custom_dict.add_word("Nayaab", "Rare (Translated)")
                    custom_dict.add_word("Narmi", "Tenderness (Translated)")
                    custom_dict.add_word("Narm Dil", "Kind-hearted (Translated)")
                    custom_dict.add_word("Mehfooz", "Safe (Translated)")
                    custom_dict.add_word("Khuda Hafiz", "Goodbye (Translated)")
                    custom_dict.add_word("Saaf Dil", "Pure-hearted (Translated)")
                    custom_dict.add_word("Guzishta", "Previous (Translated)")
                    custom_dict.add_word("Mustaqil", "Permanent (Translated)")
                    custom_dict.add_word("Farishta", "Angel (Translated)")
                    custom_dict.add_word("Jazbaat", "Emotions (Translated)")
                    custom_dict.add_word("Pasandidgi", "Likability (Translated)")
                    custom_dict.add_word("Tajurba", "Experience (Translated)")
                    custom_dict.add_word("Intezar", "Wait (Translated)")
                    custom_dict.add_word("Khayali", "Imaginary (Translated)")
                    custom_dict.add_word("Bemisaal", "Incomparable (Translated)")
                    custom_dict.add_word("Qabil-e-Tareef", "Praiseworthy (Translated)")
                    custom_dict.add_word("Dilchaspi", "Interest (Translated)")
                    custom_dict.add_word("Bharosa", "Trust (Translated)")
                    custom_dict.add_word("Musarrat", "Smile (Translated)")
                    custom_dict.add_word("Dilse", "Wholeheartedly (Translated)")
                    custom_dict.add_word("Mubarak", "Congratulations (Translated)")
                    custom_dict.add_word("Khushboo", "Fragrance (Translated)")
                    custom_dict.add_word("Chamak", "Radiance (Translated)")
                    custom_dict.add_word("Salam", "Greetings (Translated)")
                    custom_dict.add_word("Khuda", "God (Translated)")
                    custom_dict.add_word("Roz", "Daily (Translated)")
                    custom_dict.add_word("Hafta", "Week (Translated)")
                    custom_dict.add_word("Maah", "Month (Translated)")
                    custom_dict.add_word("Saal", "Year (Translated)")
                    custom_dict.add_word("Din", "Day (Translated)")
                    custom_dict.add_word("Raat", "Night (Translated)")
                    custom_dict.add_word("Subah", "Morning (Translated)")
                    custom_dict.add_word("Shaam", "Evening (Translated)")
                    custom_dict.add_word("Hafte", "Weeks (Translated)")
                    custom_dict.add_word("Maahat", "Months (Translated)")
                    custom_dict.add_word("Saalaat", "Years (Translated)")
                    custom_dict.add_word("Dinaat", "Days (Translated)")
                    custom_dict.add_word("Raataat", "Nights (Translated)")
                    custom_dict.add_word("Subahaat", "Mornings (Translated)")
                    custom_dict.add_word("Shaamaat", "Evenings (Translated)")
                    custom_dict.add_word("Jumma", "Friday (Translated)")
                    custom_dict.add_word("Hafta", "Week (Translated)")
                    custom_dict.add_word("Aaj", "Today (Translated)")
                    custom_dict.add_word("Kal", "Tomorrow (Translated)")
                    custom_dict.add_word("Parson", "Day after Tomorrow (Translated)")
                    custom_dict.add_word("Kal", "Yesterday (Translated)")
                    custom_dict.add_word("Parson", "Day before Yesterday (Translated)")
                    custom_dict.add_word("Hamesha", "Always (Translated)")
                    custom_dict.add_word("Kabhi", "Sometimes (Translated)")
                    custom_dict.add_word("Kabhi Nahi", "Never (Translated)")
                    custom_dict.add_word("Abhi", "Now (Translated)")
                    custom_dict.add_word("Phir", "Then (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kisne", "Who (Translated)")
                    custom_dict.add_word("Kis Liye", "For What Reason (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kitna", "How Much (Translated)")
                    custom_dict.add_word("Kab", "When (Translated)")
                    custom_dict.add_word("Kaun", "Who (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kisne", "Who (Translated)")
                    custom_dict.add_word("Kis Liye", "For What Reason (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kitna", "How Much (Translated)")
                    custom_dict.add_word("Kab", "When (Translated)")
                    custom_dict.add_word("Kaun", "Who (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kisne", "Who (Translated)")
                    custom_dict.add_word("Kis Liye", "For What Reason (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kitna", "How Much (Translated)")
                    custom_dict.add_word("Kab", "When (Translated)")
                    custom_dict.add_word("Kaun", "Who (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kitna", "How Much (Translated)")
                    custom_dict.add_word("Kab", "When (Translated)")
                    custom_dict.add_word("Kaun", "Who (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kisne", "Who (Translated)")
                    custom_dict.add_word("Kis Liye", "For What Reason (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kitna", "How Much (Translated)")
                    custom_dict.add_word("Kab", "When (Translated)")
                    custom_dict.add_word("Kaun", "Who (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kitna", "How Much (Translated)")
                    custom_dict.add_word("Kab", "When (Translated)")
                    custom_dict.add_word("Kaun", "Who (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kisne", "Who (Translated)")
                    custom_dict.add_word("Kis Liye", "For What Reason (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kitna", "How Much (Translated)")
                    custom_dict.add_word("Kab", "When (Translated)")
                    custom_dict.add_word("Kaun", "Who (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kitna", "How Much (Translated)")
                    custom_dict.add_word("Kab", "When (Translated)")
                    custom_dict.add_word("Kaun", "Who (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kisne", "Who (Translated)")
                    custom_dict.add_word("Kis Liye", "For What Reason (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kitna", "How Much (Translated)")
                    custom_dict.add_word("Kab", "When (Translated)")
                    custom_dict.add_word("Kaun", "Who (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kaise", "How (Translated)")
                    custom_dict.add_word("Kitna", "How Much (Translated)")
                    custom_dict.add_word("Kab", "When (Translated)")
                    custom_dict.add_word("Kaun", "Who (Translated)")
                    custom_dict.add_word("Kyun", "Why (Translated)")
                    custom_dict.add_word("Kahaan", "Where (Translated)")
                    custom_dict.add_word("Kisne", "Who (Translated)")
                    custom_dict.add_word("Kis Liye", "For What Reason (Translated)")
                    custom_dict.add_word("خوشی", "Happiness (Translated)")
                    custom_dict.add_word("غم", "Sorrow (Translated)")
                    custom_dict.add_word("پریشانی", "Worry (Translated)")
                    custom_dict.add_word("خوف", "Fear (Translated)")
                    custom_dict.add_word("ارام", "Comfort (Translated)")
                    custom_dict.add_word("پرسشانی", "Anxiety (Translated)")
                    custom_dict.add_word("پرم", "Love (Translated)")
                    custom_dict.add_word("نفرت", "Hate (Translated)")
                    custom_dict.add_word("حسین", "Beautiful (Translated)")
                    custom_dict.add_word("قبولیت", "Acceptance (Translated)")
                    custom_dict.add_word("نااہلی", "Failure (Translated)")
                    custom_dict.add_word("کامیابی", "Success (Translated)")
                    custom_dict.add_word("پرم", "Affection (Translated)")
                    custom_dict.add_word("ندم", "Regret (Translated)")
                    custom_dict.add_word("حسرت", "Longing (Translated)")
                    custom_dict.add_word("امید", "Hope (Translated)")
                    custom_dict.add_word("حیات", "Life (Translated)")
                    custom_dict.add_word("دکھ", "Pain (Translated)")
                    custom_dict.add_word("پریشانی", "Distress (Translated)")
                    custom_dict.add_word("راحت", "Relief (Translated)")
                    custom_dict.add_word("سکون", "Peace (Translated)")
                    custom_dict.add_word("شرم", "Shame (Translated)")
                    custom_dict.add_word("فخر", "Pride (Translated)")
                    custom_dict.add_word("عجب", "Wonder (Translated)")
                    custom_dict.add_word("حسن", "Beauty (Translated)")
                    custom_dict.add_word("حب", "Passion (Translated)")
                    custom_dict.add_word("دوستی", "Friendship (Translated)")
                    custom_dict.add_word("دشمنی", "Enmity (Translated)")
                    custom_dict.add_word("گراں", "Respect (Translated)")
                    custom_dict.add_word("تشویش", "Concern (Translated)")
                    custom_dict.add_word("تاثر", "Impression (Translated)")
                    custom_dict.add_word("عجب", "Amazement (Translated)")
                    custom_dict.add_word("جذبات", "Emotions (Translated)")
                    custom_dict.add_word("پرم", "Devotion (Translated)")
                    custom_dict.add_word("آشنا", "Familiar (Translated)")
                    custom_dict.add_word("ناخوشی", "Displeasure (Translated)")
                    custom_dict.add_word("عجیب", "Strange (Translated)")
                    custom_dict.add_word("چاہت", "Desire (Translated)")
                    custom_dict.add_word("نرمی", "Tenderness (Translated)")
                    custom_dict.add_word("آپسی", "Intimacy (Translated)")
                    custom_dict.add_word("ترس", "Terror (Translated)")
                    custom_dict.add_word("حرص", "Eagerness (Translated)")
                    custom_dict.add_word("خنجر", "Jealousy (Translated)")
                    custom_dict.add_word("توقع", "Expectation (Translated)")
                    custom_dict.add_word("ہیرانی", "Surprise (Translated)")
                    custom_dict.add_word("عشق", "Passion (Translated)")
                    custom_dict.add_word("سلامتی", "Well-being (Translated)")
                    custom_dict.add_word("شکریہ", "Gratitude (Translated)")
                    custom_dict.add_word("دعا", "Prayer (Translated)")
                    custom_dict.add_word("خواب", "Dream (Translated)")
                    custom_dict.add_word("تعجب", "Curiosity (Translated)")
                    custom_dict.add_word("بھت", "Ghost (Translated)")
                    custom_dict.add_word("گھمنڈ", "Arrogance (Translated)")
                    custom_dict.add_word("نگاہ", "Glance (Translated)")
                    custom_dict.add_word("مزید", "Craze (Translated)")
                    custom_dict.add_word("رضا", "Contentment (Translated)")
                    custom_dict.add_word("مصلحت", "Benefit (Translated)")
                    custom_dict.add_word("تسلیم", "Submission (Translated)")
                    custom_dict.add_word("تعجب", "Astonishment (Translated)")
                    custom_dict.add_word("گمان", "Presumption (Translated)")
                    custom_dict.add_word("ہراس", "Annoyance (Translated)")
                    custom_dict.add_word("غیرت", "Honor (Translated)")
                    custom_dict.add_word("شعور", "Consciousness (Translated)")
                    custom_dict.add_word("غیرت", "Chivalry (Translated)")
                    custom_dict.add_word("بہتان", "Slander (Translated)")
                    custom_dict.add_word("فکر", "Concern (Translated)")
                    custom_dict.add_word("خود", "Self (Translated)")
                    custom_dict.add_word("آگاہی", "Awareness (Translated)")
                    custom_dict.add_word("محبت", "Adoration (Translated)")
                    custom_dict.add_word("حسین", "Graceful (Translated)")
                    custom_dict.add_word("محبت", "Amorousness (Translated)")
                    custom_dict.add_word("تحفظ", "Reservation (Translated)")
                    custom_dict.add_word("حیثیت", "Status (Translated)")
                    custom_dict.add_word("ہرس", "Craze (Translated)")
                    custom_dict.add_word("شوق", "Passion (Translated)")
                    custom_dict.add_word("رغبت", "Inclination (Translated)")
                    custom_dict.add_word("نرمی", "Softness (Translated)")
                    custom_dict.add_word("احسان", "Gratitude (Translated)")
                    custom_dict.add_word("ترس", "Fright (Translated)")
                    custom_dict.add_word("ہیرت", "Wonder (Translated)")
                    custom_dict.add_word("خوف", "Dread (Translated)")
                    custom_dict.add_word("آہنگ", "Melody (Translated)")
                    custom_dict.add_word("رنگ", "Tint (Translated)")
                    custom_dict.add_word("سرور", "Joy (Translated)")
                    custom_dict.add_word("خواب", "Vision (Translated)")
                    custom_dict.add_word("خواب", "Fantasy (Translated)")
                    custom_dict.add_word("خوشبو", "Fragrance (Translated)")
                    custom_dict.add_word("نغمہ", "Tune (Translated)")
                    custom_dict.add_word("لذت", "Pleasure (Translated)")
                    custom_dict.add_word("اعتماد", "Trust (Translated)")
                    custom_dict.add_word("نجات", "Salvation (Translated)")
                    custom_dict.add_word("تسکین", "Consolation (Translated)")
                    custom_dict.add_word("حقیقت", "Reality (Translated)")
                    custom_dict.add_word("چاہت", "Craving (Translated)")
                    custom_dict.add_word("ترکیب", "Composition (Translated)")
                    custom_dict.add_word("پرم", "Amity (Translated)")
                    custom_dict.add_word("موہبت", "Yearning (Translated)")
                    custom_dict.add_word("عظمت", "Grandeur (Translated)")
                    custom_dict.add_word("ہمت", "Determination (Translated)")
                    custom_dict.add_word("تشویش", "Tension (Translated)")
                    custom_dict.add_word("پسندیدہ", "Favorite (Translated)")
                    custom_dict.add_word("تجاویز", "Suggestion (Translated)")
                    custom_dict.add_word("ہوشیاری", "Vigilance (Translated)")
                    custom_dict.add_word("آواز", "Voice (Translated)")
                    custom_dict.add_word("خلقی", "Nature (Translated)")
                    custom_dict.add_word("فریب", "Deception (Translated)")
                    custom_dict.add_word("پہچان", "Recognition (Translated)")
                    custom_dict.add_word("مذاق", "Mockery (Translated)")
                    custom_dict.add_word("کھلا دل", "Open-heartedness (Translated)")
                    custom_dict.add_word("جدوجہد", "Struggle (Translated)")
                    custom_dict.add_word("تضاد", "Contradiction (Translated)")
                    custom_dict.add_word("مسکان", "Smile (Translated)")
                    custom_dict.add_word("اندھیرا", "Darkness (Translated)")
                    custom_dict.add_word("روشنی", "Brightness (Translated)")
                    custom_dict.add_word("پیشگوئی", "Prediction (Translated)")
                    custom_dict.add_word("آگاہ", "Informed (Translated)")
                    custom_dict.add_word("پھول", "Flower (Translated)")
                    custom_dict.add_word("نکھار", "Freshness (Translated)")
                    custom_dict.add_word("محبت", "Amour (Translated)")
                    custom_dict.add_word("پرواہ", "Care (Translated)")
                    custom_dict.add_word("حلم", "Forbearance (Translated)")
                    custom_dict.add_word("جیو", "Live (Translated)")
                    custom_dict.add_word("خوابگیر", "Dreamy (Translated)")
                    custom_dict.add_word("ہنسی", "Laughter (Translated)")
                    custom_dict.add_word("خوف", "Apprehension (Translated)")
                    custom_dict.add_word("غیرت", "Vigilance (Translated)")
                    custom_dict.add_word("اعجاز", "Miracle (Translated)")
                    custom_dict.add_word("بہترین", "Best (Translated)")
                    custom_dict.add_word("فیاض", "Generosity (Translated)")
                    custom_dict.add_word("تواضع", "Humility (Translated)")
                    custom_dict.add_word("محبت", "Amore (Translated)")
                    custom_dict.add_word("اہمیت", "Importance (Translated)")
                    custom_dict.add_word("خوش", "Happy (Translated)")
                    custom_dict.add_word("بے خودی", "Ecstasy (Translated)")
                    custom_dict.add_word("خواب", "Ideal (Translated)")
                    custom_dict.add_word("علیحدگی", "Isolation (Translated)")
                    custom_dict.add_word("تفریح", "Recreation (Translated)")
                    custom_dict.add_word("ہریالی", "Verdancy (Translated)")
                    custom_dict.add_word("تشہیر", "Promotion (Translated)")
                    custom_dict.add_word("خوشی", "Bliss (Translated)")
                    custom_dict.add_word("خواب", "Hallucination (Translated)")
                    custom_dict.add_word("تمجید", "Admiration (Translated)")
                    custom_dict.add_word("خوشبو", "Aroma (Translated)")
                    custom_dict.add_word("پیار", "Fondness (Translated)")
                    custom_dict.add_word("حسن", "Charm (Translated)")
                    custom_dict.add_word("پرفیکٹ", "Perfect (Translated)")
                    custom_dict.add_word("اچھا", "Good (Translated)")
                    custom_dict.add_word("برا", "Bad (Translated)")
                    custom_dict.add_word("شہرت", "Fame (Translated)")
                    custom_dict.add_word("ہنر", "Skill (Translated)")
                    custom_dict.add_word("خطرہ", "Danger (Translated)")
                    custom_dict.add_word("اچھا", "Fine (Translated)")
                    custom_dict.add_word("مزید", "More (Translated)")
                    custom_dict.add_word("اہم", "Important (Translated)")
                    custom_dict.add_word("کمزور", "Weak (Translated)")
                    custom_dict.add_word("مضبوط", "Strong (Translated)")
                    custom_dict.add_word("محبت", "Affection (Translated)")
                    custom_dict.add_word("نفرت", "Dislike (Translated)")
                    custom_dict.add_word("بہترین", "Best (Translated)")
                    custom_dict.add_word("ناپسندیدہ", "Disliked (Translated)")
                    custom_dict.add_word("پیار", "Adoration (Translated)")
                    custom_dict.add_word("تکریم", "Respect (Translated)")
                    custom_dict.add_word("ہمدرد", "Sympathetic (Translated)")
                    custom_dict.add_word("برداشت", "Tolerance (Translated)")
                    custom_dict.add_word("نگہداشت", "Care (Translated)")
                    custom_dict.add_word("دعا", "Supplication (Translated)")
                    custom_dict.add_word("خیرات", "Benevolence (Translated)")
                    custom_dict.add_word("خرم", "Delightful (Translated)")
                    custom_dict.add_word("بددعا", "Curse (Translated)")
                    custom_dict.add_word("مثبت", "Positive (Translated)")
                    custom_dict.add_word("منفی", "Negative (Translated)")
                    custom_dict.add_word("مصلحت", "Benefit (Translated)")
                    custom_dict.add_word("زندگی", "Life (Translated)")
                    custom_dict.add_word("موت", "Death (Translated)")
                    custom_dict.add_word("جوانی", "Youth (Translated)")
                    custom_dict.add_word("بوڑھاپا", "Old age (Translated)")
                    custom_dict.add_word("رزق", "Provision (Translated)")
                    custom_dict.add_word("کمی", "Lack (Translated)")
                    custom_dict.add_word("حصول", "Acquisition (Translated)")
                    custom_dict.add_word("قربانی", "Sacrifice (Translated)")
                    custom_dict.add_word("شادی", "Marriage (Translated)")
                    custom_dict.add_word("طلاق", "Divorce (Translated)")
                    custom_dict.add_word("پیدائش", "Birth (Translated)")
                    custom_dict.add_word("موت", "Death (Translated)")
                    custom_dict.add_word("آمد", "Income (Translated)")
                    custom_dict.add_word("مصروفیت", "Occupation (Translated)")
                    custom_dict.add_word("خسارہ", "Loss (Translated)")


                    
                    reviews = driver.find_elements(By.CSS_SELECTOR, ".review-container .partial_entry")[:num_reviews]

                    for review in reviews:
                         review_text = review.text  # Assuming review may not be a string initially
                         label=fakeReviewDetection(review_text)
                         if label=="fake":
                             print("This review is fake: ",review_text)
                             reviews.remove(review)
                               
                    instaReviews=getKeywordCaptions(keyword)
                    
                    
                    
                    translated_reviews = translate_reviews([review.text for review in reviews], custom_dict)

                    translated_reviews=translated_reviews+list(instaReviews)


                    restaurant_data = {
                        '_id':restaurant_data["_id"],
                        'name': restaurant_name,
                        'foodType': cuisine_list,
                        'systemComments': translated_reviews,
                        'logoPath':restaurant_image
                        
                    }
                    collection.insert_one(restaurant_data)
                    

                    print("Data added to MongoDB.")

                    comments = collection.find_one({"name": restaurant_name})
                    print(comments)

                    if comments:
                         system_comments = comments.get("systemComments", [])
        
                    if system_comments:
                             # Calculate the rating based on sentiment analysis
                            rating,analyzed_reviews = restaurant_review_rating(system_comments)
                            print(rating)

                    #rating=restaurant_review_rating(comments.systemComments)

                    collection.update_one({"name":restaurant_name},{ "$set": {"systemRating":rating,"systemComments":analyzed_reviews}})

                    restaurant_data = {

                        '_id':restaurant_data["_id"],
                        'name': restaurant_name,
                        'foodType': cuisine_list,
                        'systemComments': analyzed_reviews,
                        'systemRating':rating,
                        'logoPath':restaurant_image
                        
                    }
                    # Store data in MongoDB
                    response_data = RestaurantResponse(**restaurant_data)
                    return (response_data) 

            else:
                print("URL not found in the onclick attribute.")

        else:
            print("No onclick attribute found.")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        driver.quit()
        client.close()  # Close MongoDB connection
    
    