


export default interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [langCode: string]: {
        official: string;
        common: string;
      }
    }
  };
  currencies?: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    }
  };
  capital?: string;
  region: string;
  subregion?: string;
  languages?: {
    [langCode: string]: string;
  };
  flags: {
    png : string;
    svg: string;
    alt: string;
  }         
  population: number;
  borders?:[string];
  flag: string;

}
