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
  
При создании MR крепим его к задаче в островке "development"

Создание клона базы, чтобы свою не портить (выполнять по порядку)
```SQL
SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity 
WHERE pg_stat_activity.datname = 'pi' AND pid <> pg_backend_pid();

CREATE DATABASE "pi_clone" WITH TEMPLATE "pi";
```