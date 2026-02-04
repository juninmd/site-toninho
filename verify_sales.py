from playwright.sync_api import sync_playwright
import sys
import time
import subprocess
import os

def verify():
    # Start server
    server = subprocess.Popen([sys.executable, "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2) # Wait for server to start

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()
            page.goto("http://localhost:8000/index.html")

            # 1. Verify Exit Modal Existence
            modal = page.locator("#exitModal")
            if modal.count() > 0:
                print("✅ Exit Modal Found in DOM")
            else:
                print("❌ Exit Modal NOT Found in DOM")

            # 2. Verify Nav CTA Style
            nav_cta = page.locator(".nav-cta")
            if nav_cta.count() > 0:
                # Get computed background color
                bg_color = nav_cta.evaluate("element => getComputedStyle(element).backgroundColor")
                print(f"Nav CTA Background Color: {bg_color}")

                # Check if it is Gold (approximate rgb(212, 175, 55))
                # Note: browsers might return rgba
                if "212" in bg_color and "175" in bg_color:
                    print("✅ Nav CTA has Gold Background")
                else:
                    print("❌ Nav CTA does NOT have Gold Background")
            else:
                print("❌ Nav CTA element NOT Found")

            browser.close()
    except Exception as e:
        print(f"Error during verification: {e}")
    finally:
        server.terminate()

if __name__ == "__main__":
    verify()
