import hide from "../../../../public/hide.png"
import show from "../../../../public/show.png"
import login from "../../../../public/login.png"
import Image from "next/image"

export const AuthForm = ({ status, user, handleUser, handleSubmit, passwordHidden, setPasswordHidden }) => {
  return (
    <form className="form-div" onSubmit={handleSubmit}>
      {status !== "signin" &&
        <div className="form-div">
          <input className="form-input name" id="name" name="name" value={user.name} type="text" placeholder="Name" required onChange={(e) => handleUser(e)} />
          <label className="label-name" htmlFor="name">Name</label>
        </div>}
      <div className="form-div">
        <input className="form-input email" id="mail" name="email" value={user.email} type="email" placeholder="Email" required onChange={(e) => handleUser(e)} />
        <label className="label-email" htmlFor="mail">Email</label>
      </div>
      <div className="form-div relative">
        <input className="form-input relative pass" id="pass" name="pass" value={user.pass} type={passwordHidden ? "password" : "text"} placeholder="Password" required onChange={(e) => handleUser(e)} />
        <label className="label-pass" htmlFor="pass">Password</label>
        <Image src={passwordHidden ? show : hide} id="pass-img" alt="Eye" height={20} width={20} className="absolute top-0 right-0" onClick={() => setPasswordHidden(!passwordHidden)} />
      </div>
      <button className="absolute bottom-4 sm:bottom-2 right-1 text-white bg-amber-500 shadow-lg rounded-full h-8 w-8 hover:bg-sky-800 hover:rounded transition-rounded duration-200 ease-in flex justify-center items-center" type="submit">
        <Image src={login} alt="X" height={20} width={20} />
      </button>
    </form>
  )
}