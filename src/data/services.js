// data/services.js
export const services = [
  {
    id: 'cat-toc',
    title: 'Cắt tóc',
    price: '100.000VNĐ',
    description: 'Combo cắt gội thư giãn, tạo kiểu tóc phù hợp gương mặt.',
    combos: [
      {
        name: 'Cắt gội khoang thường gia',
        duration: '50 phút',
        image: 'https://link-image-1.jpg',
      },
      {
        name: 'Cắt gội Combo 1',
        duration: '45 phút',
        image: 'https://link-image-2.jpg',
      },
    ],
  },
  {
    id: 'uon-dinh-hinh',
    title: 'Uốn định hình',
    price: '379.000VNĐ',
    description: 'Uốn tóc nam định hình theo dáng mặt.',
    combos: [
      {
        name: 'Uốn xoăn layer',
        duration: '70 phút',
        image: 'https://link-image-3.jpg',
      },
    ],
  },
  {
    id: 'thay-doi-mau',
    title: 'Thay đổi màu tóc',
    price: '199.000VNĐ',
    description: 'Nhuộm tóc nam theo phong cách thời thượng.',
    combos: [
      {
        name: 'Nhuộm bạc khói',
        duration: '60 phút',
        image: 'https://link-image-4.jpg',
      },
    ],
  },
];
