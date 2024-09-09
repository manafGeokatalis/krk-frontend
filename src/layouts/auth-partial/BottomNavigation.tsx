import home from '../../assets/icons/home_yellow.svg';
import document from '../../assets//icons/document_yellow.svg';
import compass from '../../assets/icons/compass_yellow.svg';
import { Link } from 'react-router-dom';



function BottomNavigation(){
    return (
        <>
            <div className="w-full bg-[#484848] max-[1500px] md:hidden flex fixed bottom-0 justify-around align-bottom py-4 z-50"
            >

                <div className="grid grid-cols-3 gap-2 w-full px-3">
                    <Link to='/'>
                        <div className="bg-[#666666] cursor-pointer p-2 w-full flex justify-center flex-col items-center rounded-2xl">
                            <img className='w-8' src={home}/>
                            <div className='text-sm mt-2'>Beranda</div>
                        </div>
                    </Link>
                   <Link to={'/petunjuk-permohonan'}>
                    <div className="bg-[#666666] cursor-pointer p-2 w-full flex justify-center flex-col items-center rounded-2xl">
                            <img className='w-8' src={document}/>
                            <div className='text-[9px] mt-2 text-center'>Petunjuk Permohonan</div>
                        </div>
                    </Link>
                    <Link to={'/tentang-krk'}>
                    <div className="bg-[#666666] cursor-pointer p-2 w-full flex justify-center flex-col items-center rounded-2xl">
                        <img className='w-8' src={compass}/>
                        <div className='text-xs text-center mt-2'>Tentang KRK</div>
                    </div>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default BottomNavigation