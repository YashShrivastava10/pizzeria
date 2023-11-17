import { ToastContainer, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toast = () => {
  return <ToastContainer position="top-right"
  autoClose={2000}
  hideProgressBar
  newestOnTop={false}
  closeOnClick
  rtl={false}
  theme="light" />
}