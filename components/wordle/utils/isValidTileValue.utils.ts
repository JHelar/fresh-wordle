export const isValidTileValue = (value: string): boolean =>
  value.match(/^[a-zA-Z]$/) !== null;
