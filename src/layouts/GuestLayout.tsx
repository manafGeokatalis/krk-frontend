import NavBar from './guest-partials/NavBar';
import Section1 from './guest-partials/Section1';

type Props = {
  title?: string;
}

function GuestLayout(props: Props) {
  document.title = props.title || 'Selamat Datang';
  return (
    <>
      <NavBar />
      <div className="px-20 bg-ggray !text-white">
        <Section1 />
      </div>
    </>
  )
}

export default GuestLayout;