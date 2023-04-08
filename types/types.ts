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
};
