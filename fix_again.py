import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace window. with globalThis.
content = content.replace("window.dataLayer", "globalThis.dataLayer")
content = content.replace("window.fbq", "globalThis.fbq")
content = content.replace("window._fbq", "globalThis._fbq")

with open('index.html', 'w') as f:
    f.write(content)
