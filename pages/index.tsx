import MainLayout from '@/components/layout';
import CTA from '@/components/sections/cta';
import FeaturedPost from '@/components/sections/featuredPost';
import LatestPosts from '@/components/sections/latestPosts';
import SEO from '@/components/sections/seo';
import { getBlogMeta } from 'lib/mdx';
import { getBlogs } from 'services';
import { IBlogMeta } from 'types';
import { NextPageWithLayout } from './page';

interface IHome {
  blogsMeta: IBlogMeta[];
}

const Home: NextPageWithLayout<IHome> = ({ blogsMeta }) => {
  console.log(blogsMeta);

  return (
    <>
      <SEO />
      <FeaturedPost />
      <LatestPosts blogsMeta={blogsMeta} />
      <CTA />
    </>
  );
};
export default Home;

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export async function getStaticProps() {
  const blogs = await getBlogs();

  // console.log(blogsMeta.data);

  const blogsMeta = blogs.data.map((blog: any) => getBlogMeta(blog));

  return { props: { blogsMeta } };
}
