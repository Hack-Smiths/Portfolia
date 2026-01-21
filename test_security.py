import requests
import time

BASE_URL = "http://localhost:8000"  # Update with your backend URL

def test_rate_limit():
    print("Testing Rate Limiting on /login...")
    # Limit is 5 per 15 minutes. Let's send 7.
    for i in range(7):
        response = requests.post(f"{BASE_URL}/login", json={
            "email": "test@example.com",
            "password": "wrongpassword"
        })
        print(f"Request {i+1}: Status {response.status_code}")
        if response.status_code == 429:
            print("✅ SUCCESS: Rate limiting active (429 Too Many Requests)")
            return
    print("❌ FAILED: Rate limit was not exceeded")

def test_xss_sanitization():
    print("\nTesting XSS Sanitization on Profile Update...")
    # You need a valid token to test this, or test against the schema directly in a script.
    # Here we simulate what happens when the API receives malicious HTML.
    
    malicious_data = {
        "name": "User <script>alert('xss')</script>",
        "bio": "Check out my <b>bold</b> and <img src=x onerror=alert(1)> image!"
    }
    
    # We will print what the backend WOULD store based on the schema validation
    # (Manual test: Use the browser to try and save this in your profile)
    print(f"Input Name: {malicious_data['name']}")
    print(f"Expected Sanitized: User alert('xss')")
    print("\nTry saving '<script>alert(1)</script>' in your Bio on the Profile page.")
    print("Then refresh. If the tags are gone, sanitization is working!")

if __name__ == "__main__":
    test_rate_limit()
    test_xss_sanitization()
