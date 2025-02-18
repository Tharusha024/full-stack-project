import { CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { toast } from 'react-hot-toast';

function ToastError({message}) {
    return toast.custom((t) => (
        <div className="flex items-center justify-start w-72 p-4 bg-red-500 text-white rounded-lg shadow-lg">
          <CloseCircleOutlined className="w-8 h-8 text-3xl text-white" />
          <span className="flex-1 text-lg font-subtop px-2">{message}</span>
        </div>
      ));
}

export default ToastError