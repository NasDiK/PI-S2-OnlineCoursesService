# Обновление енумов
После того как дополнили енум нужно его скомпилировать
1) В корне сервиса `enums` прописываем `npm run build`

Для того чтобы они у вас обновились в сервисах нужно удалить пакеты

2) В корне нужного сервиса 
> Api: `rm node_modules/ && rm package-lock.json && npm i`

> Frontend: `rm node_modules/ && rm package-lock.json && npm i -f`

На Windows требуется подтверждения, написать `A`

# Использование enums

`import {} from '@local/enums';`, где в деструкторе нужный объект

либо вложенно

`import {tasks: {fieldType as tasksEnum}} from '@local/enums';`, где в деструкторе нужный объект

`const {tasks: {fieldType: tasksEnum}} = require('@local/enums');`, где в деструкторе нужный объект