import { CiCreditCard1 } from "react-icons/ci";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GiAutoRepair } from "react-icons/gi";
import { IoCardOutline } from "react-icons/io5";
import { RiCoinsFill } from "react-icons/ri";
import { AiOutlineFileProtect } from "react-icons/ai";


export const navigateList = [
    {
        id: 1,
        icon: <CiCreditCard1 />,
        label: 'Tự Build PC theo ý của bạn',
        link: '/pages'
    },
    {
        id: 2,
        icon: <HiOutlineClipboardDocumentList />,
        label: 'Tin công nghệ',
        link: '/pages/chinh-sach-bao-mat'

    },
    {
        id: 3,
        icon: <GiAutoRepair />,
        label: 'Dịch vụ sửa chữa',
        link: '/pages/chinh-sach-bao-mat'

    },
    {
        id: 4,
        icon: <IoCardOutline />,
        label: 'Dịch vụ kỹ thuật tại nhà',
        link: '/pages/chinh-sach-bao-mat'

    },
    {
        id: 5,
        icon: <RiCoinsFill />,
        label: 'Điều khoản dịch vụ',
        link: '/pages/dieu-khoan-dich-vu'

    },
    {
        id: 6,
        icon: <AiOutlineFileProtect />,
        label: 'Chính sách bảo mật',
        link: '/pages/chinh-sach-bao-mat'

    },
]