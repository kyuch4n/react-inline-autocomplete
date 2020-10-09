declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'ignore-case' {
  const api = {
    equals: (str1: string, str2: string) => boolean,
    startsWith: (str: string, searchStr: string, pos?: number) => boolean,
  };

  export const equals = api.equals;
  export const startsWith = api.startsWith;
  export default api;
}
