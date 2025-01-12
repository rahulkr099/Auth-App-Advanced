
import {useGoogleLogin} from '@react-oauth/google'

const GoogleLogin = () => {

    const responseGoogle = async (authResult) =>{
        try {
            console.log('responsegoogle on success:',authResult)
        } catch (error) {
            console.error('responsegoogle on error:',error)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onEror: responseGoogle,
        flow: 'auth-code'
    })
  return (
    <div>
    <button onClick={googleLogin} className='border border-blue-500 mt-1 hover:text-white hover:bg-blue-400 p-1 rounded-lg bg-blue-400'>Login With Google</button>
    </div>
  )
}

export default GoogleLogin