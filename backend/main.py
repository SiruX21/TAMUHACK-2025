from flask import Flask, request, jsonify
import google.generativeai as genai
import os, settings
from flask_cors import CORS  # Import the CORS library
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) 
version='gemini-1.5-pro'
genai.configure(api_key=settings.config['google_key'])
model = genai.GenerativeModel(version)
# Function to add additional text to the base prompt
def generate_prompt(chat_talk):
    # Read the chat history
    try:
        with open("chat_history.txt", "r") as file:
            chat_history = file.read()
        with open("vehicles.csv", "r") as file:
            vehicles = file.read()
    except FileNotFoundError:
        chat_history = ""
        vehicles = ""
    combined_prompt = f"Below is information about vehicles that we have and their prices and specifications in a CSV format. Fuel Type is the type of fuel it is, fuel cost is the average cost of fuel per year, highway is the highway MPG, combined08u is the city MPG, everything else is self explanatory with rangeA being the PHEV's range in electric only mode.\n{vehicles}\n This is your previous communication with the user:\n{chat_history}\n You are Ms. Yota, a chatbot specializing in recommending cars from Toyota. Only recommend cars included in this message, and provide as much information as possible to the user about the car. Try to be as concise as possible and only speak in around 5 sentences. Below is the user's communication with you: \n{chat_talk}\n " 

    return combined_prompt
# Suggestion Function for Bumble-like display
def generate_suggestion(suggestion):
    try:
        with open("vehicles.csv", "r") as file:
            vehicles = file.read()
    except FileNotFoundError:
        vehicles = ""
    combined = f"Below is information about vehicles that we have and their prices and specifications in a CSV format. Fuel Type is the type of fuel it is, fuel cost is the average cost of fuel per year, highway is the highway MPG, combined08u is the city MPG, everything else is self explanatory with rangeA being the PHEV's range in electric only mode.\n{vehicles}\n The user is looking for below for their car \n{suggestion}\n Suggest 5 cars immediately but only reply with the model name of the five cars from the CSV and nothing else, no trim, so for example if it's a Camry Hybrid, only respond with Camry, but keep an exception if it's the Prius Prime or RAV4 Prime, respond with the full model name for those."
    return combined
@app.route('/chat-suggestion', methods=['POST'])
def generate():
    input_text = request.args.get('input_text')
    combined_prompt = generate_prompt(input_text)
    response = model.generate_content(combined_prompt)
    with open("chat_history.txt", "a") as file:
        file.write(f"User: {input_text}\n")
        file.write(f"AI: {response.text}\n\n")
        file.flush()
        os.fsync(file.fileno())
    return response.text
# generate suggestion for bumble-like display
@app.route('/generate-suggestion', methods=['POST'])
def generatesuggestion():
    input_text = request.args.get('input_text')
    combined_prompt = generate_suggestion(input_text)
    response = model.generate_content(combined_prompt)
    return response.text
# reset chat function
@app.route('/clear-chat', methods=['GET'])
def status():
    with open("chat_history.txt", "w") as file:
        file.write("")
    return jsonify({"status": "Chat history cleared"})
if __name__ == '__main__':
    with open("chat_history.txt", "w") as file:
        file.write("")
    app.run(host='0.0.0.0', port=5000, debug=True)