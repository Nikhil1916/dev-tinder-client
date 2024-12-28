import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((store:any)=>store?.user);
  console.log(user);
  return (
    <div className='p-2'>
     { user &&<EditProfile user={user} />}
    </div>
  )
}

export default Profile