import { ProductType } from 'features/Product/interface'

export const initValue = {
  name: '',
  type: 'laptop' as ProductType,
  brand: '',
  subBrand: '',
  price: '',
  isSale: false,
  images: [],
  quantity: '',
}

const cpuDropDown = {
  id: 'cpu',
  name: 'CPU',
  items: [
    {
      name: 'Intel Dual Core',
      value: 'intel dual core',
      checked: false,
    },
    {
      name: 'Intel Core i3',
      value: 'intel core i3',
      checked: false,
    },
    {
      name: 'Intel Core i5',
      value: 'intel core i5',
      checked: false,
    },
    {
      name: 'Intel Core i7',
      value: 'intel core i7',
      checked: false,
    },
    {
      name: 'Intel Core i9',
      value: 'intel core i9',
      checked: false,
    },
    {
      name: 'Intel Xeon',
      value: 'intel xeon',
      checked: false,
    },
    {
      name: 'AMD Ryzen 3',
      value: 'amd ryzen 3',
      checked: false,
    },
    {
      name: 'AMD Ryzen 5',
      value: 'amd ryzen 5',
      checked: false,
    },
    {
      name: 'AMD Ryzen 7',
      value: 'amd ryzen 7',
      checked: false,
    },
  ],
}
const ramDropDown = {
  id: 'ram',
  name: 'RAM',
  items: [
    {
      name: '4 GB',
      value: '4gb',
      checked: false,
    },
    {
      name: '8 GB',
      value: '8gb',
      checked: false,
    },
    {
      name: '12 GB',
      value: '12gb',
      checked: false,
    },
    {
      name: '16 GB',
      value: '16gb',
      checked: false,
    },
    {
      name: '20 GB',
      value: '20gb',
      checked: false,
    },
    {
      name: '32 GB',
      value: '32gb',
      checked: false,
    },
    {
      name: '64 GB',
      value: '64gb',
      checked: false,
    },
    {
      name: '128 GB',
      value: '128gb',
      checked: false,
    },
  ],
}
const hardDriveDropDown = {
  id: 'hardDrive',
  name: 'Ổ cứng',
  items: [
    {
      name: 'SSD',
      value: 'ssd',
      checked: false,
    },
    {
      name: 'HDD',
      value: 'hdd',
      checked: false,
    },
  ],
}
const hardDriveNumberDropDown = {
  id: 'hardDriveNumber',
  name: 'Số ổ cứng hỗ trợ',
  items: [
    { name: '1', value: '1', checked: false },
    { name: '2', value: '2', checked: false },
    { name: '3', value: '3', checked: false },
    { name: '4', value: '4', checked: false },
    { name: '5', value: '5', checked: false },
  ],
}
const monitorRatioDropDown = {
  id: 'monitorRatio',
  name: 'Tỉ lệ màn hình',
  items: [
    { name: '16:9', value: '16:9', checked: false },
    { name: '16:10', value: '16:10', checked: false },
    { name: '3:2', value: '3:2', checked: false },
  ],
}
const monitorBackgroundDropDown = {
  id: 'monitorBackground',
  name: 'Tấm nền màn hình',
  items: [
    {
      name: 'IPS',
      value: 'ips',
      checked: false,
    },
    {
      name: 'TN',
      value: 'tn',
      checked: false,
    },
    {
      name: 'OLED',
      value: 'oled',
      checked: false,
    },
  ],
}
const frequencyDropDown = {
  id: 'frequency',
  name: 'Tần số quét',
  items: [
    {
      name: '60 Hz',
      value: '60 hz',
      checked: false,
    },
    {
      name: '75 Hz',
      value: '75 hz',
      checked: false,
    },
    {
      name: '120 Hz',
      value: '120 hz',
      checked: false,
    },
  ],
}
const resolutionDropDown = {
  id: 'resolution',
  name: 'Độ phân giải',
  items: [
    {
      name: '1366 x 768 (HD)',
      value: '1366 x 768 (hd)',
      checked: false,
    },
    {
      name: '1600 x 900 (HD+)',
      value: '1600 x 900 (hd+)',
      checked: false,
    },
    {
      name: '1920 x 1080 (FHD)',
      value: '1920 x 1080 (fhd)',
      checked: false,
    },
    {
      name: '1920 x 1200 (FHD+)',
      value: '1920 x 1200 (fhd+)',
      checked: false,
    },
    {
      name: '2560 x 1440 (2K)',
      value: '2560 x 1440 (2k)',
      checked: false,
    },
    {
      name: '3840 x 2160 (4K)',
      value: '3840 x 2160 (4k)',
      checked: false,
    },
    {
      name: '3840 x 2400 (4K+)',
      value: '3840 x 2400 (4k+)',
      checked: false,
    },
    {
      name: '3072 x 1920 (3K)',
      value: '3072 x 1920 (3k)',
      checked: false,
    },
    {
      name: '3000 x 2000 (3K)',
      value: '3000 x 2000 (3k)',
      checked: false,
    },
    {
      name: '2256 x 1504 (2K)',
      value: '2256 x 1504 (2k)',
      checked: false,
    },
    {
      name: '2560 x 1600 (2K)',
      value: '2560 x 1600 (2k)',
      checked: false,
    },
  ],
}
const graphicsCardDropDown = {
  id: 'graphicsCard',
  name: 'Card đồ họa',
  items: [
    {
      name: 'Intel HD',
      value: 'intel hd',
      checked: false,
    },
    {
      name: 'Intel Iris',
      value: 'intel iris',
      checked: false,
    },
    {
      name: 'Nvidia Geforce',
      value: 'nvidia geforce',
      checked: false,
    },
    {
      name: 'Nvidia Quadro',
      value: 'nvidia quadro',
      checked: false,
    },
    {
      name: 'AMD Radeon',
      value: 'amd radeon',
      checked: false,
    },
    {
      name: 'AMD FirePro',
      value: 'amd firepro',
      checked: false,
    },
  ],
}
const graphicsMemoryDropDown = {
  id: 'graphicsMemory',
  name: 'Bộ nhớ đồ họa',
  items: [
    { name: '2 Gb', value: '2 gb', checked: false },
    { name: '3 Gb', value: '3 gb', checked: false },
    { name: '4 Gb', value: '4 gb', checked: false },
    { name: '6 Gb', value: '6 gb', checked: false },
    { name: '8 Gb', value: '8 gb', checked: false },
    { name: '16 Gb', value: '16 gb', checked: false },
  ],
}
const accessoryTypeDropDown = {
  id: 'accessoryType',
  name: 'Loại phụ kiện',
  items: [
    {
      name: 'WIN',
      value: 'win',
      checked: false,
    },
    {
      name: 'RAM',
      value: 'ram',
      checked: false,
    },
    {
      name: 'Capture',
      value: 'capture',
      checked: false,
    },
    {
      name: 'EGPU',
      value: 'egpu',
      checked: false,
    },
    {
      name: 'Caddy Bay',
      value: 'caddy bay',
      checked: false,
    },
    {
      name: 'Chuột',
      value: 'chuột',
      checked: false,
    },
    {
      name: 'Router',
      value: 'router',
      checked: false,
    },
    {
      name: 'HDD',
      value: 'hdd',
      checked: false,
    },
    {
      name: 'SSD',
      value: 'ssd',
      checked: false,
    },
    {
      name: 'Balo',
      value: 'balo',
      checked: false,
    },
    {
      name: 'Wwan',
      value: 'wwan',
      checked: false,
    },
    {
      name: 'Sạc',
      value: 'sạc',
      checked: false,
    },
  ],
}

export const listDetail = [
  cpuDropDown,
  ramDropDown,
  hardDriveDropDown,
  hardDriveNumberDropDown,
  monitorRatioDropDown,
  monitorBackgroundDropDown,
  frequencyDropDown,
  resolutionDropDown,
  graphicsCardDropDown,
  graphicsMemoryDropDown,
  accessoryTypeDropDown,
]
