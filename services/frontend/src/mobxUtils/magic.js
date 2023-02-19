import ws from 'isomorphic-style-loader/withStyles';
import {inject, observer} from 'mobx-react';
import {fp} from '@ecosystem/esoft-tools-shared';
import {dispose} from '@decorators';

/**
 * Данная утилита призвана применять все существующие декораторы mobx и наши
 * в правильном порядке. Порядок применения влияет на правильную работу всех применяемых компонентов
 *
 * @param {React.Component|React.FC} comp
 * @param {Object?} decorators
 * @param {string|string[]?} decorators.styles
 * @param {string|Function?} decorators.store
 * @param {string?} decorators.disposeStore
 */
export const magic = (comp, decorators) => {
  const composeArgs = [];
  const {styles, store, disposeStore} = decorators || {};

  // priority 4
  if (styles) {
    const _styles = Array.isArray(styles) ? styles : [styles];

    composeArgs.push(ws(..._styles));
  }

  // priority 3
  if (store) {
    if (typeof store === 'string') {
      const storesNames = store.split(/\s*,\s*/);

      composeArgs.push(inject(...storesNames));
    } else {
      composeArgs.push(inject(store));
    }
  }

  // priority 2
  composeArgs.push(observer);

  // priority 1
  if (disposeStore) {
    composeArgs.push(dispose(disposeStore));
  }

  return fp.compose(...composeArgs)(comp);
};