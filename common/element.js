;(function (window, document) {
  window.common = window.common || {};
  var elem = window.common.element = window.common.element || {};
  elem.select = elem.select || {};

  elem.select.one = function (query) {
    return new SelectOne(query);
  }

  elem.select.list = function (query) {
    return new SelectList(query);
  }



  SelectOne.prototype = Object.create(null);

  SelectOne.prototype.constructor = SelectOne;

  SelectOne.prototype.searchIn = searchIn;

  SelectOne.prototype.getValue = getValue;

  SelectOne.prototype.addClass = addClass;

  SelectOne.prototype.removeClass = removeClass;

  SelectOne.prototype.addListener = addEventListener;

  SelectOne.prototype.removeListener = removeEventListener;




  function SelectOne(query) {
    this.elem = SelectOne.find(query)
  }

  SelectOne.find = function (query) {
    return query instanceof HTMLElement?query:document.querySelector(query);
  }

  function SelectList(query) {
    this.elems = SelectList.findAll(query);
  }

  SelectList.findAll = function (query) {
    return document.querySelectorAll(query);
  }

  SelectList.prototype.addClass = function (className) {
    for(var i = 0; i < this.elems.length; i++) {
      addClass.call({
        elem: this.elems[i]
      }, className);
    }
  }


  SelectList.prototype.removeClass = function (className) {
    for(var i = 0; i < this.elems.length; i++) {
      removeClass.call({
        elem: this.elems[i]
      }, className);
    }
  }

  function addClass(className) {
    if(!this.elem.classList.contains(className)){
      this.elem.classList.add(className);
    }

    return this;
  }

  function searchIn(query) {
    return new SelectOne(this.elem.querySelector(query));
  }

  function getValue(query) {
    if(!this.elem.value) {
      console.warn("This element haven't value:", this.elem);
    }
    return this.elem.value;
  }

  function removeClass(className) {
    if(this.elem.classList.contains(className)){
      this.elem.classList.remove(className);
    }

    return this;
  }

  function addEventListener(type, cb) {
    if (this.elem.addEventListener){
      this.elem.addEventListener(type, cb, false);
    } else if (this.elem.attachEvent) {
      this.elem.attachEvent("on" + type, cb);
    }

    return this;
  }

  function removeEventListener(type, link) {
    if (this.elem.removeEventListener){
      this.elem.removeEventListener(type, link, false);
    } else if (this.elem.detachEvent) {
      this.elem.detachEvent("on" + type, link);
    }

    return this;
  }

})(window, document)