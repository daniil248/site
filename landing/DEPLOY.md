# Деплой лендинга

## Один раз: дать доступ на GitHub (Deploy Key)

1. Открой: **https://github.com/daniil248/site/settings/keys**
2. Нажми **"Add deploy key"**.
3. **Title:** `cursor-deploy` (или любое).
4. **Key:** вставь эту строку целиком:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILiT8Ls5drVSiuM/ZcV6y+IHWqLes8xkL7X3F80lAEQo deploy-site
```

5. Включи галочку **"Allow write access"**.
6. Нажми **"Add key"**.

После этого пуш из проекта будет проходить без паролей.

---

## GitHub Pages

Settings → Pages → Source: **Deploy from a branch** → Branch: **main**, Folder: **/ (root)** → Save.

Сайт: **https://daniil248.github.io/site/**
