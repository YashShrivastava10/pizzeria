const AuthLoader = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-full w-full bg-gradient-to-r from-amber-600 to-sky-800 flex justify-center items-center">
        <div className="rounded-full bg-white h-[325px] aspect-square sm:h-[400px] outline outline-[30px] outline-white/[.10] flex flex-col justify-center items-center gap-y-2 relative skeleton-auth">
        </div>
      </div>
    </div>
  )
}

export default AuthLoader