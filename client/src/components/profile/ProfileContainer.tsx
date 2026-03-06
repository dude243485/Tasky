import avatar from "/icons/avatar.svg";

function ProfileContainer() {
  return (
    <div className="flex flex-col gap-2 absolute left-0 right-0 top-0 -translate-y-1/2  w-full items-center justify-center">
        <div className = "aspect-square w-25 h-25 max-w-50  mx-auto p-7 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <img 
            src = { avatar}
            alt = "avatar image"
            className = "w-full h-full object-cover rounded-xl "
            /> 
        </div>
        <div className="text-center">
            <h4 className="text-[18px] font-bold">Ude Daniel</h4>
            <p className="text-[12px] text-brand-primary-600 dark:text-brand-primary-400">danielude90@gmail.com</p>
        </div>
    </div>
  )
}

export default ProfileContainer