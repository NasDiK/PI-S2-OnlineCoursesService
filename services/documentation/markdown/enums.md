# Обновление енумов
После того как дополнили енум нужно его скомпилировать
1) В корне сервиса `enums` прописываем `npm run build`

Для того чтобы они у вас обновились в сервисах нужно удалить пакеты

2) В корне нужного сервиса 

<span style="color: lime">Api: </span>
`rm node_modules/ && rm package-lock.json && npm i`

Для оптимизации на бэке можно удалять только папочку енумов. `rm node_modules/@local/enums/ && npm i`

<span style="color: pink">Frontend: </span>
`rm node_modules/ && rm package-lock.json && npm i -f`

Для оптимизации на фронте можно удалять только папочку енумов. `rm node_modules/@local/enums/ && npm i -f`

На Windows требуется подтверждения, написать `A`

**3) После установки пакетов сервисы надо перезапустить**

# Использование enums

`import {} from '@local/enums';`, где в деструкторе нужный объект

либо вложенно

`import {tasks: {fieldType as tasksEnum}} from '@local/enums';`, где в деструкторе нужный объект

`const {tasks: {fieldType: tasksEnum}} = require('@local/enums');`, где в деструкторе нужный объект