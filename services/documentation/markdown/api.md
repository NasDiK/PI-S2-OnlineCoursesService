# Выполнение запросов

**С фронта:**
```ts
api().path('/tasks/getTaskById')
.body({
    taskId: 1
})
.params({test: 'test'})
.executePost() //oneOf
.executeGet() //oneOf
.then(x=>console.log(x)); //optional
```

Использование на фронте (если просто api() не сработает у TSX)
```ts
window.api().path('/tasks/getTaskById')
.body({
    taskId: 1
})
.params({test: 'test'})
.executePost() //oneOf
.executeGet() //oneOf
.then(x=>console.log(x)); //optional
```

**На backend сами к себе обращайтесь:**

`const {} = require('*/controllers/*');` - *но к контроллеру*

# Описание API

body -> прописывает данные в request.body

params -> прописывает данные в request.headers

POST используем для того чтобы передавать в запросе сложные JS объекты. Спецификация GET не позволяет такого делать

## Для чего нам апи?
Чтобы неявно передавать **токен**, а в нём **метаданные пользователя** для подтверждение "живого" юзера

# Бэкенд метаданные
На бэке в каждом запросе после проверки токена отрабатывает decodeMiddleware

## Что это значит?
Теперь в каждый `request` дополнительно в `body` прокидываются метаданные

На момент написания этой доки - `userId`, `userRoles`

```ts
const {userId, userRoles} = req.body;
```

## Учитывать что Express под капотом все `headers` понижает до нижнего регистра