import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home({ isLoggedIn }) {
  const [showBooking, setShowBooking] = useState(false);

  const handleShowBooking = () => {
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-4 shadow-md">
        <div className="text-xl font-bold text-blue-600 flex items-center">
          <img src="/logo.png" alt="TLap Logo" className="h-10 mr-2" />
          TLap
        </div>
        <nav className="hidden md:flex gap-6 text-gray-700">
          <a href="#" className="hover:text-blue-500">Trang chủ</a>
          <a href="#" className="hover:text-blue-500">Về TLap</a>
          <a href="#" className="hover:text-blue-500">Nhượng quyền</a>
          <a href="#" className="hover:text-blue-500">Đối tác</a>
          <a href="#" className="hover:text-blue-500">Nụ cười DV</a>
        </nav>
        <Link to="/login">
          <Button className="ml-4">Đăng nhập</Button>
        </Link>
      </header>

      {/* Hero Section with Large Carousel and Overlay Text */}
      <section className="relative">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={4000}
          showStatus={false}
          className="max-h-[600px]"
        >
          <div className="relative">
            <img
              src="https://i.ytimg.com/vi/L79A9cSyOWc/maxresdefault.jpg"
              alt="Hair Style 1"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-white text-center p-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  UỐN NHUỘM THIẾT KẾ<br /> PHỤC HỒI CHUYÊN SÂU<br /> LIPID BOND 2025
                </h2>
                <p className="text-lg md:text-xl">
                  3IN1: Tóc khoẻ trong mượt ngoài, tiết kiệm thời gian chọn kiểu và chăm sóc,<br /> sáng bừng ngũ quan - rộng đường tài lộc
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://wallpaperaccess.com/full/5730597.jpg"
              alt="Hair Style 2"
              className="w-full h-[600px] object-cover"
            />
          </div>
          <div className="relative">
            <img
              src="https://www.teahub.io/photos/full/110-1100052_top-10-hair-style-for-men.jpg"
              alt="Hair Style 3"
              className="w-full h-[600px] object-cover"
            />
          </div>
        </Carousel>
      </section>

      {/* Booking + Rating Section */}
      <section className="p-6 md:p-12 text-center">
        <div className="max-w-xl mx-auto">
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">ĐẶT LỊCH GIỮ CHỖ CHỈ 30 GIÂY</h3>
            <p className="text-sm text-gray-600 mb-4">Cắt xong trả tiền, huỷ lịch không sao</p>
            {isLoggedIn ? (
              <Button onClick={handleShowBooking}>Đặt lịch ngay</Button>
            ) : (
              <div className="flex gap-2 justify-center mb-4">
                <input
                  type="tel"
                  placeholder="Nhập SĐT để đặt lịch"
                  className="border p-2 rounded w-full max-w-xs"
                />
                <Button>Đặt lịch ngay</Button>
              </div>
            )}
            {/* Đánh giá nhỏ gọn bên dưới */}
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <h4 className="font-semibold text-blue-700 text-sm mb-1">MỜI ANH ĐÁNH GIÁ CHẤT LƯỢNG</h4>
              <p className="text-xs text-gray-600">Phản hồi của anh sẽ giúp chúng em cải thiện tốt hơn</p>
              <div className="text-yellow-400 text-base mt-1">★★★★★</div>
            </div>
          </Card>
        </div>
        {isLoggedIn && showBooking && (
          <div className="mt-6">
            <BookingForm />
          </div>
        )}
      </section>

      {/* Dịch vụ tóc */}
      <section className="px-6 md:px-12 pb-12">
        <h3 className="text-xl font-semibold text-blue-700 mb-4 border-l-4 border-blue-700 pl-2">DỊCH VỤ TÓC</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded overflow-hidden text-center">
            <img src="https://30shine.com/static/media/cat-toc.042077d4.png" className="w-full h-48 object-cover" alt="Cắt tóc" />
            <div className="p-3">
              <h4 className="font-semibold">Cắt tóc</h4>
              <a href="#" className="text-blue-600 text-sm">Tìm hiểu thêm →</a>
            </div>
          </div>
          <div className="bg-white shadow rounded overflow-hidden text-center">
            <img src="https://30shine.com/static/media/uon.1c034be3.png" className="w-full h-48 object-cover" alt="Uốn định hình" />
            <div className="p-3">
              <h4 className="font-semibold">Uốn định hình</h4>
              <p className="text-sm text-gray-600">Giá từ 379.000VNĐ</p>
              <a href="#" className="text-blue-600 text-sm">Tìm hiểu thêm →</a>
            </div>
          </div>
          <div className="bg-white shadow rounded overflow-hidden text-center">
            <img src="https://30shine.com/static/media/nhuom.b470fd6f.png" className="w-full h-48 object-cover" alt="Thay đổi màu tóc" />
            <div className="p-3">
              <h4 className="font-semibold">Thay đổi màu tóc</h4>
              <p className="text-sm text-gray-600">Giá từ 199.000VNĐ</p>
              <a href="#" className="text-blue-600 text-sm">Tìm hiểu thêm →</a>
            </div>
          </div>
        </div>
      </section>

            <section className="px-6 md:px-12 pb-12">
        <h3 className="text-xl font-semibold text-blue-700 mb-4 border-l-4 border-blue-700 pl-2">TIN TỨC</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded overflow-hidden">
            <img src="https://source.unsplash.com/featured/?hair,style" className="w-full h-40 object-cover" alt="News 1" />
            <div className="p-3">
              <h4 className="font-semibold mb-1">Xu hướng tóc nam 2025</h4>
              <p className="text-sm text-gray-600 mb-2">Cập nhật nhanh các kiểu tóc hot nhất năm 2025 dành cho phái mạnh.</p>
              <a href="#" className="text-blue-600 text-sm">Xem thêm →</a>
            </div>
          </div>
          <div className="bg-white shadow rounded overflow-hidden">
            <img src="https://source.unsplash.com/featured/?barber" className="w-full h-40 object-cover" alt="News 2" />
            <div className="p-3">
              <h4 className="font-semibold mb-1">30 mẹo giữ tóc khoẻ đẹp</h4>
              <p className="text-sm text-gray-600 mb-2">Chia sẻ các bí quyết từ chuyên gia giúp giữ mái tóc khoẻ mạnh và cuốn hút.</p>
              <a href="#" className="text-blue-600 text-sm">Xem thêm →</a>
            </div>
          </div>
          <div className="bg-white shadow rounded overflow-hidden">
            <img src="https://source.unsplash.com/featured/?haircut" className="w-full h-40 object-cover" alt="News 3" />
            <div className="p-3">
              <h4 className="font-semibold mb-1">Giảm giá dịch vụ cuối tuần</h4>
              <p className="text-sm text-gray-600 mb-2">Khuyến mãi hấp dẫn lên tới 50% cho các dịch vụ vào thứ 6 - 7 - CN.</p>
              <a href="#" className="text-blue-600 text-sm">Xem thêm →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call/Arrow */}
      {/* Footer Call/Arrow */}
      <div className="fixed right-4 bottom-4 flex flex-col gap-3">
        <Button className="rounded-full p-3 shadow-md">⬆</Button>
        <Button className="rounded-full p-3 shadow-md">📞</Button>
      </div>

      {/* Footer Info */}
      <footer className="bg-blue-800 text-white text-sm pt-10 pb-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 border-t border-white/30 pt-6">
          <div>
            <p className="font-semibold mb-2">Về chúng tôi</p>
            <ul className="space-y-1 text-white/90">
              <li><a href="#" className="hover:underline">TLAP Shop</a></li>
              <li><a href="#" className="hover:underline">Học cắt tóc</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Liên hệ</p>
            <ul className="space-y-1 text-white/90">
              <li>Hotline (1.000đ/phút): 1900.27.27.03</li>
              <li>Học nghề tóc: 0967.86.3030</li>
              <li>Nhượng quyền & quảng cáo</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Thông tin</p>
            <ul className="space-y-1 text-white/90">
              <li>Giờ phục vụ: T2 - CN (8h30 - 20h30)</li>
              <li>Chính sách bảo mật</li>
              <li>Điều kiện giao dịch</li>
              <li>Giấy phép giáo dục nghề</li>
            </ul>
          </div>
          <div>   
            <p>Tham gia cộng đồng 2.5 triệu thành viên</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-red-400">📺 1300k</span>
              <span className="text-blue-400">👍 200k</span>
            </div>
          </div>
        </div>
        <p className="text-center text-white/60 mt-6 text-xs">
          © 2024 TLap / Địa chỉ: 82 Trần Đại Nghĩa, Đồng Tâm, Q. Hai Bà Trưng, HN / GPDKKD số 010.7467.693 do Sở KHĐT TP.HN cấp ngày 08/06/2016
        </p>
      </footer>
    </div>
  );
}
