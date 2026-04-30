from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import json
import time

def parse_with_selenium_v2():
    chrome_options = Options()
    # chrome_options.add_argument("--headless") # Временно отключи эту строку, чтобы УВИДЕТЬ, что делает браузер
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # Убираем флаг "navigator.webdriver", по которому сайты палят ботов
    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
        Object.defineProperty(navigator, 'webdriver', {
          get: () => undefined
        })
        """
    })

    url = "https://www.zillow.com/profile/MarkTrompeter#listings-and-sales"

    try:
        print("Запускаем браузер...")
        driver.get(url)
        
        # Ждем чуть дольше и даем странице прогрузиться
        print("Ждем загрузки контента...")
        time.sleep(10) 

        # Прокрутим страницу вниз, чтобы ленивая загрузка (lazy load) сработала
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
        time.sleep(2)

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        listings = []

        # Попробуем найти все ссылки, которые ведут на страницы домов homedetails
        all_links = soup.find_all('a', href=True)
        property_links = [l for l in all_links if '/homedetails/' in l['href']]
        
        # Удаляем дубликаты ссылок
        unique_links = list(set([l['href'] for l in property_links]))

        print(f"Найдено потенциальных ссылок на дома: {len(unique_links)}")

        # Пытаемся собрать данные из родительских контейнеров этих ссылок
        # Zillow часто использует li или div с определенными атрибутами
        cards = soup.find_all(['li', 'div', 'article'], {'data-test': 'property-card'}) or \
                soup.select('.ListItem-c11n-8-102-0__sc-13btm93-0') or \
                soup.find_all('article')

        for card in cards:
            text = card.get_text(separator="|")
            if '$' in text: # Если в карточке есть цена
                parts = text.split('|')
                price = [p for p in parts if '$' in p][0]
                # Берем первую ссылку внутри карточки
                link_el = card.find('a', href=True)
                
                listings.append({
                    "price": price.strip(),
                    "address": "Zillow Property", # Можно усложнить поиск адреса
                    "url": "https://www.zillow.com" + link_el['href'] if link_el['href'].startswith('/') else link_el['href'],
                    "image": "https://placehold.co/600x400?text=Property"
                })

        # Если через карточки не вышло, попробуем просто по найденным ссылкам
        if not listings and unique_links:
            for link in unique_links[:5]: # Для теста возьмем первые 5
                listings.append({
                    "price": "Check on Zillow",
                    "address": "Listing by Mark Trompeter",
                    "url": "https://www.zillow.com" + link if link.startswith('/') else link,
                    "image": "https://placehold.co/600x400?text=View+on+Zillow"
                })

        with open('data.json', 'w', encoding='utf-8') as f:
            json.dump(listings, f, ensure_ascii=False, indent=4)

        print(f"Итог: Сохранено {len(listings)} объектов.")

    finally:
        driver.quit()

if __name__ == "__main__":
    parse_with_selenium_v2()