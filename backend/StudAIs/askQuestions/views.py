import requests
import json
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def ask_question(request):
    """
    Endpoint to interact with OpenRouter.ai.
    Takes a question from the frontend and sends it to OpenRouter API.
    """
    question = request.data.get('question')

    if not question:
        return Response({"error": "Question is required."}, status=400)

    # Define the OpenRouter API URL and headers
    api_url = 'https://openrouter.ai/api/v1/chat/completions'
    headers = {
        'Authorization': f'Bearer {settings.OPENROUTER_API_KEY}',
        'Content-Type': 'application/json',
        'HTTP-Referer': '<YOUR_SITE_URL>',  # Optional. Replace with your actual URL.
        'X-Title': '<YOUR_SITE_NAME>',  # Optional. Replace with your site name.
    }

    # Define the payload to send to OpenRouter
    payload = {
        "model": "qwen/qwen-2.5-7b-instruct:free",  # Optional, adjust as necessary.
        "messages": [
            {
                "role": "user",
                "content": question
            }
        ]
    }

    try:
        # Send the request to OpenRouter
        response = requests.post(api_url, headers=headers, data=json.dumps(payload))

        # Log the response content
        print(response.text)  # Add this line to log the response

        # Check if the response is successful
        if response.status_code == 200:
            return Response(response.json())  # Return the response from OpenRouter as JSON
        else:
            return Response({"error": f"Failed to get response from OpenRouter. Status code: {response.status_code}, Message: {response.text}"}, status=500)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
