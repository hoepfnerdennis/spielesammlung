interface IBaseGame {
  id: string;
  name: string;
  description: string;
  playersFrom: number;
  playersTo: number;
  age: string;
  duration: string;
  favorite: boolean;
  simpleRules: boolean;
  drinkingGame: boolean;
}

export interface IGame extends IBaseGame {
  image: string;
}

export type SetFilterFunc = (key: FilterKey) => (value?: FilterValue | undefined) => void;

export enum FilterKey {
  'playersFrom',
  'playersTo',
  'name',
  'favorite',
  'drinkingGame',
  'simpleRules',
}

export type FilterValue = string;

export interface FiltersConfig {
  [key: string]: string;
}

export type ActiveFiltersMap = Map<FilterKey, FilterValue>;

enum LinkTypes {
  'Asset',
  'Space',
  'Environment',
  'ContentType',
}

enum SysTypes {
  'Link',
  'Asset',
}

interface IAPIGame extends IBaseGame {
  image?: {
    sys: {
      type: string;
      linkType: LinkTypes;
      id: string;
    };
  };
}

export interface IAsset {
  sys: {
    space: {
      sys: {
        type: string;
        linkType: LinkTypes;
        id: string;
      };
    };
    id: string;
    type: SysTypes;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: {
        id: string;
        type: SysTypes;
        linkType: LinkTypes;
      };
    };
    revision: number;
    locale: string;
  };
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface IAPIResponse {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: [
    {
      sys: {
        space: {
          sys: {
            type: string;
            linkType: LinkTypes;
            id: string;
          };
        };
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        environment: {
          sys: {
            id: string;
            type: string;
            linkType: LinkTypes;
          };
        };
        revision: number;
        contentType: {
          sys: {
            type: string;
            linkType: LinkTypes;
            id: string;
          };
        };
        locale: string;
      };
      fields: IAPIGame;
    }
  ];
  includes?: {
    Asset: IAsset[];
  };
}
