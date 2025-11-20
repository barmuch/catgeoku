import Hero from '@/components/home/Hero'
import LatestArticles from '@/components/home/LatestArticles'
import ToolsShowcase from '@/components/home/ToolsShowcase'
import FeaturedCategories from '@/components/home/FeaturedCategories'
import Newsletter from '@/components/home/Newsletter'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 6)

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <LatestArticles posts={latestPosts} />
      <ToolsShowcase />
      <Newsletter />
    </>
  )
}
