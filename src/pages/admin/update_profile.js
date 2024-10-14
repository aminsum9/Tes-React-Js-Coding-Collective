import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthServices from '../../services/admin/authServices';
import NavigationAdmin from '../../components/admin/navigation';


function UpdateProfileAdmin() {
    var [name, setName] = React.useState('');
    var [email, setEmail] = React.useState('');
    var [address, setAddress] = React.useState('');

    React.useEffect(() => {
        getDataProfile();
    }, []);

    const getDataProfile = () => {
        var dataProfile = localStorage.getItem('auth');

        var dataUser = JSON.parse(dataProfile);

        setName(dataUser.name)
        setEmail(dataUser.email)
        setAddress(dataUser.address)
    }

    const handleUpdateProfileAdmin = () => {

        var body = {
            name,
            email,
            address
        }

        new AuthServices().update(body).then(ress => {
            if(ress.success){
                localStorage.setItem('auth',JSON.stringify(ress.data))
                toast(ress.message);
                setTimeout(() => {
                    window.location.href = '/update-profile';
                },1000);
            }
        })
    }

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    return (
        <div className="flex h-[100vh]">
             <ToastContainer />
            <NavigationAdmin />
            <div className="w-4/5 p-4 flex flex-col items-center justify-center">
                <h3 className='font-bold text-3xl mb-10' >Update Profile</h3>
                <div className='flex items-center justify-center w-2/5 text-center' >
                <div className='w-9/12 flex flex-col items-center'>
                    <div className='w-full flex flex-col items-center justify-center mb-16'>
                        <div className="w-full max-w-sm min-w-[200px] items-center justify-center">
                            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Name" />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Email" />
                            <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full mb-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Address" />
                        </div>
                    </div>
                    <button
                        onClick={() => handleUpdateProfileAdmin()}
                        className="w-full px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring">
                        Edit Profile
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default UpdateProfileAdmin;