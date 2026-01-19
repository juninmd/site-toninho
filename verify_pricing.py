
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # Desktop
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto(f"file://{os.getcwd()}/index.html")
        page.wait_for_selector("#pacotes")
        page.locator("#pacotes").screenshot(path="verification_pricing_desktop.png")
        print("Desktop pricing screenshot captured.")

        # Mobile
        page_mobile = browser.new_page(viewport={"width": 375, "height": 667})
        page_mobile.goto(f"file://{os.getcwd()}/index.html")
        page_mobile.wait_for_selector("#pacotes")
        page_mobile.locator("#pacotes").screenshot(path="verification_pricing_mobile.png")
        print("Mobile pricing screenshot captured.")

        browser.close()

if __name__ == "__main__":
    run()
