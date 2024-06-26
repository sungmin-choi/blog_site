import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import { IBlogMeta, IPost } from 'types';

const POSTS_PATH = path.join(process.cwd(), 'posts');

export const getSlugs = (): string[] => {
  const paths = sync(`${POSTS_PATH}/*.md`);

  return paths.map((path) => {
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    const slug = fileName.split('.')[0];
    return slug;
  });
};

export const getAllPosts = () => {
  const posts = getSlugs()
    .map((slug) => getPostFromSlug(slug))
    .sort((a, b) => {
      if (a.meta.date > b.meta.date) return 1;
      if (a.meta.date < b.meta.date) return -1;
      return 0;
    })
    .reverse();
  return posts;
};

export const getPostFromSlug = (slug: string): IPost => {
  const postPath = path.join(POSTS_PATH, `${slug}.md`);
  const source = fs.readFileSync(postPath);
  const { content, data } = matter(source);

  return {
    content,
    meta: {
      slug,
      excerpt: data.excerpt ?? '',
      title: data.title ?? slug,
      tags: (data.tags ?? []).sort(),
      date: (data.date ?? new Date()).toString(),
      image: data.image ?? '',
    },
  };
};

export const getPostFromSlug2 = (source: string, slug: string): IPost => {
  // const postPath = path.join(POSTS_PATH, `${slug}.md`);
  // const source = fs.readFileSync(postPath);
  const { content, data } = matter(source);

  return {
    content,
    meta: {
      slug,
      excerpt: data.excerpt ?? '',
      title: data.title ?? slug,
      tags: (data.tags ?? []).sort(),
      date: (data.date ?? new Date()).toString(),
      image: data.image ?? '',
    },
  };
};

export const getBlogMeta = (data: any): IBlogMeta => {
  // const postPath = path.join(POSTS_PATH, `${slug}.md`);
  // const source = fs.readFileSync(postPath);
  // const { content, data } = matter(source);

  return {
    post_id: data.post_id,
    md_url: data.md_url,
    slug: data.title,
    excerpt: data.excerpt ?? '',
    title: data.title,
    tags: (data.tags ?? []).sort(),
    date: (data.date ?? new Date()).toString(),
    image: data.image ?? '',
  };
};
