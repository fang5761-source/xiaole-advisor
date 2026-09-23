小樂理專 V0.2｜Google 登入＋Firestore 雲端同步測試版

這一版新增：
1. Google 帳號登入／登出
2. 本機 IndexedDB 保留（沿用 V0.1 資料庫）
3. 登入後，把本機對話同步到 Firestore
4. 另一台裝置登入同一 Google 帳號，可抓回雲端對話
5. 「我的」可查看同步狀態、手動立即同步、匯出 JSON 備份

重要：
- Google 登入不可用 file:// 直接雙擊 index.html 測試；請放到 HTTPS 網站（例如 GitHub Pages）。
- Firebase Authentication 必須把實際網站網域加入「已授權網域」。
- Firestore 規則需維持 users/{userId}/... 僅本人 UID 可讀寫。
- 此版尚未加入 AI 自動回話；目的只驗證登入與跨裝置同步。
- Firebase Web apiKey 不是密碼；資料權限由 Authentication + Firestore Rules 控制。
