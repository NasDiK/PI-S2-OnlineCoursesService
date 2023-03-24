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

# Использование enums

`import {} from '@local/enums/*`, где * - нужная папочка. А в деструкторе нужный объект

**Конкретный пример использования можно найти в документации к frontend**