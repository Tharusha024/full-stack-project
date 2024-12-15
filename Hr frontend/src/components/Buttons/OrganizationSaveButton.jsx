import React from 'react'

function OrganizationSaveButton({name,icon,bgcolor}) {
  return (
    <div>
        <button className={`w-32 h-8 text-2xl font-average rounded-lg ${bgcolor}`}>{icon} {name}</button>
    </div>
  )
}

export default OrganizationSaveButton