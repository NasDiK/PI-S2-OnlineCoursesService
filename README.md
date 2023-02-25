Правила именования веток:

`feature/{issueNumber}`, например `feature/2` - **для разработки**

`core/{issueNumber}`, например `core/2` - **разработка, при изменении CORE вещей! Надо быть аккуратнее**

> Установка пакета: 
  - frontend: `npm i -f`
  - api: `npm i`

> Линтеры: 
  - frontend: `npm run tslint`
  - api: `npm run lint` && `npm run test`

> Общий линтер на деплой:
  - В папке deploy: `npm run pipeline` - для удобства=)