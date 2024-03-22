import { MDXComponents } from '@/components/MDXComponents';
import CTA from '@/components/sections/cta';
import SEO from '@/components/sections/seo';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import matter from 'gray-matter';
import 'highlight.js/styles/atom-one-dark.css';
import { InferGetServerSidePropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useRouter } from 'next/router';
import { useState } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { getBlog } from 'services';
import { IBlogMeta } from 'types';

export const getServerSideProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  // id 값을 사용하여 필요한 데이터를 불러옴
  // 예를 들어, API 호출을 통해 포스트 데이터를 불러올 수 있음
  const res = await getBlog(slug);
  const response = await axios.get(res.data[0].md_url);
  const { content, data } = matter(response.data);

  // 불러온 데이터를 props로 페이지 컴포넌트에 전달
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
      ],
    },
  });
  const meta: IBlogMeta = {
    post_id: data.post_id ?? slug,
    md_url: data.md_url ?? res.data[0].md_url,
    slug: data.title,
    excerpt: data.excerpt ?? '',
    title: data.title,
    tags: (data.tags ?? []).sort(),
    date: (data.date ?? new Date()).toString(),
    image: data.image ?? '',
  };

  return {
    props: {
      source: mdxSource,
      meta,
    },
  };
};

const PostPage = ({
  source,
  meta,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const [metaData, setMetaData] = useState<any>(meta);
  const [sourceData, setSourceData] = useState<any>(source);
  return (
    <>
      {metaData && sourceData && (
        <>
          <SEO title={`${metaData.title}`} urlImage={metaData.image} />
          <section className="py-10">
            <div className="container mx-auto px-4 md:px-20">
              <div
                onClick={() => router.back()}
                className="flex items-center space-x-2 cursor-pointer hover:underline"
              >
                <ChevronLeftIcon className="h-4" />
                <span className="text-md font-semibold">Go back</span>
              </div>

              <div className="px-8 md:px-44 pb-20">
                <div className="py-10">
                  <p className="text-sm mb-2">
                    {metaData.date.split(' ').slice(0, 4).join(' ')}
                  </p>
                  <h1 className="text-2xl font-bold">{metaData.title}</h1>
                </div>

                <MDXRemote {...sourceData} components={MDXComponents} />
              </div>
            </div>
          </section>
        </>
      )}

      <CTA />
    </>
  );
};

export default PostPage;
