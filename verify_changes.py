from playwright.sync_api import sync_playwright

def verify(page):
    page.goto("http://localhost:8000/index.html")

    # 1. Verify Schema
    content = page.content()
    if 'Pacote Essencial - Toninho Fotos' in content:
        print("✅ Schema Product Found")
    else:
        print("❌ Schema Product NOT Found")

    # 2. Scroll to Contact
    page.locator("#contact").scroll_into_view_if_needed()

    # 3. Fill Form to test styles
    page.fill('input[name="name"]', "Teste Playwright")

    # 4. Check Button Text
    btn = page.locator('button[type="submit"]')
    print(f"Button Text: {btn.inner_text()}")

    # 5. Screenshot
    page.screenshot(path="verification_form.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
