

// export default interface Country {
//   flag: string;
//   name: string;
//   nativeName: string;
//   topLevelDomain: string[];
//   population: number;
//   region: string;
//   capital?: string;
//   subregion: string;
//   currencies?: {
//     code: string;
//     name: string;
//     symbol: string;
//   }[];
//   languages: {
//     iso639_1?: string;
//     iso639_2: string;
//     name: string;
//     nativeName?: string;
//   }[];
//   borders?: string[];
// }


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
  capital?: string[];
  region: string;
  subregion?: string;
  languages?: {
    [langCode: string]: string;
  };
  flag: string;          // el emoji de la bandera
  population: number;
}
