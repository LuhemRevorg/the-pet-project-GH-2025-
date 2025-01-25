import react from "react";
import LOGO from '../assets/images/logo.png'
import BG from '../assets/images/3481301037-preview.mp4'

const Home = () => {

    return (
        <div>

            <video style={{position:"fixed", zIndex:"-1", width:"100%"}} className='videoTag' autoPlay loop muted>
                <source src={BG} type='video/mp4' />
            </video>
            <button>Login</button>
            <button>Sign Up</button>

        </div>
    );



}


export default Home;
