import Swal from 'sweetalert2'

const swal = Swal.mixin({
  customClass: {
    confirmButton:
      'bg-green-400 hover:bg-green-500 text-white rounded-md transition-all py-2 px-4',
    cancelButton:
      'bg-red-400 hover:bg-red-500 text-white rounded-md transition-all py-2 px-4 ml-4',
  },
  buttonsStyling: false,
})

export default swal
