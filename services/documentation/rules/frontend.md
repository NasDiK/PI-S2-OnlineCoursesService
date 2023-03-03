# Использование enums

`import {} from '@local/enums/*`, где * - нужная папочка. А в деструкторе нужный объект

## Базовые компоненты такие как кнопки, текст, селекты и т.п. используем только шаредные
***Если шаредной компоненты нет - то её можно добавить/расширить***

<span style="color: lime">Пример использования шаредного текста.</span>. **Как расширять - интуитивно понятно внутри файла**

```js
<Typography>{'Test'}</Typography>

<Typography variant={'body24'}>{'Test'}</Typography>

<Typography variant={'body20'} weight={'regular'}>{'Test'}</Typography>

<Typography weight={'medium'}>{'Test'}</Typography>

<Typography weight={'bold'}>{'Test'}</Typography>
```

> Все шаредные штучки-дрючки лежат в `src/components/shared/*` 

Посмотреть как и какие мы используем шаредные компоненты можно на страничке `localhost:3000/shared`

**Даже если линтер ругается - его можно отключить, но на ревью расскажи зачем это сделал))**

`/* eslint-disable @typescript-eslint/no-explicit-any */`