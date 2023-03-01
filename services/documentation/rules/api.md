# Выполнение запросов

**С фронта:**
```ts
await api.service('usersBusiness').params({
    test: 'test'
}).body({
    test2: 'test2'
}).executePost();
```