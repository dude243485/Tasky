import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router";
import { setCredentials } from "../../store/authSlice";

const CallbackPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const hasProcessed = useRef(false);

    useEffect(() => {
        // Guard against React 18 StrictMode double-mount in development
        if (hasProcessed.current) return;
        hasProcessed.current = true;

        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");

        if (!accessToken) {
            navigate("/signin?error=google_failed");
            return;
        }

        const user = {
            id: params.get("id") ?? "",
            email: params.get("email") ?? "",
            name: params.get("name") ?? "",
            firstName: params.get("firstName") ?? "",
            lastName: params.get("lastName") ?? "",
            avatar: params.get("avatar") ?? "",
        };

        localStorage.setItem("token", accessToken);
        dispatch(setCredentials({ accessToken, user }));
        navigate("/dashboard");
    }, [])

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-gray-500"> Signing you in...</p>
        </div>
    );

}

export default CallbackPage;