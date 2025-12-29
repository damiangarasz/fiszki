# 📚 Fiszki App

Aplikacja mobilna do nauki języków obcych i zarządzania własną bazą fiszek. Projekt stworzony, aby pomóc w systematycznej nauce poprzez algorytm powtórek.

![Expo](https://img.shields.io/badge/Expo-4630EB?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NativeWind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📱 Zrzuty ekranu

<p align="center">
  <img src="./screeny/1.PNG" width="30%" />
  <img src="./screeny/2.PNG" width="30%" />
  <img src="./screeny/3.PNG" width="30%" />
  <img src="./screeny/4.PNG" width="30%" />
</p>

## 🚀 Główne funkcjonalności

- **System powtórek:** Algorytm ważący słowa ("Znam", "Trochę znam", "Nie znam") i dostosowujący częstotliwość ich wyświetlania.
- **Zarządzanie bazą:** Dodawanie, edycja i usuwanie fiszek oraz kategorii.
- **Interaktywny UI:** Animowane odwracanie kart (React Native Reanimated).
- **Wielojęzyczność:** Możliwość nauki w trybie PL -> EN, EN -> PL lub losowym.
- **Persystencja danych:** Zapisywanie postępów i bazy w pamięci urządzenia (AsyncStorage).

## 👀 Co w najbliższej przyszłości

- **Statystyki:** Przyjazne dla oka statystyki uprzyjemniające naukę
- **Synchronizacja:** Synchronizacja danych z chmura za pomocą Firebase
- **Udostępnianie:** Udostępnianie fiszek za pomoca generowanego kodu
- **Wielojęzyczność:** Przetłumaczenie aplikacji na wiele języków
- **Mikropłatności:** Udostępnienie płatnych skórek
- **Wymowa:** Zamiana tekstu angielskiego na mowę

## 🛠️ Technologie

Projekt został zbudowany z użyciem nowoczesnego stacku technologicznego:

- **Core:** React Native, Expo
- **Język:** TypeScript
- **Stylowanie:** NativeWind (TailwindCSS)
- **Nawigacja:** React Navigation
- **Animacje:** React Native Reanimated
- **Zarządzanie stanem:** Context API (Custom Hooks)

## 💡 Czego się nauczyłem?

Podczas tworzenia tej aplikacji zmierzyłem się z wieloma wyzwaniami:

1.  **Zarządzanie stanem:** Początkowo używałem lokalnych stanów i `prop drilling`, co prowadziło do problemów. Przepisałem aplikację na **Global Context API**, co uporządkowało przepływ danych.
2.  **Optymalizacja renderowania:** Zrozumiałem działanie `useEffect` i `useCallback` oraz nauczyłem się unikać infinite loops przy aktualizacji stanu.
3.  **Architektura:** Wdrożyłem wzorzec Immutable Update przy edycji złożonych struktur danych.
4.  **Git:** Nauczyłem się zarządzać historią zmian i pracować z `.gitignore`.

## ⚙️ Instalacja i uruchomienie

1. Sklonuj repozytorium:
   ```bash
   git clone [https://github.com/damiangarasz/fiszki.git](https://github.com/damiangarasz/fiszki.git)
   ```
2. Lub dołącz do grona testerów: [https://play.google.com/apps/internaltest/4701472644857898973](https://play.google.com/apps/internaltest/4701472644857898973)
