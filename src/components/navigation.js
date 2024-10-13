import * as React from 'react';
import AuthServices from '../services/authServices';

function Navigation() {

    return (
        <div className='flex-col bg-[#4287f5] justify-center w-1/5 text-center' >
            <div className='w-full flex-col items-start justify-start text-start pt-4 ps-3' >
                <h3 className='text-4xl font-bold text-white' >Employee</h3>
                <h3 className='text-4xl font-bold text-white' >Attendance</h3>
            </div>
            <div className='w-full flex-col items-start justify-start text-start pt-4 px-3'  >
                <ItemNav title="Dashboard" route="/" />
                <ItemNav title="Attendance History" route="/attendance-history" />
                <ItemNav title="Update Profile" route="/update-profile" />
                <LogOutButton />
            </div>
        </div>
    )
}

function ItemNav({ title, route }) {
    return (
        <div>
            <button onClick={() => window.location.href = route} className="w-full px-4 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block bg-teal-500 hover:bg-teal-600 mb-2" >
                {title}
            </button>
        </div>
    )
}

function LogOutButton() {

    const handleLogout = () => {
        new AuthServices().logout().then(ress => {
            if(ress.success)
            {
                localStorage.removeItem('token');
                localStorage.removeItem('auth');
                window.location.href = '/';
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('auth');
                window.location.href = '/';
            }
        })
    }

    return (
        <div>
            <button onClick={() => handleLogout()} className="w-full px-4 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block bg-orange-600 hover:bg-orange-800 mb-2" >
                Log Out
            </button>
        </div>
    )
}

export default Navigation;