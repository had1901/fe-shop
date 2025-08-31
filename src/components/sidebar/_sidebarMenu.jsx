import { IoLaptopOutline } from "react-icons/io5";
import { MdLaptopMac } from "react-icons/md";
import { PiComputerTower } from "react-icons/pi";
import { PiGraphicsCardLight } from "react-icons/pi";
import { BsDisplay } from "react-icons/bs";
import { PiSpeakerHifiLight } from "react-icons/pi";
import { CiKeyboard } from "react-icons/ci";
import { PiMouseSimpleLight } from "react-icons/pi";
import { TfiHeadphone } from "react-icons/tfi";
import { PiOfficeChairLight } from "react-icons/pi";
import { GrCloudSoftware } from "react-icons/gr";
import { PiGameControllerLight } from "react-icons/pi";
import { PiGiftLight } from "react-icons/pi";


import banner1 from "~/assets/banner/b1.webp";
import banner2 from "~/assets/banner/b2.webp";
import banner3 from "~/assets/banner/b3.webp";
import banner4 from "~/assets/banner/b4.webp";
import banner5 from "~/assets/banner/b5.webp";
import SellerProduct from "../../pages/seller/SellerProduct";
import { listImgLaptopGaming, listImgLaptopOffice, listImgPC } from "../../pages/seller/_images";

