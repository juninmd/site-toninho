from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. Desktop Verification
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        page.goto("file:///app/index.html")

        # Screenshot Hero
        page.screenshot(path="verification_hero_desktop.png", clip={'x': 0, 'y': 0, 'width': 1280, 'height': 800})

        # Screenshot Contact
        contact_section = page.locator("#contact")
        contact_section.scroll_into_view_if_needed()
        page.screenshot(path="verification_contact_desktop.png")

        # 2. Mobile Verification
        page_mobile = browser.new_page(viewport={'width': 375, 'height': 667})
        page_mobile.goto("file:///app/index.html")

        # Screenshot Hero Mobile
        page_mobile.screenshot(path="verification_hero_mobile.png", clip={'x': 0, 'y': 0, 'width': 375, 'height': 667})

        # Screenshot Contact Mobile
        contact_section_mobile = page_mobile.locator("#contact")
        contact_section_mobile.scroll_into_view_if_needed()
        page_mobile.screenshot(path="verification_contact_mobile.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
