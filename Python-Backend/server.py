from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] ='mongodb+srv://chaudhryhamid655:hamid5678@cluster0.orho31g.mongodb.net/Food-Meter?retryWrites=true&w=majority'

mongo= PyMongo(app)
@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True, port=8000)