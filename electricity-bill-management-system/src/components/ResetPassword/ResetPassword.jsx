import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebase.config";
import Swal from "sweetalert2";
const auth = getAuth(app);
const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleResetPassword = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Password reset email sent successfully",
                showConfirmButton: false,
                timer: 3500
              });
              navigate(location?.state ? location.state : "/login", {
                replace: true,
              });
        })
        .catch()
    }
    return (
<div className="bg-[#f6b7a1] m-4">
      <form onSubmit={handleResetPassword} className="card-body">
        <h1 className="text-center text-2xl text font-bold text-white pb-2">
          Reset Password
        </h1>
        <div className="form-control">
          <input
            type="email"
            name="email"
            placeholder="Enter your IIT ISM email *"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control text-center mt-6">
          <button className="btn btn-primary bg-amber-900 border-none text-white text-xl">
            Submit
          </button>
        </div>
        <p className="text-center">
          New to this portal? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="text-center">
          <Link to="/login">Log in now</Link>
        </p>
      </form>
    </div>
    );
};

export default ResetPassword;