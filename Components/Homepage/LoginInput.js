import {HiOutlineLockClosed,HiOutlineEnvelope,HiOutlineEye,HiOutlineEyeSlash} from 'react-icons/hi2'

export default function LoginInput() {
  return (
    <div className={''}>
    <HiOutlineLockClosed/>
    <input type="password" placeholder="Enter your password"/>
    <button onClick={()=>setView(!view)}>{view ?<HiOutlineEyeSlash/> :<HiOutlineEye/>}</button>
  </div>
  )
}
