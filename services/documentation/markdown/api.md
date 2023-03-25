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
Чтобы неявно передавать **токен**, и **метаданные пользователя** для подтверждение "живого" юзера