Lifecycle hooks:

onInit, 
beforeAppendChild, 
afterAppendChild, 
beforeAppendWatchers, 
afterAppendWatchers,
beforeUpdateListeners(key, value, valueFrom),
onChangeValues(key, value),
afterUpdateValues(key, value, valueFrom),
afterUpdateListeners(key, value, valueFrom),
__update(value, key, valueFrom),
beforeAppendListeners(valueFrom, view, key),
afterAppendListeners(valueFrom, view, key)

Проблемы: 
bindVar сейчас пытается связаться с родительским значением, через DI, когда родитель ещё не прошёл этап инициализации.
Есть вариант отложить внедрение зависимостей, но тогда в конструкторе не будет зависимотстей и прийдётся прийти к иньекции,
через сеттер. А есть вариант отложить инициализацию в bindVar. На данный момент - я выберу второй вариант. Но не уверен, что 
это хорошая идея, не могу представить пока, к чему это может привести.

Решено отложенной иницализацией.
