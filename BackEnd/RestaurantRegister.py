import nltk
from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from googletrans import Translator
import re
import pymongo

from googletrans import Translator


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

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize
from mongotest import getKeywordCaptions


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

def restaurant_review_rating(reviews):
    total_score = 0.0

    for review in reviews:
        
        sentiment_scores = sia.polarity_scores(review)

        
        adjust_for_negation(sentiment_scores, review)

        
        total_score += sentiment_scores['compound']

    
    average_score = total_score / len(reviews)

    
    min_score = -1.0
    max_score = 1.0
    scaled_rating = 1 + 4 * (average_score - min_score) / (max_score - min_score)

    
    final_rating = max(1, min(5, scaled_rating))

    return final_rating
class RestaurantResponse(BaseModel):
    name: str
    foodType: list
    systemComments: list
    systemRating:float


@app.get("/rating/{keyword}")


def get_reviews_and_info(keyword:str, num_reviews=10):
    chromedriver_path = 'C:/Users/hp/Desktop/python/chromedriver-win64/chromedriver.exe'
    
    mongo_uri = "mongodb+srv://chaudhryhamid655:hamid5678@cluster0.orho31g.mongodb.net/FoodMeter?retryWrites=true&w=majority"
    
    
    client = pymongo.MongoClient(mongo_uri)

    
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

        
        search_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "q"))
        )
        search_input.send_keys(keyword)
        search_input.send_keys(Keys.RETURN)

        
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

                
                driver.get(full_url)

                
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "review-container"))
                )

                
                restaurant_name = driver.find_element(By.CSS_SELECTOR, 'h1[data-test-target="top-info-header"]').text
                print(f"Restaurant Name: {restaurant_name}")

                
                restaurant_data = collection.find_one({'name': restaurant_name})

                if restaurant_data:
                       restaurant_data = {
                        'name': restaurant_name,
                        'foodType': cuisine_list,
                        'systemComments': [review.text for review in reviews],
                        'systemRating':rating,
                       }     
                    
                       print(f"Restaurant '{restaurant_name}' already exists in the database. Skipping.")
    
                       print("Restaurant Data:", restaurant_data)
                       response_data = RestaurantResponse(**restaurant_data)
                       return ("")
                else:

                    
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
                                    word = translated_word  
                                translated_words.append(word)

                            translated_review = ' '.join(translated_words)
                            translated_reviews.append(translated_review)

                        return translated_reviews

                    custom_dict = RomanUrduDictionary()
                    custom_dict.add_word("Acha", "Good")
                    custom_dict.add_word("Bura", "Bad")
                    custom_dict.add_word("Burra", "Bad")
                    custom_dict.add_word("Maza", "Enjoy")
                    custom_dict.add_word("Mazay", "Enjoy")
                    custom_dict.add_word("Ganda", "Dirty")
                    custom_dict.add_word("Ganday", "Dirty")
                    custom_dict.add_word("Behtareen", "Excellent")
                    custom_dict.add_word("Kharab", "Poor")
                    custom_dict.add_word("Mazboot", "Strong")
                    custom_dict.add_word("Kamzor", "Weak")
                    custom_dict.add_word("Baraabar", "Equal")
                    custom_dict.add_word("Ala", "Superb")
                    custom_dict.add_word("Nakara", "Useless")
                    custom_dict.add_word("Kamal", "Amazing")
                    custom_dict.add_word("Bakwas", "Nonsense")
                    custom_dict.add_word("Mumkin", "Possible")
                    custom_dict.add_word("Namumkin", "Impossible")
                    custom_dict.add_word("Behtar", "Better")
                    custom_dict.add_word("Buraai", "Evil")
                    custom_dict.add_word("Umda", "Excellent")
                    custom_dict.add_word("Zarb", "Hit")
                    custom_dict.add_word("Khatra", "Danger")
                    custom_dict.add_word("Saf", "Pure")
                    custom_dict.add_word("Ganda", "Dirty")
                    custom_dict.add_word("Sundar", "Beautiful")
                    custom_dict.add_word("Bekaar", "Worthless")
                    custom_dict.add_word("Mushkil", "Difficult")
                    custom_dict.add_word("Asaan", "Easy")
                    custom_dict.add_word("Husn", "Beauty")
                    custom_dict.add_word("Jhoot", "Lie")
                    custom_dict.add_word("Sach", "Truth")
                    custom_dict.add_word("Mazaaq", "Joke")
                    custom_dict.add_word("Hasi", "Laughter")
                    
                    custom_dict.add_word("Swadisht", "Delicious")
                    custom_dict.add_word("Nihayat Swaadisht", "Extremely Delicious")
                    custom_dict.add_word("Khaas", "Special")
                    custom_dict.add_word("Shandaar", "Fantastic")
                    custom_dict.add_word("Mazedaar", "Tasty")
                    custom_dict.add_word("Shandar", "Impressive")
                    custom_dict.add_word("Lajawab", "Unmatched")
                    custom_dict.add_word("Khoobsurat", "Beautiful")
                    custom_dict.add_word("Nawazi", "Hospitality")
                    custom_dict.add_word("Sajawat", "Decoration")
                    custom_dict.add_word("Safai", "Cleanliness")
                    custom_dict.add_word("Taza", "Fresh")
                    custom_dict.add_word("Takmeel", "Fulfilling")
                    custom_dict.add_word("Hunarmandi", "Skillfulness")
                    custom_dict.add_word("Bartari", "Excellence")
                    custom_dict.add_word("Ravayati", "Innovative")
                    custom_dict.add_word("Dilchasp", "Interesting")
                    custom_dict.add_word("Mehak", "Fragrance")
                    custom_dict.add_word("Pyaara", "Lovely")
                    custom_dict.add_word("Bebas", "Helpless")
                    custom_dict.add_word("Khushi", "Joy")
                    custom_dict.add_word("Gham", "Sorrow")
                    custom_dict.add_word("Hairat", "Amazement")
                    custom_dict.add_word("Umeed", "Hope")
                    custom_dict.add_word("Taqatwar", "Powerful")
                    custom_dict.add_word("Rozmarra", "Everyday")
                    custom_dict.add_word("Nayaab", "Rare")
                    custom_dict.add_word("Narmi", "Tenderness")
                    custom_dict.add_word("Narm Dil", "Kind-hearted")
                    custom_dict.add_word("Mehfooz", "Safe")
                    custom_dict.add_word("Khuda Hafiz", "Goodbye")
                    custom_dict.add_word("Saaf Dil", "Pure-hearted")
                    custom_dict.add_word("Guzishta", "Previous")
                    custom_dict.add_word("Mustaqil", "Permanent")
                    custom_dict.add_word("Farishta", "Angel")
                    custom_dict.add_word("Jazbaat", "Emotions")
                    custom_dict.add_word("Pasandidgi", "Likability")
                    custom_dict.add_word("Tajurba", "Experience")
                    custom_dict.add_word("Intezar", "Wait")
                    custom_dict.add_word("Khayali", "Imaginary")
                    custom_dict.add_word("Bemisaal", "Incomparable")
                    custom_dict.add_word("Qabil-e-Tareef", "Praiseworthy")
                    custom_dict.add_word("Dilchaspi", "Interest")
                    custom_dict.add_word("Bharosa", "Trust")
                    custom_dict.add_word("Musarrat", "Smile")
                    custom_dict.add_word("Dilse", "Wholeheartedly")
                    custom_dict.add_word("Mubarak", "Congratulations")
                    custom_dict.add_word("Khushboo", "Fragrance")
                    custom_dict.add_word("Chamak", "Radiance")

                    
                    reviews = driver.find_elements(By.CSS_SELECTOR, ".review-container .partial_entry")[:num_reviews]
                    
                    
                    translated_reviews = translate_reviews([review.text for review in reviews], custom_dict)


                    restaurant_data = {
                        'name': restaurant_name,
                        'foodType': cuisine_list,
                        'systemComments': translated_reviews,
                        
                    }
                    collection.insert_one(restaurant_data)
                    

                    print("Data added to MongoDB.")

                    comments = collection.find_one({"name": restaurant_name})
                    print(comments)

                    if comments:
                         system_comments = comments.get("systemComments", [])
        
                    if system_comments:
                             
                            rating = restaurant_review_rating(system_comments)
                            print(rating)

                    

                    collection.update_one({"name":restaurant_name},{ "$set": {"systemRating":rating}})

                    restaurant_data = {
                        'name': restaurant_name,
                        'foodType': cuisine_list,
                        'systemComments': translated_reviews,
                        'systemRating':rating,
                        
                    }
                    
                    

            else:
                print("URL not found in the onclick attribute.")

        else:
            print("No onclick attribute found.")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        driver.quit()
        client.close()  

    response_data = RestaurantResponse(**restaurant_data)
    return (response_data)