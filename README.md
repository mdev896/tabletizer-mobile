# 📱 Tabletizer Mobile

Minimal **Expo + React Native** starter template with **NativeWind (TailwindCSS)** integration.
Works seamlessly with **WSL (Windows Subsystem for Linux)** thanks to tunnel support.

---

## 🚀 Features

* ⚡ Fast and lightweight Expo setup
* 🎨 Tailwind-style utility classes via NativeWind
* 🧱 Simple, scalable folder structure (`app/`, `assets/`, etc.)
* 🔗 Tunnel support — no local network headaches on WSL
* 💡 Ideal for bootstrapping small mobile projects

---

## 🛠️ Installation

```bash
# clone the repo
git clone https://github.com/mdev896/tabletizer-mobile.git

cd tabletizer-mobile

# install dependencies
npm install

# start development
npm run android   # or 'npm run ios'
```

---

## ⚙️ Tech Stack

* **React Native**
* **Expo**
* **NativeWind**
* **TypeScript**
* **TailwindCSS**

---

## 📂 Folder Structure

```
tabletizer-mobile/
│
├── app/                # main app screens and components
├── assets/             # images, fonts, icons
├── global.css          # tailwind/global styles
├── tailwind.config.js  # tailwind configuration
├── babel.config.js     # babel setup
├── metro.config.js     # metro bundler setup
├── app.json            # expo app configuration
└── tsconfig.json       # typescript config
```

---

## 💻 Development Notes

This project uses **tunnel mode** to run on devices from WSL environments.
Make sure to have Expo CLI installed globally:

```bash
npm install -g expo-cli
```

Then, run:

```bash
npm run android
```

---

## 📄 License

MIT © 2025 mdev896
