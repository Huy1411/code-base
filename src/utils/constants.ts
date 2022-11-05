/* eslint-disable no-useless-escape */
export const regex = {
  htmlTagsInsensitive: /(<([^>]+)>)/i,
  htmlTagsGlobal: /(<([^>]+)>)/g,
  htmlTagsExcept: (tagName: string): RegExp => new RegExp(`\<(?!${tagName}).*?\>`, 'g'),
  lineBreak: /\\n/i,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
  domain: /^[a-zA-Z0-9](?:[a-zA-Z0-9-.]*[a-zA-Z0-9])?$/i,
  alphabetic: /^[a-z\s]+$/i,
  alphanumerial: /^[a-z0-9\s]+$/i,
  numeric: /^\d+$/i,
  landLineNumber: /^[\d\s]+$/i,
  isAllUpperCase: /^[A-Z]+$/s,
  onlySpecialKey: /[$&+,:;=?@#|'<>.^*()%!-]/i,
};

