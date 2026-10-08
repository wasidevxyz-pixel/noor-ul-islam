import urllib.request, json, time, ssl

ctx = ssl._create_unverified_context()
headers = {"User-Agent": "Mozilla/5.0"}
surahs = [1, 18, 36, 55, 56, 67, 112, 113, 114]
results = {}

# Also get Ayat al-Kursi (2:255)
req = urllib.request.Request("https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=2:255", headers=headers)
with urllib.request.urlopen(req, context=ctx) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    results["2:255"] = data['verses'][0]['text_uthmani']

for s in surahs:
    print(f"Fetching Surah {s} Uthmani...")
    url = f"https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number={s}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        results[str(s)] = [
            {
                "id": v["id"],
                "verse_key": v["verse_key"],
                "numberInSurah": int(v["verse_key"].split(':')[1]),
                "text_uthmani": v["text_uthmani"]
            }
            for v in data["verses"]
        ]
    time.sleep(0.3)

with open("data/quran_uthmani_verified.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Downloaded", len(results), "surahs successfully!")
