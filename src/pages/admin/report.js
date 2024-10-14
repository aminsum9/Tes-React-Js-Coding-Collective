import * as React from 'react';
import Navigation from '../../components/user/navigation';
import Modal from 'react-modal';
import { IMAGE_URL } from '../../config/url';
import AttendanceServices from '../../services/user/attendanceServices';
import Webcam from 'react-webcam';
import moment from 'moment';
import ShiftServices from '../../services/user/shiftServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationAdmin from '../../components/admin/navigation';
import ReportServices from '../../services/admin/reportServices';
import { BASE_URL } from "../../config/url"


function ReportAdmin() {
    var [timezones, setTimezones] = React.useState([]);

    var [startDate, setStartDate] = React.useState(moment(new Date).format('YYYY-MM-DD'));
    var [endDate, setEndDate] = React.useState(moment(new Date).format('YYYY-MM-DD'));
    var [timezone, setTimezone] = React.useState('');
    var [convertTimezone, setConvertTimezone] = React.useState('');
    var [data, setData] = React.useState([]);

    React.useEffect(() => {
        getTimeZone()
    }, []);

    React.useEffect(() => {
        getReport();
    }, [startDate, endDate, timezone, convertTimezone]);

    const getTimeZone = () => {
        const availableTimezones = Intl.supportedValuesOf('timeZone');
        setTimezones(availableTimezones);
    };

    const getReport = () => {

        var body = {
            start_date: startDate,
            end_date: endDate,
            timezone: timezone,
            convertTimezone: convertTimezone
        }

        new ReportServices().report(body).then(ress => {
            if (ress.success) {
                setData(ress.data.data);
            }
        })
    }

    const navToDownload = () => {
        var token = localStorage.getItem('token');

        window.open(BASE_URL + `report/download?start_date=${startDate}&end_date=${endDate}&timezone=${timezone}&convertTimezone=${convertTimezone}&token=${token}`, '_blank');
    }

    const selectStartDate = (date) => {
        setStartDate(date)
    }

    const selectEndDate = (date) => {
        setEndDate(date)
    }

    return (
        <div className="flex h-[100vh]">
            <ToastContainer />
            <NavigationAdmin />
            <div className="w-4/5 p-4">
                <h3 className='font-bold text-3xl' >Report</h3>
                <div className='flex flex-row w-full' >
                    <div className='h-3/4 w-full'>
                        <div className='flex flex-row mb-2'>
                            <div>
                                <h6>Start Date:</h6>
                                <div className="relative">
                                    <input value={startDate} onChange={(e) => selectStartDate(e.target.value)} datepicker type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                                </div>
                            </div>
                            <div className='ms-1' >
                                <h6>End Date:</h6>
                                <div className="relative">
                                    <input value={endDate} datepicker onChange={(e) => selectEndDate(e.target.value)} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                                </div>
                            </div>
                            <div className='ms-1' >
                                <p>Timezone:</p>
                                <select defaultValue={0} id="shift" onChange={(e) => setTimezone(e.target.value)} className="mt-1 bg-gray-50 w-[200px] mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={""}>-- Select Timezone --</option>
                                    {timezones.map((item, index) => {
                                        return <option key={index} value={item}>{item}</option>
                                    })}
                                </select>
                            </div>
                            <div className='ms-1' >
                                <p>Convert Timezone To:</p>
                                <select defaultValue={0} id="shift" onChange={(e) => setConvertTimezone(e.target.value)} className="mt-1 bg-gray-50 w-[250px] mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={""}>-- Select TimeZone --</option>
                                    {timezones.map((item, index) => {
                                        return <option key={index} value={item}>{item}</option>
                                    })}
                                </select>
                            </div>
                            <button onClick={() => navToDownload()} className="w-full px-4 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block bg-teal-500 hover:bg-teal-600 mb-2" >
                                Download
                            </button>
                        </div>
                        <div className='h-[500px] overflow-y-scroll w-full' >
                            {data.map((item, index) => {
                                return (
                                    <div>
                                        <div className="flex-row w-full ps-3 pt-3 pb-3 bg-blue-600 text-start text-xl font-medium text-white font-bold dark:text-neutral-500" >
                                            <p className='text-bold mb-0' >{item.name} ({item.email})</p>
                                            <p className='mb-0' ><span className='text-bold mb-0' >Total Attendances:</span> {item.totalAttendances}</p>
                                        </div>
                                        <br />
                                        {item.attendances.map((item, index) => {
                                            return (
                                                <div className='ms-5'>
                                                    <p className='text-m font-bold'>{index + 1}. {item?.shift?.name} ({item?.shift?.start_time} - {item?.shift?.end_time})</p>
                                                    <div className='ms-5' >
                                                        <p className="text-m">Check In: {moment(item.check_in_date).format('dddd, DD MMMM YYYY')} at {item.check_in_time} ({item.check_in_timezone})</p>
                                                        <p className="text-m" >Check Out: {moment(item.check_out_date).format('dddd, DD MMMM YYYY')} at {item.check_out_time} ({item.check_out_timezone})</p>
                                                        <p className="text-m" >Check In Location: {item?.check_in_location} ({item?.check_in_latitude},{item?.check_in_longitude})</p>
                                                        <p className="text-m" >Check Out Location: {item?.check_out_location} ({item?.check_out_latitude},{item?.check_out_longitude})</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportAdmin;