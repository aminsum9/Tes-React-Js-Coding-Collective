import * as React from 'react';
import Navigation from '../components/navigation';
import Modal from 'react-modal';
import { IMAGE_URL } from '../config/url';
import AttendanceServices from '../services/attendanceServices';
import Webcam from 'react-webcam';
import moment from 'moment';
import ShiftServices from '../services/shiftServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function Home() {
    var [data, setData] = React.useState({});
    var [shifts, setShifts] = React.useState([]);
    var [modalCheckIn, setModalCheckIn] = React.useState(false);
    var [modalCheckOut, setModalCheckOut] = React.useState(false);

    var [currentDate, setCurrentDate] = React.useState(moment(new Date).format("YYYY-MM-DD"));
    var [currentTime, setCurrentTime] = React.useState(moment(new Date).format("hh:mm:ss"));
    var [latitude, setLatitude] = React.useState(0);
    var [longitude, setLongitude] = React.useState(0);

    var [imageCheckIn, setImageCheckIn] = React.useState('');
    var [selectedShift, setSelectedShifts] = React.useState(0);
    var [location, setLocation] = React.useState('');
    var [desc, setDesc] = React.useState('');
    var [currentTimeZone, setCurrentTimeZone] = React.useState(0);

    var [imageCheckOut, setImageCheckOut] = React.useState('');
    var [locationCheckOut, setLocationCheckOut] = React.useState('');
    var [descCheckOut, setDescCheckOut] = React.useState('');

    React.useEffect(() => {
        getShifts();
        getMyLocation();
        getCurrentTimeZone();
        handleCheckTodayAttendance();
    }, []);

    const getCurrentTimeZone = () => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log("GMT Offset (in minutes): ", timeZone);
        setCurrentTimeZone(timeZone);
    }

    const getMyLocation = (e) => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state == 'granted') {

                        if (navigator.geolocation) {
                            const location = window.navigator && window.navigator.geolocation

                            if (location) {
                                location.getCurrentPosition((position) => {
                                    console.log("latitude: ", position.coords.latitude, "longitude: ", position.coords.longitude)

                                    setLatitude(position.coords.latitude)
                                    setLongitude(position.coords.longitude)
                                }, (error) => {
                                    alert("error occured when get current location!")
                                })
                            }
                        }
                    } else {
                        alert("please allow website to get your current location!")
                    }
                });
        } else {
            alert("Geolocation is not supported by this browser!")
        }
    }

    const getShifts = () => {

        new ShiftServices().getShifts().then(ress => {
            if (ress.success) {
                setShifts(ress.data);
            }
        })
    }

    const handleCheckTodayAttendance = () => {

        new AttendanceServices().checkAttendance().then(ress => {
            if (ress.success) {
                setData(ress.data);
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

    const handleCheckIn = () => {
        if(!imageCheckIn){
            toast("Photo required!")
            return;
        }
        if(!selectedShift){
            toast("Shift required!")
            return;
        }
        if(!location){
            toast("Location required!")
            return;
        }
        if(!longitude){
            toast("Longitude required!")
            return;
        }
        if(!latitude){
            toast("Latitude required!")
            return;
        }
        var fileImageCheckIn = dataURLtoFile(imageCheckIn,'check-in.jpg','image/jpg');

        var formData = new FormData();

        formData.append('photo',fileImageCheckIn)
        formData.append('shift_id',selectedShift)
        formData.append('date',currentDate)
        formData.append('check_in',currentTime)
        formData.append('location',location)
        formData.append('timezone',currentTimeZone)
        formData.append('longitude',longitude)
        formData.append('latitude',latitude)
        formData.append('desc',desc)

        new AttendanceServices().checkIn(formData).then(ress => {
            if(ress.success)
            {
                alert("Check In Success");
                window.location.href = '/'
            }
        })
    }

    const handleCheckOut = () => {
        if(!data.id){
            toast("attendance_id required!")
            return;
        }
        if(!imageCheckOut){
            toast("Image Check Out required!")
            return;
        }
        if(!data.shift_id){
            toast("Shift required!")
            return;
        }
        if(!locationCheckOut){
            toast("Location Check Out required!")
            return;
        }
        if(!longitude){
            toast("Longitude required!")
            return;
        }
        if(!latitude){
            toast("Latitude required!")
            return;
        }
        var fileImageCheckOut = dataURLtoFile(imageCheckOut,'check-out.jpg','image/jpg');

        var formData = new FormData();

        console.log("attendance id",data.id)

        formData.append('attendance_id',data.id)
        formData.append('photo',fileImageCheckOut)
        formData.append('shift_id',data.shift_id)
        formData.append('date',currentDate)
        formData.append('check_out',currentTime)
        formData.append('location',locationCheckOut)
        formData.append('timezone',currentTimeZone)
        formData.append('longitude',longitude)
        formData.append('latitude',latitude)
        formData.append('desc',descCheckOut)

        new AttendanceServices().checkOut(formData).then(ress => {
            if(ress.success)
            {
                alert("Check Out Success");
                window.location.href = '/'
            }
        })
    }


    return (
        <div className="flex h-[100vh]">
             <ToastContainer />
            <Navigation />
            <div className="w-4/5 p-4">
                <h3 className='font-bold text-3xl' >Today Attendance</h3>
                <div className='flex flex-row' >
                    {/* check in */}
                    {data.check_in_time ? (
                        <div className="flex-shrink-0 m-6 relative overflow-hidden bg-[#4287f5] rounded-lg max-w-xs shadow-lg group">
                            {data.check_in_photo && (
                                <div>

                                    <svg className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform"
                                        viewBox="0 0 375 283" fill="none" style={{ opacity: 0.1 }}>
                                        <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                                        <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                                    </svg>
                                    <div className="relative flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <div className="block absolute w-48 h-12 bottom-0 left-0 -mb-24 ml-3"
                                            style={{ background: "radial-gradient(black, transparent 60%)", transform: "rotate3d(0, 0, 1, 20deg)", opacity: 0.2 }}>
                                        </div>
                                        <img className="relative w-48 object-cover" src={`${IMAGE_URL + "check_in/" + data.check_in_photo}`} alt="" />
                                    </div>
                                </div>
                            )}
                            <div className="relative text-white px-6 pb-6 mt-6">
                                <div className="flex justify-center">
                                    <span className="block font-semibold text-xl">Already Checked In</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setModalCheckIn(true)} className="block mt-6 h-5 bg-[#4287f5] hover:bg-[#0a64f5] rounded-md  text-white text-xs font-bold px-5 py-4 leading-none flex items-center">Check In</button>
                    )}
                    {/* check out */}
                    {data.check_in_time && (
                        <div>
                            {data.check_out_time ? (
                                <div className="flex-shrink-0 m-6 relative overflow-hidden bg-[#4287f5] rounded-lg max-w-xs shadow-lg group">
                                    <div>
                                        <svg className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform"
                                            viewBox="0 0 375 283" fill="none" style={{ opacity: 0.1 }}>
                                            <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                                            <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                                        </svg>
                                        <div className="relative flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <div className="block absolute w-48 h-12 bottom-0 left-0 -mb-24 ml-3"
                                                style={{ background: "radial-gradient(black, transparent 60%)", transform: "rotate3d(0, 0, 1, 20deg)", opacity: 0.2 }}>
                                            </div>
                                            <img className="relative w-48 object-cover" src={`${IMAGE_URL + "check_out/" + data.check_out_photo}`} alt="" />
                                        </div>
                                    </div>
                                    <div className="relative text-white px-6 pb-6 mt-6">
                                        <div className="flex justify-center">
                                            <span className="block font-semibold text-xl">Already Checked Out</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button onClick={() => setModalCheckOut(true)} className="block ms-2 mt-6 h-5 bg-[#4287f5] hover:bg-[#0a64f5] rounded-md  text-white text-xs font-bold px-5 py-4 leading-none flex items-center">Check Out</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* modal check in */}
            <Modal
                isOpen={modalCheckIn}
                style={modalCheckAttendanceStyles}
            >
                <div className='overflow-y-scroll h-[600px] p-5' >
                    <button className='self-end absolute top-2 right-2' onClick={() => setModalCheckIn(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                        </svg>
                    </button>
                    <h3 className='font-bold text-3xl' >Check In</h3>
                    <br />
                    <Webcam
                        audio={false}
                        height={200}
                        screenshotFormat="image/jpeg"
                        width={400}
                        videoConstraints={videoConstraints}
                    >
                        {({ getScreenshot }) => (
                            <button
                                className="mt-3 px-3 py-1 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
                                onClick={() => {
                                    const imageSrc = getScreenshot()
                                    setImageCheckIn(imageSrc);
                                }}
                            >
                                Capture photo
                            </button>
                        )}
                    </Webcam>
                    <input disabled value={"Date: " + currentDate} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Date" />
                    <input disabled value={"Time: " + currentTime} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Time" />
                    <label htmlFor="shift" className="mt-2block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Shift</label>
                    <select defaultValue={0} id="shift" onChange={(e) => setSelectedShifts(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={0}>-- Select shift --</option>
                        {shifts.map((item, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>
                        })}
                    </select>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Location" />
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow h-[100px]" placeholder="Desctiption" />
                    <button
                        onClick={() => handleCheckIn()}
                        className="mt-2 w-full px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring">
                        Check In
                    </button>
                </div>
            </Modal>
              {/* modal check out */}
              <Modal
                isOpen={modalCheckOut}
                style={modalCheckAttendanceStyles}
            >
                <div className='overflow-y-scroll h-[600px] p-5' >
                    <button className='self-end absolute top-2 right-2' onClick={() => setModalCheckOut(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                        </svg>
                    </button>
                    <h3 className='font-bold text-3xl' >Check Out</h3>
                    <br />
                    <Webcam
                        audio={false}
                        height={200}
                        screenshotFormat="image/jpeg"
                        width={400}
                        videoConstraints={videoConstraints}
                    >
                        {({ getScreenshot }) => (
                            <button
                                className="mt-3 px-3 py-1 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
                                onClick={() => {
                                    const imageSrc = getScreenshot()
                                    setImageCheckOut(imageSrc);
                                }}
                            >
                                Capture photo
                            </button>
                        )}
                    </Webcam>
                    <input disabled value={"Date: " + currentDate} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Date" />
                    <input disabled value={"Time: " + currentTime} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Time" />
                    <label htmlFor="shift" className="mt-2block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Shift</label>
                    <select value={data.shift_id} disabled id="shift" onChange={(e) => {}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={0}>-- Select shift --</option>
                        {shifts.map((item, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>
                        })}
                    </select>
                    <input value={locationCheckOut} onChange={(e) => setLocationCheckOut(e.target.value)} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Location" />
                    <textarea value={descCheckOut} onChange={(e) => setDescCheckOut(e.target.value)} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow h-[100px]" placeholder="Desctiption" />
                    <button
                        onClick={() => handleCheckOut()}
                        className="mt-2 w-full px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring">
                        Check Out
                    </button>
                </div>
            </Modal>
        </div>
    )
}

const modalCheckAttendanceStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: 20,
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default Home;