import { ReactNode } from 'react';
import Footer from './guest-partials/Footer';
import NavBar from './guest-partials/NavBar';

type Props = {
  title?: string;
  children?: ReactNode;
}

function GuestLayout(props: Props) {
  document.title = props.title || 'Selamat Datang';
  return (
    <>
      <NavBar />
      <div className="px-20 bg-ggray !text-white">
        {props.children}
        <Footer />
      </div>
    </>
  )
}

export default GuestLayout;