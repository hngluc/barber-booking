import React from "react";
import { Link } from "react-router-dom";

export default function Detail() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans px-6 md:px-20 py-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-12 border-b pb-4">
        <div className="text-3xl font-extrabold text-blue-700">TLap</div>
        <nav className="flex space-x-3">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Trang chủ
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
          >
            Đăng nhập
          </Link>
        </nav>
      </header>

      {/* Section 1: Giới thiệu */}
      <section className="mb-14 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-3 border-l-4 pl-3 border-blue-700">
          TLAP - ĐIỂM TỰA CHO VIỆC LỚN
        </h2>
        <blockquote className="italic text-gray-600 mb-4">
          "Hãy cho tôi một điểm tựa, tôi sẽ nâng cả thế giới." – Archimedes
        </blockquote>
        <div className="space-y-3 text-lg leading-relaxed">
          <p>Mỗi người đàn ông đều có một hành trình riêng, một thế giới muốn chinh phục.</p>
          <p>Có người đang tiến về đích, có người vẫn đang tìm hướng đi.</p>
          <p>Có người biết chính xác điều mình muốn, có người đang từng bước khám phá.</p>
          <p className="font-semibold text-blue-700">
            Dù anh đang ở đâu trên hành trình ấy – bản lĩnh và sự tự tin luôn có trong chính anh.
          </p>
          <p>
            TLap không tạo ra chúng. <span className="font-semibold text-blue-700">Chúng tôi là điểm tựa</span>,
            giúp anh thể hiện trọn vẹn phong thái, khí chất và sẵn sàng cho những điều quan trọng phía trước.
          </p>
        </div>
      </section>

      {/* Image */}
      <section className="flex justify-center mb-14">
        <img
          src="https://uniquekiosk.com/wp-content/uploads/2022/11/barber-shop-2-scaled.jpg"
          alt="TLap Barber"
          className="rounded-lg shadow-xl w-full max-w-5xl"
        />
      </section>

      {/* Section 2: Ý nghĩa kiểu tóc */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-3 border-l-4 pl-3 border-blue-700">
          KIỂU TÓC ĐẸP KHÔNG PHẢI ĐÍCH ĐẾN – MÀ LÀ ĐIỂM KHỞI ĐẦU
        </h2>
        <div className="space-y-3 text-lg leading-relaxed">
          <p>Một kiểu tóc đẹp không chỉ để ngắm nhìn – mà còn để cảm nhận:</p>
          <ul className="list-disc pl-6 text-blue-700 font-medium">
            <li>Cảm nhận sự thoải mái, tự tin, sẵn sàng</li>
            <li>Cảm nhận một phiên bản tốt hơn của chính mình</li>
          </ul>
          <p>
            Với gần <strong>150 salon trên toàn quốc</strong>, công nghệ hiện đại và đội ngũ thợ tận tâm,
            TLap không chỉ mang đến một diện mạo mới. <span className="font-semibold text-blue-700">Chúng tôi giúp anh</span>
            luôn trong trạng thái tốt nhất – để đón nhận bất kỳ điều gì đang chờ phía trước.
          </p>
        </div>
      </section>
    </div>
  );
}
