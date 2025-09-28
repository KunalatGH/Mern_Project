import React from 'react'
import { useSelector } from 'react-redux'
import { useResolvedPath } from 'react-router-dom'
import isAdmin from '../utils/isAdmin'
import { HiPaperClip } from 'react-icons/hi'

const AdminPermission = ({children}) => {
    const user = useSelector(state => state.user)
  return (
    <div>
      {
        isAdmin(user.role) ? children : <p className='text-red-600 bg-white p-4'>Do not have Permission</p>
      }
    </div>
  )
}

export default AdminPermission
