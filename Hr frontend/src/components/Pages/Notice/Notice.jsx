import { NotificationOutlined, PlusSquareOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import SubTopBar from '../../TopBar/SubTopBar';
import Buttons_1 from '../../Buttons/Buttons_1';
import NoticeTable from './NoticeTable';
import AddNotice from './AddNotice';

function Notice() {
    const [activePopup, setActivePopup] = useState(null);

    const handleAddNoticeClick = () => {
        setActivePopup('addNotice');
    };

    const closePopup = () => {
        setActivePopup(null);
    };

    return (
        <>
            <div className="absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200">
                <SubTopBar icon={<NotificationOutlined />} name="Notice" />
            </div>
            <div className="ml-5 absolute left-[15%] top-28 w-[85%]">
                <div className="flex gap-5">
                    <Buttons_1
                        name="Add New Notice"
                        bgColor="bg-custom-blue"
                        icon={<PlusSquareOutlined />}
                        onClick={handleAddNoticeClick}
                    />
                </div>
                {activePopup === 'addNotice' && (
                    <AddNotice onClose={closePopup} />
                )}
                <div className="m-0 w-[95%] h-full bg-cyan-200">
                    <div className="flex text-center gap-1 my-4">
                        <NotificationOutlined className="size-6" />
                        <p className="text-base font-average">Notices List</p>
                    </div>
                    <hr className="bg-black border-0 h-[3px] my-2" />
                    <NoticeTable />
                </div>
            </div>
        </>
    );
}

export default Notice;
