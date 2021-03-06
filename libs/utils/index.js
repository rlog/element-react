import {require_condition} from './assert'
import * as ReactUtils from './react'
import * as Errors from './errors'

export {require_condition, ReactUtils, Errors}

export function watchPropertyChange(target, property, cb) {
  require_condition(
    target != null && 
    typeof property === 'string' && 
    typeof cb === 'function', 'invalid arguments')

  let cache = null
  if (!target.__watch_cache){
    target.__watch_cache = {}
  }
  cache = target.__watch_cache

  require_condition(cache[property] == null, `duplicated watch on ${target} 's ${property}`)
  cache[property] = cb
  
  let origin = target[property]

  Object.defineProperty(target, property, {
    configurable: true,
    
    get() {
      return origin
    },

    set(value) {
      origin = value
      if (cache[property]){
        cache[property](origin)
      }
    }
  })

  return ()=>{
    if (target.__watch_cache && target.__watch_cache[property]){
      delete target.__watch_cache[property]
      delete target[property]
      target[property] = origin
    }
  }
}

export function createPropType(validate) {
  // Chainable isRequired
  function checkType(isRequired, props, propName, componentName) {
    componentName = componentName || '<<anonymous>>';
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(
          ("Required `" + propName + "` was not specified in ") +
          ("`" + componentName + "`.")
        );
      }
      return null;
    } else {
      return validate(props, propName, componentName);
    }
  }

  let chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

// take from :  http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
export function hashCode(str){
  if (str == null||str.length === 0) return 0
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		let char = str.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

export function debounce(func, delayms){
  let timeout = null;
  return function(...args){
    if (timeout != null) clearTimeout(timeout)
    timeout = setTimeout(()=>func.apply(this, args), delayms) 
  }
}

export {default as DateUtils} from './date'
export * from './popper-mixins'
export {IDGenerator} from './IDGenerator'