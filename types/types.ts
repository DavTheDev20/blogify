export type PostType = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    image: string;
  };
  Comment: Array<CommentType>;
};

export type CommentType = {
  id: number;
  content: string;
  user: {
    id: string;
    name: string;
    image: string;
    email: string;
  };
  createdAt: Date;
};
