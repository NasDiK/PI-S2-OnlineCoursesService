# Выполнение запросов

**С фронта:**
```ts
api().path('/tasks/getTaskById')
.body({
    taskId: 1
})
.params({test: 'test'})
.executePost()
.executeGet()
.then(x=>x.json()).then(x=>console.log(x));
```

Использование на фронте (если просто api() не сработает у TSX)
```ts
window.api().path('/tasks/getTaskById')
.body({
    taskId: 1
})
.params({test: 'test'})
.executePost()
.executeGet()
.then(x=>x.json()).then(x=>console.log(x));
```

# Использование enums

`import {} from '@local/enums/*`, где * - нужная папочка. А в деструкторе нужный объект