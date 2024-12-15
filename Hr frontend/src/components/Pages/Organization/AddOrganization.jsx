import { ClearOutlined, CloseSquareOutlined, SaveOutlined } from '@ant-design/icons'
import React from 'react'
import OrganizationSaveButton from '../../Buttons/OrganizationSaveButton'

function AddOrganization(props) {
  return (
    <div className='w-[520px] bg-white px-3 py-3'>
    <p className='text-lg font-average font-bold'>Add {props.name}</p>
    <hr className="bg-blue-600 border-0 h-[2px] my-2"/>
    <p className='text-base font-subtop'>{props.name} Name</p>
    <input type="text" className='w-[490px] h-[35px] text-lg bg-custom-blue-2 rounded-md my-4' />
    <div className='flex gap-2' >
    <OrganizationSaveButton icon={<SaveOutlined />} name='Save' bgcolor='bg-custom-green'/>
    <OrganizationSaveButton icon={<CloseSquareOutlined />} name='Close' bgcolor='bg-custom-red'/>
    </div>
    </div>
  )
}

export default AddOrganization