import * as React from 'react';

function Register(){

    return(
        <div className="flex h-[100vh]">
            <div className="w-3/5 bg-[#4287f5]">
                {/*  */}
            </div>
            <div className='flex items-center justify-center w-2/5 text-center' >
                <div className='w-9/12 flex flex-col items-start'>
                    <h3 className='text-5xl font-bold mb-1'>Sign Up!</h3>
                    <p className='text-left mb-14' >Join Employee Attendance and check in for work attendance easily!</p>
                    <div className='w-full flex flex-col items-center justify-center mb-16'>
                        <div class="w-full max-w-sm min-w-[200px] items-center justify-center">
                            <input class="w-full mb-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Name" />
                            <input class="w-full mb-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Email" />
                            <input class="w-full mb-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Address" />
                            <input class="w-full mb-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Password" />
                            <input class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Password Confirmation" />
                        </div>
                    </div>
                    <button
                        class="w-full px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring">
                        Sign Up
                    </button>
                    <p className='text-left mt-3'>Already have account? <span className='ml-1' ><a className='text-yellow-600' href="/" >sign in</a></span></p>
                </div>
            </div>
        </div>
    )
}

export default Register;