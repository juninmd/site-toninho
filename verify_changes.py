from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000")

        # 1. Hero Section (Check Title)
        page.screenshot(path="verification_hero.png")
        print("Hero screenshot taken.")

        # 2. Portfolio Filters
        portfolio_section = page.locator("#portfolio")
        portfolio_section.scroll_into_view_if_needed()
        page.wait_for_timeout(1000) # wait for scroll
        page.screenshot(path="verification_portfolio_initial.png")
        print("Portfolio Initial screenshot taken.")

        # Click "Casamentos"
        page.click("button[data-filter='casamento']")
        page.wait_for_timeout(500)
        page.screenshot(path="verification_portfolio_filtered.png")
        print("Portfolio Filtered screenshot taken.")

        # 3. Lightbox Interaction
        # Click the first visible card
        card = page.locator(".portfolio-card[data-category='casamento']").first
        card.click()
        page.wait_for_timeout(1000) # wait for fade in
        page.screenshot(path="verification_lightbox.png")
        print("Lightbox screenshot taken.")

        # Close lightbox
        page.click(".close-lightbox")
        page.wait_for_timeout(500)

        # 4. Pricing (Check Pulse)
        pricing_section = page.locator("#servicos")
        pricing_section.scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        page.screenshot(path="verification_pricing.png")
        print("Pricing screenshot taken.")

        # 5. Testimonials (Check Avatars)
        testimonials_section = page.locator("#depoimentos")
        testimonials_section.scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        page.screenshot(path="verification_testimonials.png")
        print("Testimonials screenshot taken.")

        browser.close()

if __name__ == "__main__":
    run()
