/* eslint-disable no-param-reassign */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-useless-escape */

import moment from 'moment';

export const humanReadableTime = (time: string): string => {
  const formatedTime = moment(time).format();
  const duration = moment.duration(moment().diff(formatedTime));
  const seconds = duration.asSeconds();
  const humanizeDuration = moment.duration(-seconds, 'seconds').humanize(true);

  return humanizeDuration;
};

export const urlSafe = (text: string): string => {
  const url = text
    .replace(/[^a-zA-Z0-9- ]/g, '') // remove invalid characters
    .replace(/\s\s+/g, ' ') // trim whitespace
    .replace(/ /g, '-') // replace space with -
    .toLowerCase();
  return url;
};

export const camelCase = (str: string): string => {
  const camelCaseString = str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, '');

  return camelCaseString;
};

export const searchString = (target: string | string[], searchValue: string): boolean => {
  const searchKey = searchValue.toLowerCase();
  const searchTarget = target instanceof Array ? target.map((str) => str.toLowerCase()) : target.toLowerCase();
  const searchResult =
    searchTarget instanceof Array
      ? !!searchTarget.filter((str) => str.includes(searchKey)).length
      : searchTarget.includes(searchKey);
  return searchResult;
};

export const truncateStringByCharaters = (content: string, maxLength: number): string => {
  const contentLength = content.length;
  return `${content.slice(0, contentLength > maxLength ? maxLength : contentLength)}${
    contentLength > maxLength ? '...' : ''
  }`;
};

export const truncateStringByWords = (content: string, maxWords: number): string => {
  const contentSplited = content.split(' ');
  if (maxWords >= contentSplited.length) {
    return content;
  }
  const contentSplitedOptimized = contentSplited.filter((_, index) => index < maxWords);
  const contentTruncated = contentSplitedOptimized.join(' ');
  return `${contentTruncated}...`;
};

export const lockPageScroll = (): void => {
  const body = document.getElementById('body');
  body?.classList.add('lock-scroll');
};

export const unlockPageScroll = (): void => {
  const body = document.getElementById('body');
  body?.classList.remove('lock-scroll');
};

export const getQueryParam = (param: string): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
};

export const getAuthUser = (): undefined => {
  // try {
  //   const decodedToken: any = jwtDecode(authHelpers.getAccessToken());

  //   const { userId, username, updatedAt, fullName, avatar, group } = decodedToken;
  //   return { userId, username, updatedAt, fullName, avatar, group };
  // } catch {
  return undefined;
  // }
};

export const removeAllSpace = (value: string): string => {
  return value.replace(/ /g, '');
};

export const capitalizeFirstLetter = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const capitalizeAllFirstLetter = (value: string): string => {
  return value.replace(/(^\w{1})|(\s+\w{1})/g, (capitalizeLetter) => capitalizeLetter.toUpperCase());
};

export const formatMoneyAmountToNumber = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const randomEnumValue = (enumeration: { [key: string]: any }): any => {
  const values = Object.keys(enumeration);
  const enumKey = values[Math.floor(Math.random() * values.length)];
  return enumeration[enumKey];
};

export const objectIsEmpty = (obj?: Record<string, unknown>): boolean => {
  return obj ? Object.keys(obj).length === 0 : true;
};

export const getArrayFrom0To = (numb: number): number[] =>
  Array(numb)
    .fill('')
    .map((_, i) => i);

export const getNowDate = (): string => {
  const date = new Date();
  let dateNumber: string | number = date.getDate();
  let month: string | number = date.getMonth() + 1;
  const year = date.getFullYear();
  if (dateNumber < 10) {
    dateNumber = `0${dateNumber}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${month}/${dateNumber}/${year}`;
};

export const downloadURL = async (url: string, fileName: string): Promise<void> => {
  const image = await fetch(url);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement('a');
  link.href = imageURL;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downLoadFile = (data: string, fileName: string): void => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.removeChild(link);
};
