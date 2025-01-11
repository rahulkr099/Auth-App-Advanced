import { useState } from 'react';
import { requestResetPassword } from '../api/auth';
import { handleSuccess, handleError } from '../../utils';
import { ToastContainer } from 'react-toastify';

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestResetPassword(email);
      console.log('response in reset token',response);
      if (response.success) {
        setMessage(response.message);
        // handleSuccess(response.message);
        // setTimeout(()=>{
        //   if(response.url) {
        //     window.location.assign(response.url);
        //   }
        // },3000)
        setError('');
      } else {
        setError(response.message);
        handleError(response.message);
        setMessage('');
      }
    } catch (err) {
      handleError(`An error occurred. Please try again. ${err}`);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-slate-400">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
       {message && <p className="text-green-600">{message}</p>} 
       {error && <p className="text-red-600">{error}</p>} 
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold" htmlFor='email'>Email:</label>
          <input
            type="email"
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
            autoComplete='email'
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default ResetPasswordRequest;
