import Hero from '../../components/home/Hero'
import BestSellers from '../../components/home/BestSellers'
import Recommendations from '../../components/home/Recommendations'
import PopularGames from '../../components/home/PopularGames'
import SidePromotions from '../../components/home/SidePromotions'
import TestimonialsSection from '../../components/home/TestimonialsSection'
import SpecialPromo from '../../components/home/SpecialPromo'
import SelectPlatformsSection from '../../components/home/SelectPlatformsSection'

function HomePage() {
  return (
    <div >
      <section className="pb-8 lg:pb-12">
        <Hero />
      </section>

      <section className="pb-12">
        {/* Rails are mounted inside PopularGames so they anchor to the top of
            the card grid, leaving the title area untouched. */}
        <PopularGames
          // sideRails={
          //   <>
          //     <SidePromotions slot="left" className="absolute right-full top-0 mr-6" />
          //     <SidePromotions slot="right" className="absolute left-full top-0 ml-6" />
          //   </>
          // }
        />
      </section>
      <section className="pb-12">
        <BestSellers />
      </section>
                          
      <section className="pb-12">
        <Recommendations />
      </section>

      <section className="pb-12">
        <TestimonialsSection />
      </section>
<section className="pb-12">
          <SpecialPromo />
        </section>
        <section className="pb-12">
          <SelectPlatformsSection  />
        </section>

    </div>
  )
}

export default HomePage