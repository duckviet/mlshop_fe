import EventEmitter from "../EventEmitter";

export const LOCALE_EVENT = {
  CHANGE__PENDING: "locale.change__pending",
  CHANGE__SUCCESS: "locale.change__success",
};

export const localeEvent = new EventEmitter();
