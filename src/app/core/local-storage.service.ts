import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {}

  clear() {
    window.localStorage.clear();
  }

  get(itemName) {
    return window.localStorage.getItem(itemName);
  }

  set(itemName, item) {
    window.localStorage.setItem(itemName, item);
  }

  getObject(objName) {
    return JSON.parse(window.localStorage.getItem(objName));
  }

  setObject(objName, obj) {
    window.localStorage.setItem(objName, JSON.stringify(obj));
  }

}
