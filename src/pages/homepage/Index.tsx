import GuestLayout from '../../layouts/GuestLayout'
import Section1 from './partials/Section1'
import Section2 from './partials/Section2'
import Section3 from './partials/Section3'
import Section4 from './partials/Section4'
import Section5 from './partials/Section5'

function Index() {
  return (
    <GuestLayout title='Selamat Datang'>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </GuestLayout>
  )
}

export default Index