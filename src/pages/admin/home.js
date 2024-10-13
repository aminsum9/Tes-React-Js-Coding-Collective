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

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function HomeAdmin() {
    var [data, setData] = React.useState({});
    var [shifts, setShifts] = React.useState([]);

    React.useEffect(() => {
        getShifts();
    }, []);


    const getShifts = () => {

        new ShiftServices().getShifts().then(ress => {
            if (ress.success) {
                setShifts(ress.data);
            }
        })
    }


    return (
        <div className="flex h-[100vh]">
             <ToastContainer />
            <NavigationAdmin />
            <div className="w-4/5 p-4">
                <h3 className='font-bold text-3xl' >Dashboard</h3>
                <div className='flex flex-row' >
                    {/*  */}
                </div>
            </div>
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

export default HomeAdmin;