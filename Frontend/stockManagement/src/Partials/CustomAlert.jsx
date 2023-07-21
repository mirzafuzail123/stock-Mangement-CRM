import Swal from 'sweetalert2'
import 'animate.css';
import Success from '../assets/Success.gif'
import ErrorLogo from '../assets/ErrorLogo.gif'

export default function CustomAlert(message, type) {


    if (type === 'success') {
        var Logo = Success
    }
    else if (type === 'error') {
        var Logo = ErrorLogo
    }


    Swal.fire({
        html: `
        <div class="flex space-x-4 space items-center h-20 overflow-hidden ">
        <span class="border-r-2 border-gray-100 px-2">
        <img src=${Logo} class="w-12  bg-slate-700 " />
        </span>
        
          <div class="flex flex-col   ">
            <p class="whitespace-nowrap text-sm tracking-wide font-semibold">${message}</p>
          </div>
        </div>
      `,
        position: 'top-end',
        width: 'auto',
        showConfirmButton: false,
        padding: '0rem 0rem 0rem',
        customClass: {
            htmlContainer: 'my-swal-container',
        },
        showClass: {
            popup: 'animate__animated animate__fadeInRight animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
        },

    })

}
