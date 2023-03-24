# Использование enums

`import {} from '@local/enums/*`, где * - нужная папочка. А в деструкторе нужный объект

> Пример в коде
  ```ts
  import {shared} from '@local/enums';
  const {fieldType} = shared;
  
  <DirectoryField type={fieldType.CHECKBOX_GROUP} options={\<Твой список>\} />
  ```

> Если TS ругается на declare module. Переименуйте файл где используете `.tsx->.js` но при этом обязательно используем PropTypes
> Не забывайте, что при изменении enums нужно поменять `patch` версию на 1, удалять `node_modules`, `package-lock.json` и прописать `npm i`

## Базовые компоненты такие как кнопки, текст, селекты и т.п. используем только шаредные
***Если шаредной компоненты нет - то её можно добавить/расширить***

<span style="color: lime">Пример использования шаредного текста.</span>. **Как расширять - интуитивно понятно внутри файла**

```ts
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

**В шаредные компоненты сторы пишем в главную папку**