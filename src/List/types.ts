export interface IGame {
  name: string;
  description: string;
  playersFrom: number;
  playersTo: number;
  age: string;
  duration: string;
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
            linkType: string;
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
            linkType: string;
          };
        };
        revision: number;
        contentType: {
          sys: {
            type: string;
            linkType: string;
            id: string;
          };
        };
        locale: string;
      };
      fields: IGame;
    }
  ];
}
