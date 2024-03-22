export interface IPostMeta {
  excerpt: string;
  slug: string;
  title: string;
  tags: string[];
  date: string;
  image: string;
}

export interface IPost {
  content: string;
  meta: IPostMeta;
}

export interface IBlogMeta {
  excerpt: string;
  slug: string;
  title: string;
  tags: string[];
  date: string;
  image: string;
  md_url: string;
  post_id: string;
}

export interface IBlog {
  content: string;
  meta: IBlogMeta;
}
