import avatar from "/icons/avatar.svg";
import { useAppSelector } from "../../store/hooks";

function ProfileContainer() {
  const user = useAppSelector((state) => state.auth.user);
  const userAvatar = user?.avatar
    ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${user.avatar.startsWith('/') ? '' : '/'}${user.avatar}`
    : avatar;

  return (
    <div className="flex flex-col gap-2 absolute left-0 right-0 top-0 -translate-y-1/2  w-full items-center justify-center">
      <div className="aspect-square w-25 h-25 max-w-50 p-1 mx-auto  bg-slate-100 dark:bg-slate-800 rounded-xl">
        <img
          src={userAvatar}
          alt="avatar image"
          className="w-full h-full object-cover rounded-xl "
        />
      </div>
      <div className="text-center">
        <h4 className="text-[18px] font-bold">{user?.name || user?.firstName || "Tasky User"}</h4>
        <p className="text-[12px] text-brand-primary-600 dark:text-brand-primary-400">{user?.email || "No email provided"}</p>
      </div>
    </div>
  )
}

export default ProfileContainer