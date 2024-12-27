import { ArrowRightOutlined, PlusSquareOutlined, ProjectOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import SubTopBar from '../../TopBar/SubTopBar';
import Buttons_1 from '../../Buttons/Buttons_1';
import AddProject from './AddProject';
import ProjectFullTable from './ProjectFullTable';

function Projects() {
  const [activePopup, setActivePopup] = useState(null);

  const handleAddProjectClick = () => {
    setActivePopup('addProject');
  };

  const closePopup = () => {
    setActivePopup(null);
  };
  

  return (
    <>
      <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
        <SubTopBar icon={<ProjectOutlined />} name="Project" secondname="Projects" arrow={<ArrowRightOutlined className='size-3' />} />
      </div>
      <div className='ml-5 absolute left-[15%] top-28 w-[85%]'>
        <div className="left-[15%] top-28 flex gap-5">
          <Buttons_1
            name="Add New Project"
            bgColor="bg-custom-blue"
            icon={<PlusSquareOutlined />}
            onClick={handleAddProjectClick}
          />
        </div>
        {activePopup === 'addProject' && (
          <AddProject onClose={closePopup} />
        )}
        <div className="left-[15%] top-40 m-0 w-[95%] h-full bg-cyan-200">
          <div className='flex text-center gap-1 my-4'>
            <ProjectOutlined className='size-6' />
            <p className="text-base font-average ">Project List</p>
          </div>
          <hr className="bg-black border-0 h-[3px] my-2" />
          <ProjectFullTable />
        </div>

      </div>
    </>
  );
}

export default Projects;
