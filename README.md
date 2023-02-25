Правила именования веток:

`feature/{issueNumber}`, например `feature/2` - **для разработки**

`shared/issueNumber`, ВЛИВАЕМ в `feature/{issueNumber}` - если во время разработки feature пришлось поменять shared компоненты. Для того-чтобы успеть сделать revert до того как всё по пизде пойдет...

`core/{issueNumber}`, например `core/2` - **разработка, при изменении CORE вещей! Надо быть аккуратнее**

> Установка пакета: 
  - frontend: `npm i -f`
  - api: `npm i`

> Линтеры: 
  - frontend: `npm run tslint`
  - api: `npm run lint` && `npm run test`