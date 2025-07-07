import Swal from "sweetalert2";

export const toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    customClass: {
        popup: "c-toast",
    },
    timer: 3000,
    timerProgressBar: false,
})

export default Swal.mixin({
    heightAuto: false,
    customClass: {
        popup: "c-swal",
    },
})