export const menuItems = [
    {
        id: 1,
        icon: <IoLaptopOutline />,
        component: <SellerProduct category='laptop' album='laptop-office' promotionColor='#036ceb' listImg={listImgLaptopOffice} />,
        label: 'Laptop',
        href: 'laptop-van-phong',
        products: [
            {
                label: 'Thương hiệu',
                href: '/thuong-hieu',
                items: [
                    'ASUS',
                    'ACER',
                    'MSI',
                    'LENOVO',
                    'DELL',
                    'HP - Pavilion',
                    'LG - Gram'
                ]
            },
            {
                label: 'Giá bán',
                href: '/gia-ban',
                items: [
                    'Dưới 15 triệu',
                    'Từ 15 đến 20 triệu',
                    'Trên 20 triệu',
                ]
            },
            {
                label: 'CPU Intel - AMD',
                href: '/collections',
                items: [
                    'Intel Core i3',
                    'Intel Core i5',
                    'Intel Core i7',
                    'AMD Ryzen',
                ]
            },
            {
                label: 'Nhu cầu sử dụng',
                href: '/collections',
                items: [
                    'Đồ họa - Studio',
                    'Học sinh - Sinh viên',
                    'Mỏng nhẹ cao cấp',
                ]
            },
            {
                label: 'Linh phụ kiện Laptop',
                href: '/thuong-hieu',
                items: [
                    'Ram laptop',
                    'SSD laptop',
                    'Ổ cứng di động',
                ]
            },
            {
                label: 'Laptop ASUS',
                href: '/collections',
                items: [
                    'ASUS OLED Series',
                    'Vivobook Series',
                    'Zenbook Series',
                ]
            },
            {
                label: 'Laptop ACER',
                href: '/collections',
                items: [
                    'Aspire Series',
                    'Swift Series',
                ]
            },
            {
                label: 'Laptop MSI',
                href: '/collections',
                items: [
                    'Modern Series',
                    'Prestige Series',
                    'Summit Series',
                ]
            },
            {
                label: 'Laptop LENOVO',
                href: '/collections',
                items: [
                    'THinkBook Series',
                    'IdeaPad Series',
                    'IdeaPad Pro Series',
                    'ThinkPad Series',
                    'Yoga Series',
                ]
            },
            {
                label: 'Laptop DELL',
                href: '/collections',
                items: [
                    'Inspiron Series',
                    'Vostro Series',
                    'Latitude Series',
                    'XPS Series',
                ]
            },
        ]
    },
    {
        id: 2,
        icon: <MdLaptopMac />,
        component: <SellerProduct category='laptop' album='laptop-gaming' promotionColor='#cc1408' listImg={listImgLaptopGaming} />,
        label: 'Laptop Gaming',
        href: 'laptop-gaming',
        products: [
            {
                label: 'Thương hiệu',
                href: '/thuong-hieu',
                items: [
                    'ASUS / PREDATOR',
                    'ASUS / ROG',
                    'MSI',
                    'LENOVO',
                    'DELL',
                    'GIGABYTE / AORUS',
                    'HP'
                ]
            },
            {
                label: 'gía bán',
                href: '/gia-ban',
                items: [
                    'Dưới 20 triệu',
                    'Từ 20 đến 25 triệu',
                    'Từ 25 đến 30 triệu',
                    'Trên 30 triệu',
                    'DELL',
                    'Gaming cao cấp',
                    'Gaming RTX 40 Series',
                    'Gaming RTX 50 Series',
                ]
            },
            {
                label: 'ACER | PREDATOR',
                href: '/thuong-hieu',
                items: [
                    'Nitro Series',
                    'Aspire Series',
                    'Predator Series',
                    'LENOVO',
                    'ACER RTX 40 Series',
                    'ACER RTX 50 Series',
                ]
            },
            {
                label: 'ASUS | ROG Gaming',
                href: '/thuong-hieu',
                items: [
                    'ROG Series',
                    'TUF Series',
                    'Zephyrus Series',
                    'ROG Strix G',
                    'ROG Flow series',
                    'ROG Ally',
                ]
            },
            {
                label: 'MSI Gaming',
                href: '/thuong-hieu',
                items: [
                    'Titan GT Series',
                    'Stealth GS Series',
                    'Raider GE Series',
                    'Vector GP Series',
                    'Crosshair / Pulse GL Series',
                    'Sword / Katana GF66 Series',
                    'Cyborg / Thin GF Series',
                    'MSI RTX 50 Series',
                ]
            },
            {
                label: 'LENOVO Gaming',
                href: '/thuong-hieu',
                items: [
                    'Legion Gaming',
                    'LOQ series',
                ]
            },
            {
                label: 'DELL Gaming',
                href: '/thuong-hieu',
                items: [
                    'Dell Gaming G series',
                    'Alienware series',
                    'Dell RTX 40 Series',
                ]
            },
            {
                label: 'HP Gaming',
                href: '/thuong-hieu',
                items: [
                    'HP Victus',
                    'Hp Omen',
                ]
            },
            {
                label: 'Card đồ hoạ',
                href: '/thuong-hieu',
                items: [
                    'RTX 3050 / 3050Ti',
                    'RTX 3060',
                    'RTX 3070 / 3080',
                    'AMD Radeon RX',
                    'RTX 40 Series',
                    'RTX 50 Series',
                ]
            },
            {
                label: 'Linh - Phụ kiện Laptop',
                href: '/thuong-hieu',
                items: [
                    'Ram laptop',
                    'SSD laptop',
                    'Ổ cứng di động',
                ]
            },
        ]
    },
    {
        id: 3,
        icon: <PiComputerTower />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC} />,
        label: 'PC GVN',
        href: 'pc-gvn',
        products: [
            {
                label: 'KHUYẾN MÃI HOT',
                href: '/thuong-hieu',
                items: [
                    'PC RTX 5090',
                    'PC RTX 5080',
                    'PC GVN RTX 5070Ti',
                    'Thu cũ đổi mới VGA',
                ]
            },
            {
                label: 'PC KHUYẾN MÃI',
                href: '/thuong-hieu',
                items: [
                    'BTF i7 - 4070Ti Super',
                    'I5 - 4060',
                    'I5 - 4060Ti',
                    'PC RX 6600 - 12TR690',
                    'PC RX 6500 - 9TR990',
                ]
            },
            {
                label: 'PC theo cấu hình VGA',
                href: '/thuong-hieu',
                items: [
                    'PC sử dụng VGA 1650',
                    'PC sử dụng VGA 3050',
                    'PC sử dụng VGA 3060',
                    'PC sử dụng VGA RX 6600',
                    'PC sử dụng VGA RX 6500',
                ]
            },
            {
                label: 'PC theo cấu hình VGA',
                href: '/thuong-hieu',
                items: [
                    'PC sử dụng VGA 4060',
                    'PC sử dụng VGA 4070',
                    'PC sử dụng VGA 4080',
                    'PC sử dụng VGA 4090',
                    'Xem tất cả PC GVN',
                ]
            },
            {
                label: 'A.I PC - GVN',
                href: '/thuong-hieu',
                items: [
                    'PC GVN X ASUS - PBA',
                    'PC GVN X MSI',
                ]
            },
            {
                label: 'PC theo CPU Intel',
                href: '/thuong-hieu',
                items: [
                    'PC Core I3',
                    'PC Core I5',
                    'PC Core I7',
                    'PC Core I9',
                ]
            },
            {
                label: 'PC theo CPU Intel',
                href: '/thuong-hieu',
                items: [
                    'PC Ultra 7',
                    'PC Ultra 9',
                ]
            },
            {
                label: 'PC theo CPU AMD',
                href: '/thuong-hieu',
                items: [
                    'PC AMD R3',
                    'PC AMD R5',
                    'PC AMD R7',
                    'PC AMD R9',
                ]
            },
            {
                label: 'PC Văn phòng',
                href: '/thuong-hieu',
                items: [
                    'Homework Athlon - Giá chỉ 3.990k',
                    'Homework R3 - Giá chỉ 5,690k',
                    'Homework R5 - Giá chỉ 5,690k',
                    'Homework I5 - Giá chỉ 5,690k',
                ]
            },
            {
                label: 'Phần mềm bản quyền',
                href: '/thuong-hieu',
                items: [
                    'Window bản quyền - Chỉ từ 2.990K',
                    'Office 365 bản quyền - Chỉ từ 990K',
                ]
            },
        ]
    },
    {
        id: 8,
        icon: <BsDisplay />,
        component: <SellerProduct category='screen' album='screen' promotionColor='#824101' listImg={listImgLaptopOffice} />,
        label: 'Màn hình',
        href: 'man-hinh',
        products: [
            {
                label: 'Hãng sản xuất',
                href: '/thuong-hieu',
                items: [
                    'LG',
                    'Asus',
                    'ViewSonic',
                    'Dell',
                    'Gigabyte',
                    'AOC',
                    'Acer',
                    'HKC',
                ]
            },
            {
                label: 'Hãng sản xuất',
                href: '/thuong-hieu',
                items: [
                    'MSI',
                    'Lenovo',
                    'Samsung',
                    'Philips',
                    'E-Dra',
                    'Dahua',
                ]
            },
            {
                label: 'Giá tiền',
                href: '/thuong-hieu',
                items: [
                    'Dưới 5 triệu',
                    'Từ 5 triệu đến 10 triệu',
                    'Từ 10 triệu đến 20 triệu',
                    'Từ 20 triệu đến 30 triệu',
                    'Trên 30 triệu',
                ]
            },
            {
                label: 'Độ Phân giải',
                href: '/thuong-hieu',
                items: [
                    'Màn hình Full HD',
                    'Màn hình 2K 1440p',
                    'Màn hình 4K UHD',
                    'Màn hình 6K',
                ]
            },
            {
                label: 'Tần số quét',
                href: '/thuong-hieu',
                items: [
                    '60Hz',
                    '75Hz',
                    '100Hz',
                    '144Hz',
                    '240Hz',
                ]
            },
            {
                label: 'Màn hình cong',
                href: '/thuong-hieu',
                items: [
                    '24" Curved',
                    '27" Curved',
                    '32" Curved',
                    'Trên 32" Curved',
                ]
            },
            {
                label: 'Kích thước',
                href: '/thuong-hieu',
                items: [
                    'Màn hình 22"',
                    'Màn hình 24"',
                    'Màn hình 27"',
                    'Màn hình 29"',
                    'Màn hình 32"',
                    'Màn hình Trên 32"',
                    'Hỗ trợ giá treo (VESA)',
                ]
            },
            {
                label: 'Màn hình đồ họa',
                href: '/thuong-hieu',
                items: [
                    'Màn hình đồ họa 24""',
                    'Màn hình đồ họa 27"',
                    'Màn hình đồ họa 32"',
                ]
            },
            {
                label: 'Phụ kiện màn hình',
                href: '/thuong-hieu',
                items: [
                    'Giá treo màn hình',
                    'Phụ kiện dây HDMI,DP,LAN',
                ]
            },
            {
                label: 'Màn hình di động',
                href: '/thuong-hieu',
                items: [
                    'Full HD 1080p',
                    '2K 1440p',
                    'Có cảm ứng',
                ]
            },
            {
                label: 'Máy chiếu',
                href: '/thuong-hieu',
                items: [
                    'Máy chiếu Asus',
                    'Máy chiếu Beecube',
                    'Máy chiếu Wanbo',
                    'Máy chiếu ViewSonic',
                ]
            },
        ]
    },
    {
        id: 4,
        icon: <PiComputerTower />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Main, CPU, VGA',
        href: 'pc-gvn#',
        products: [
            {
                label: 'VGA RTX 50 SERIES',
                href: '/thuong-hieu',
                items: [
                    'RTX 5090',
                    'RTX 5080',
                    'RTX 5070Ti',
                    'RTX 5070',
                ]
            },
            {
                label: 'VGA (Trên 12 GB VRAM)',
                href: '/thuong-hieu',
                items: [
                    'RTX 4070Ti SUPER (16GB)',
                    'RTX 4070Ti SUPER (16GB)',
                    'RTX 4080 SUPER (16GB)',
                    'RTX 4090 SUPER (24GB)',
                ]
            },
            {
                label: 'VGA (Dưới 12 GB VRAM)',
                href: '/thuong-hieu',
                items: [
                    'RTX 4060Ti (8 - 16GB)',
                    'RTX 4060 (8GB)',
                    'RTX 3060 (12GB)',
                    'RTX 3050 (6 - 8GB)',
                    'GTX 1650 (4GB)',
                    'GT 710 / GT 1030 (2-4GB)',
                ]
            },
            {
                label: 'VGA - Card màn hình',
                href: '/thuong-hieu',
                items: [
                    'NVIDIA Quadro',
                    'AMD Radeon',
                ]
            },
            {
                label: 'Bo mạch chủ Intel',
                href: '/thuong-hieu',
                items: [
                    'Z890 (Mới)',
                    'Z790',
                    'B760',
                    'H610',
                    'X299X',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Bo mạch chủ AMD',
                href: '/thuong-hieu',
                items: [
                    'AMD X870 (Mới)',
                    'AMD X670',
                    'AMD X570',
                    'AMD B650 (Mới)',
                    'AMD B550',
                    'AMD A320',
                    'AMD TRX40',
                ]
            },
            {
                label: 'CPU - Bộ vi xử lý Intel',
                href: '/thuong-hieu',
                items: [
                    'CPU Intel Core Ultra Series 2 (Mới)',
                    'CPU Intel 9',
                    'CPU Intel 7',
                    'CPU Intel 5',
                    'CPU Intel 3',
                ]
            },
            {
                label: 'CPU - Bộ vi xử lý AMD',
                href: '/thuong-hieu',
                items: [
                    'CPU AMD Athlon',
                    'CPU AMD R3',
                    'CPU AMD R5',
                    'CPU AMD R7',
                    'CPU AMD R9',
                ]
            },
        ]
    },
    {
        id: 5,
        icon: <PiComputerTower />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Case, Nguồn, Tản',
        href: 'pc-gvn#',
        products: [
            {
                label: 'Case - Theo hãng',
                href: '/thuong-hieu',
                items: [
                    'Case ASUS',
                    'Case Corsair',
                    'Case Lianli',
                    'Case NZXT',
                    'Case Inwin',
                    'Case Thermaltake',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Case - Theo giá',
                href: '/thuong-hieu',
                items: [
                    'Dưới 1 triệu',
                    'Từ 1 triệu đến 2 triệu',
                    'Trên 2 triệu',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Nguồn - Theo Hãng',
                href: '/thuong-hieu',
                items: [
                    'Nguồn ASUS',
                    'Nguồ̀n DeepCool',
                    'Nguồn Corsair',
                    'Nguồn NZXT',
                    'Nguồn MSI',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Nguồn - Theo công suất',
                href: '/thuong-hieu',
                items: [
                    'Từ 400w - 500w',
                    'Từ 500w - 600w',
                    'Từ 700w - 800w',
                    'Trên 1000w',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Phụ kiện PC',
                href: '/thuong-hieu',
                items: [
                    'Dây LED',
                    'Dây rise - Dựng VGA',
                    'Giá đỡ VGA',
                    'Keo tản nhiệt',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Loại tản nhiệt',
                href: '/thuong-hieu',
                items: [
                    'Tản nhiệt AIO 240mm',
                    'Tản nhiệt AIO 280mm',
                    'Tản nhiệt AIO 360mm',
                    'Tản nhiệt AIO 420mm',
                    'Tản nhiệt khí',
                    'Fan RGB',
                    'Xem tất cả',
                ]
            },
            
        ]
    },
    {
        id: 6,
        icon: <PiGraphicsCardLight />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Ỏ cứng, RAM, Thẻ nhớ',
        href: 'pc-gvn#',
        products: [
            {
                label: 'Dung lượng RAM',
                href: '/thuong-hieu',
                items: [
                    '8 GB',
                    '16 GB',
                    '32 GB',
                    '64 GB',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Loại RAM',
                href: '/thuong-hieu',
                items: [
                    'DDR4',
                    'DDR5',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Hãng RAM',
                href: '/thuong-hieu',
                items: [
                    'Corsair',
                    'Kingston',
                    'G.Skill',
                    'PNY',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Dung lượng HDD',
                href: '/thuong-hieu',
                items: [
                    'HDD 1 TB',
                    'HDD 2 TB',
                    'HDD 4 TB - 6 TB',
                    'HDD trên 8 TB',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Hãng HDD',
                href: '/thuong-hieu',
                items: [
                    'WesterDigital',
                    'Seagate',
                    'Toshiba',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Dung lượng SSD',
                href: '/thuong-hieu',
                items: [
                    '120GB - 128GB',
                    '250GB - 256GB',
                    '480GB - 512GB',
                    '960GB - 1TB',
                    '2TB',
                    'Trên 2TB',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Hãng SSD',
                href: '/thuong-hieu',
                items: [
                    'Samsung',
                    'Wester Digital',
                    'Kingston',
                    'Corsair',
                    'PNY',
                    'Xem tất cả',
                ]
            },
            {
                label: 'Thẻ nhớ / USB',
                href: '/thuong-hieu',
                items: [
                    'Sandisk',
                ]
            },
            {
                label: 'Ổ cứng di động',
                href: '/thuong-hieu',
                items: []
            },
        ]
    },
    {
        id: 7,
        icon: <PiSpeakerHifiLight />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Loa, Micro, Webcam',
        href: 'pc-gvn#',
        products: [
            {
                label: 'Thương hiệu loa',
                href: '/thuong-hieu',
                items: [
                    'Edifier',
                    'Razer',
                    'Logitech',
                    'SoundMax',
                ]
            },
            {
                label: 'Kiểu Loa',
                href: '/thuong-hieu',
                items: [
                    'Loa vi tínhB',
                    'Loa Bluetooth',
                    'Loa Soundbar',
                    'Loa mini',
                    'Sub phụ (Loa trầm)',
                ]
            },
            {
                label: 'Webcam',
                href: '/thuong-hieu',
                items: [
                    'Độ phân giải 4k',
                    'Độ phân giải Full HD (1080p)',
                    'Độ phân giải 720p',
                ]
            },
            {
                label: 'Microphone',
                href: '/thuong-hieu',
                items: [
                    'Micro HyperX',
                ]
            },
        ]
    },
    {
        id: 9,
        icon: <CiKeyboard />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Bàn phím',
        href: 'ban-phim-may-tinh',
        products: [
            {
                label: 'Thương hiệu',
                href: '/thuong-hieu',
                items: [
                    'AKKO',
                    'AULA',
                    'Dare-U',
                    'Durgod',
                    'FL-Esports',
                    'Corsair',
                    'E-Dra',
                    'E-Cidoo',
                    'E-Machenike',
                ]
            },
            {
                label: 'Thương hiệu',
                href: '/thuong-hieu',
                items: [
                    'ASUS',
                    'Logitech',
                    'Razer',
                    'Leopold',
                    'Steelseries',
                    'Rapoo',
                    'VGN',
                ]
            },
            {
                label: 'Giá tiền',
                href: '/thuong-hieu',
                items: [
                    'Dưới 1 triệu',
                    '1 triệu - 2 triệu',
                    '2 triệu - 3 triệu',
                    '3 triệu - 4 triệu',
                    'Trên 4 triệu',
                ]
            },
            {
                label: 'Kết nối',
                href: '/thuong-hieu',
                items: [
                    'Bluetooth',
                    'Wireless',
                ]
            },
            {
                label: 'Phụ kiện bàn phím cơ',
                href: '/thuong-hieu',
                items: [
                    'Keycaps',
                    'Dwarf Factory',
                    'Kê tay',
                    'Leopold',
                    'Steelseries',
                    'Rapoo',
                    'VGN',
                ]
            },
        ]
    },
    {
        id: 10,
        icon: <PiMouseSimpleLight />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Chuột + Lót chuột',
        href: 'chuot-may-tinh',
        products: [
            {
                label: 'Thương hiệu loa',
                href: '/thuong-hieu',
                items: [
                    'Edifier',
                    'Razer',
                    'Logitech',
                    'SoundMax',
                ]
            },
        ]
    },
    {
        id: 11,
        icon: <TfiHeadphone />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Tai Nghe',
        href: 'tai-nghe-may-tinh',
        products: [
            {
                label: 'Thương hiệu loa',
                href: '/thuong-hieu',
                items: [
                    'Edifier',
                    'Razer',
                    'Logitech',
                    'SoundMax',
                ]
            },
        ]
    },
    {
        id: 12,
        icon: <PiOfficeChairLight />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Ghế - Bàn',
        href: 'ghe-gia-tot',
        products: [
            {
                label: 'Thương hiệu loa',
                href: '/thuong-hieu',
                items: [
                    'Edifier',
                    'Razer',
                    'Logitech',
                    'SoundMax',
                ]
            },
        ]
    },
    {
        id: 13,
        icon: <GrCloudSoftware />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Phần mềm, mạng',
        href: 'thiet-bi-mang',
        products: [
            {
                label: 'Thương hiệu loa',
                href: '/thuong-hieu',
                items: [
                    'Edifier',
                    'Razer',
                    'Logitech',
                    'SoundMax',
                ]
            },
        ]
    },
    {
        id: 14,
        icon: <PiGameControllerLight />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Handheld, Console',
        href: 'may-choi-game',
        products: [
            {
                label: 'Thương hiệu loa',
                href: '/thuong-hieu',
                items: [
                    'Edifier',
                    'Razer',
                    'Logitech',
                    'SoundMax',
                ]
            },
        ]
    },
    {
        id: 15,
        icon: <PiGameControllerLight />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Phụ kiện (Hub, sạc, cáp..)',
        href: 'phu-kien',
        products: [
            {
                label: 'Thương hiệu loa',
                href: '/thuong-hieu',
                items: [
                    'Edifier',
                    'Razer',
                    'Logitech',
                    'SoundMax',
                ]
            },
        ]
    },
    {
        id: 16,
        icon: <PiGiftLight />,
        component: <SellerProduct category='pc' album='pc-gaming' promotionColor='#3310b2' listImg={listImgPC}/>,
        label: 'Dịch vụ và thông tin khác',
        href: '',
        products: [
            {
                label: 'Thương hiệu loa',
                href: '/thuong-hieu',
                items: [
                    'Edifier',
                    'Razer',
                    'Logitech',
                    'SoundMax',
                ]
            },
        ]
    },
]


export const bannerListRight = [
    banner1,
    banner2,
    banner3,
    
]
export const bannerListLeft = [
    banner4,
    banner5,
]

// export const renderMenuItems = (menus) => {
    
//   }
