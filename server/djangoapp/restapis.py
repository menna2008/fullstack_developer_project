import requests
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")

def get_request(endpoint, **kwargs):
    params = ''
    request_url = backend_url + endpoint
    if kwargs:
        for key, value in kwargs.items():
            params += key + '=' + value + '&'
        request_url += '?' + params[ : -1]
    print(request_url)
    try: 
        response = requests.get(request_url)
        return response.json()
    except:
        print('Network exception occurred')

def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url + 'analyze/' + text
    try:
        res = requests.get(request_url)
        return res.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")

def post_review(data_dict):
    request_url = backend_url + '/insert_review'
    try:
        res = request.post(request_url, json=data_dict)
        return res.json()
    except:
        print('Network exception occurred')
