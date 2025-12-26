import { useRouter } from "next/navigation";

const useHandleLogout = () => {
    const router = useRouter();
    return () => {
        localStorage.removeItem("token");
        router.push("/login");
    }
};

export default useHandleLogout;