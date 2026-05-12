import HeroBanner from '@/components/sections/HeroBanner'
import WhySection from '@/components/sections/Why'
import PageTemplate, { generateMetadata } from './[slug]/page'
import PostSlider from '@/components/Posts/PostSlider'
import ProjectSection from '@/components/Projects/ProjectSection'
import CtaBanner from '@/components/sections/CTA'

type Props = {
  params: Promise<{
    slug?: string
  }>
}

export default async function HomePage(props: Props) {
  const Page = await PageTemplate(props)

  return (
    <>
      <HeroBanner />
      <WhySection />
      <ProjectSection />
      <PostSlider />
      <CtaBanner />
    </>
  )
}

export { generateMetadata }
