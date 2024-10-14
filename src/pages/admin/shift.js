import * as React from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationAdmin from '../../components/admin/navigation';
import ShiftServicesAdmin from '../../services/admin/shiftServices';
import moment from 'moment';


function ShiftAdmin() {
    var [page, setPage] = React.useState(1);
    var [perPage, setTotalPages] = React.useState(10);
    var [totalPages, setTotalPages] = React.useState(0);
    var [data, setAttendances] = React.useState([]);

    var [modalAddShift, showModalAddShift] = React.useState(false);
    var [itemDetail, setItemDetail] = React.useState({});
    var [modalDetail, setModalDetail] = React.useState(false);

    var [timezones, setTimezones] = React.useState([]);
    // add shift
    var [name, setName] = React.useState('');
    var [startTime, setStartTime] = React.useState('08:00:00');
    var [endTime, setEndTime] = React.useState('16:00:00');
    var [location, setLocation] = React.useState('');
    var [timezone, setTimezone] = React.useState('Asia/Jakarta');
    var [longitude, setLongitude] = React.useState('');
    var [latitude, setLatitude] = React.useState('');
    var [desc, setDesc] = React.useState('');

    React.useEffect(() => {
        getTimeZone();
        getAttendances();
    }, [page]);

    const getTimeZone = () => {
        const availableTimezones = Intl.supportedValuesOf('timeZone');
        setTimezones(availableTimezones);
    };


    const getAttendances = () => {

        new ShiftServicesAdmin().getShifts({ page: page, limit: perPage }).then(ress => {
            if (ress.success) {
                setAttendances(ress.data.data);
                setTotalPages(ress.data.totalPage)
            }
        })
    }

    const handleAddShift = () => {
        var body = {
            name: name,
            start_time: startTime,
            end_time: endTime,
            location: location,
            timezone: timezone,
            longitude: longitude,
            latitude: latitude,
            desc: desc,
        }

        new ShiftServicesAdmin(body).addShift(ress => {
            if (ress.success) {
                window.location.href = '/shift';
            }
        })
    }

    var arrayPages = [];

    for (let i = 0; i < totalPages; i++) {
        arrayPages.push('-');
    }

    return (
        <div className="flex h-[100vh]">
            <ToastContainer />
            <NavigationAdmin />
            <div className="w-4/5 p-4 h-[100vh]" >
                <h3 className='font-bold text-3xl' >Shift</h3>
                <div className='mt-4 h-3/4' >
                    <div className='flex flex-row mb-2'>
                        <button onClick={() => showModalAddShift(true)} className="w-[100px] ms-1 px-2 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block bg-teal-500 hover:bg-teal-600 mb-2" >
                            Add Shift
                        </button>
                    </div>
                    <table class="flex w-full flex-col h-full overflow-y-scroll overflow-x-scroll table-auto divide-y divide-gray-200 dark:divide-neutral-700">
                        <thead className='w-full' >
                            <tr className='w-full flex flex-row' >
                                <th className="py-3 w-1/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500" >No</th>
                                <th className="py-3 w-2/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >Shift Name</th>
                                <th className="py-3 w-2/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >Location</th>
                                <th className=" py-3 w-4/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >Start Time</th>
                                <th className="py-3 w-4/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >End Time</th>
                            </tr>
                        </thead>
                        <tbody className='w-full' >
                            {data.map((item, index) => {
                                var no = (index + 1) + ((page - 1) * perPage)
                                return (<tr
                                    onClick={() => {
                                        setModalDetail(true)
                                        setItemDetail(item)
                                    }}
                                    className="w-full flex flex-row cursor-pointer odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800" >
                                    <td className="w-1/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200" >{no}</td>
                                    <td className="w-2/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 " >{item.name || '-'}</td>
                                    <td className="w-2/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 " >{item.location || '-'}</td>
                                    <td className="w-4/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200" >{item.start_time}</td>
                                    <td className="w-4/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200" >{item.end_time}</td>

                                </tr>)
                            })}
                        </tbody>
                    </table>
                    <br />
                    <div className='flex items-center justify-center' >
                        <button
                            className="mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setPage(page != 1 ? page - 1 : 1)
                            }}
                        >
                            prev page
                        </button>
                        {totalPages < 10 &&
                            arrayPages.map((item, index) => {
                                if (page == index + 1) {
                                    return <button
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                        style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                } else {
                                    return <button
                                        className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                        style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                }
                            })
                        }
                        {(totalPages > 10 && totalPages < 12 && page <= 5) &&
                            <div className='flex flex-row' >
                                {['', '', '', '', '', ''].map((item, index) => {
                                    if (page == index + 1) {
                                        return <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                    } else {
                                        return <button
                                            className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                    }
                                })}
                                <p className='text-bold text-xl' style={{ marginLeft: 5 }} >...</p>
                                <button
                                    className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                    style={{ marginLeft: 5 }} onClick={() => setPage(totalPages)} >{totalPages}</button>
                            </div>
                        }
                        {(totalPages > 10 && totalPages < 12 && page > 5) &&
                            <div className='flex flex-row' >
                                <button
                                    className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                    style={{ marginLeft: 5 }} onClick={() => setPage(1)} >{1}</button>
                                <p className='text-bold text-xl' style={{ marginLeft: 5 }} >...</p>
                                {['', '', '', '', '', '', ''].map((item, index) => {
                                    if (page == 5 + index) {
                                        return <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: 5 }} onClick={() => setPage(5 + index)} >{5 + index}</button>
                                    } else {
                                        return <button
                                            className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: 5 }} onClick={() => setPage(5 + index)} >{5 + index}</button>
                                    }
                                })}
                            </div>
                        }
                        {/* {(totalPages > 11 && page <= 5) &&
                            <div className='flex flex-row' >
                                {['', '', '', '', '', ''].map((item, index) => {
                                    if (page == index + 1) {
                                        return <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                    } else {
                                        return <button
                                            className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                    }
                                })}
                                <p className='text-bold text-xl' style={{ marginLeft: 5 }} >...</p>
                                {['', '', '',].map((item, index) => {
                                    if (page == index + 1) {
                                        return <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                    } else {
                                        return <button
                                            className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                    }
                                })}
                                <p className='text-bold text-xl' style={{ marginLeft: 5 }} >...</p>
                                {['', '', '', '', '', ''].map((item, index) => {
                                    if (page == index + 1) {
                                        return <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                    } else {
                                        return <button
                                            className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                    }
                                })}
                            </div>
                        } */}
                        <button className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setPage(page != totalPages ? page + 1 : 1)
                            }}
                        >
                            next page
                        </button>
                    </div>
                </div>
            </div>
            {/* modal detail */}
            <Modal
                isOpen={modalDetail}
                style={modalDetailStyles}
            >
                <div className='overflow-y-scroll h-[500px] p-5' >
                    <button className='self-end absolute top-2 right-2' onClick={() => setModalDetail(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                        </svg>
                    </button>
                    <h3 className='font-bold text-3xl' >Detail</h3>
                    <br />
                    <input disabled value={"Shift Name: " + itemDetail?.name} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Shift" />
                    <input disabled value={"Location: " + itemDetail.location + ' (' + itemDetail.latitude + ',' + itemDetail.longitude + ')'} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="check out location" />
                    <h3 className='text-bold text-xl py-2' >Check In</h3>
                    <input disabled value={(" at " + itemDetail?.start_time + ' (' + itemDetail.timezone + ')')} className="mt-1 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="check in date" />
                    <h3 className='text-bold text-xl py-2' >Check Out</h3>
                    <input disabled value={" at " + itemDetail?.end_time + ' (' + itemDetail.timezone + ')'} className="mt-1 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="check out date" />
                </div>
            </Modal>
            {/* modal add shift */}
            <Modal
                isOpen={modalAddShift}
                style={modalDetailStyles}
            >
                <div className='overflow-y-scroll h-[500px] p-5' >
                    <button className='self-end absolute top-2 right-2' onClick={() => showModalAddShift(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                        </svg>
                    </button>
                    <h3 className='font-bold text-3xl' >Add Shift</h3>
                    <br />
                    <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Name" />
                    <input value={startTime} type="time" onChange={(e) => setStartTime(e.target.value)} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="start time" />
                    <input value={endTime} type="time" onChange={(e) => setEndTime(e.target.value)} className="mt-1 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="location" />
                    <input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="location" />
                    <input value={latitude} onChange={(e) => setLatitude(e.target.value)} className="mt-1 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="latitude" />
                    <input value={longitude} onChange={(e) => setLongitude(e.target.value)} className="mt-1 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="longitude" />
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="mt-1 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="description" />
                    <div className='ms-1' >
                        <p>Timezone:</p>
                        <select defaultValue={''} id="shift" onChange={(e) => setTimezone(e.target.value)} className="mt-1 bg-gray-50 w-[200px] mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={""}>-- Select Timezone --</option>
                            {timezones.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                    <button onClick={() => handleAddShift()} className="w-full mt-2 ms-1 px-2 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block bg-teal-500 hover:bg-teal-600 mb-2" >
                        Add Shift
                    </button>
                </div>
            </Modal>
        </div>
    )
}

const modalDetailStyles = {
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

export default ShiftAdmin;