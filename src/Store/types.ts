interface IBaseGame {
  name: string;
  description: string;
  playersFrom: number;
  playersTo: number;
  age: string;
  duration: string;
  favorite: boolean;
  simpleRules: boolean;
}

export interface IGame extends IBaseGame {
  image: string;
}

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

export interface IFilters {
  playersFrom: number | undefined;
  playersTo: number | undefined;
  favorite: boolean | undefined;
  search: string | undefined;
}

export interface IState {
  games: Array<IGame>;
  filters: IFilters;
}

export type Reducer = (state: IState, action: IAction) => IState;

export type Dispatch = React.Dispatch<IAction>;

export interface IAction {
  type: string;
  payload: any;
}
