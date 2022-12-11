export type ChatContentBlockType =
  | {
      id: string;
      type: 'paragraph';
      data: {
        text: string;
      };
    }
  | {
      id: string;
      type: 'header';
      data: {
        text: string;
        level: number;
      };
    }
  | {
      id: string;
      type: 'list';
      data: {
        items: string[];
        style: string;
      };
    }
  | {
      id: string;
      type: 'image';
      data: {
        file: {
          url: string;
        };
        caption: string;
        stretched: boolean;
        withBorder: boolean;
        withBackground: boolean;
      };
    };

export type ChatContentType = {
  time: number;
  blocks: ChatContentBlockType[];
  version: string;
};
