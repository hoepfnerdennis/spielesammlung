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

/*
{
  "sys": {
    "type": "Array"
  },
  "total": 3,
  "skip": 0,
  "limit": 100,
  
  "includes": {
    "Asset": [
      {
        "sys": {
          "space": {
            "sys": {
              "type": "Link",
              "linkType": "Space",
              "id": "9sxha2f3gm24"
            }
          },
          "id": "2Txvyka47nhfVoh2Sc1OUh",
          "type": "Asset",
          "createdAt": "2020-03-20T14:04:02.201Z",
          "updatedAt": "2020-03-20T14:04:02.201Z",
          "environment": {
            "sys": {
              "id": "master",
              "type": "Link",
              "linkType": "Environment"
            }
          },
          "revision": 1,
          "locale": "en-US"
        },
        "fields": {
          "title": "Mensch ärgere dich nicht",
          "description": "Mensch ärgere dich nicht",
          "file": {
            "url": "//images.ctfassets.net/9sxha2f3gm24/2Txvyka47nhfVoh2Sc1OUh/d277e6dc09f15b5bb5a134ff7082fe4a/photo-1582921017967-79d1cb6702ee",
            "details": {
              "size": 192767,
              "image": {
                "width": 2100,
                "height": 1400
              }
            },
            "fileName": "photo-1582921017967-79d1cb6702ee",
            "contentType": "image/jpeg"
          }
        }
      }
    ]
  }
}
 */
