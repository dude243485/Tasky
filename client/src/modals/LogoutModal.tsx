import type { LucideIcon } from "lucide-react";
import PopupModal from "./PopupModal";
import BrandButton from "../components/buttons/BrandButton";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router";

interface LogoutModalProps {
    isOpen : boolean;
    onClose : () => void;
    icon : LucideIcon
}


const LogoutModal = ( {isOpen, onClose, icon} : LogoutModalProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const confirmLogout = () => {
        dispatch(logout());
        onClose;
        navigate('/signin');
      }

    return (
        
      <PopupModal
        isOpen={isOpen}
        onClose={onClose}
        icon={icon}
      >
        <div className="flex flex-col gap-4 mb-4 mt-8">
          <h3 className="font-bold text-[20px] text-center">Confirm Logout</h3>
          <p className="text-[12px] text-center">
            Are you sure you want to log out of your Tasky account? Your session will be terminated.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <BrandButton
            onClick={confirmLogout}
            variant="primary"
          >
            <p className="text-[14px]">Yes, Log Out</p>
          </BrandButton>

          <BrandButton
            onClick={onClose}
            variant="secondary"
          >
            <p className="text-[14px]">Cancel</p>
          </BrandButton>
        </div>
      </PopupModal>
    );
}

export default LogoutModal;