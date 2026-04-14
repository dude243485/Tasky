import type { ProfileItemProps } from "./ProfileItem"
import ProfileItem from "./ProfileItem"
interface ProfileItemsProps {
  items: ProfileItemProps[],
  label: string
}

function ProfileItems({ items, label }: ProfileItemsProps) {
  return (
    <div className="space-y-2 grow">
      <h3 className="text-[12px] font-semibold">{label}</h3>
      <div className="bg-slate-200 dark:bg-slate-800 p-5 rounded-xl">
        {items.map((item, index) => (
          <ProfileItem
            key={index}
            title={item.title}
            icon={item.icon}
            onClick={item.onClick}
          />
        ))}
      </div>

    </div>
  )
}

export default ProfileItems