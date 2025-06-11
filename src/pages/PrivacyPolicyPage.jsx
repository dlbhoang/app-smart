import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./css/PrivacyPolicyPage.css";

const Section = ({ title, children }) => (
  <section className="policy-section">
    <h2 className="policy-heading">{title}</h2>
    <p className="policy-text">{children}</p>
  </section>
);

const PrivacyPolicyPage = () => {
  return (
    <>
      <Header />
      <div className="policy-container">
        <h1 className="policy-title">Chính Sách và Bảo Mật</h1>

        <p className="policy-text">
          Chào mừng bạn đến với <strong>aiktp.com</strong>. Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và duy trì một môi trường trực tuyến an toàn. Trang "Chính Sách và Bảo Mật" này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng dịch vụ của chúng tôi.
        </p>

        <Section title="Thu Thập Thông Tin Cá Nhân">
          Khi sử dụng dịch vụ của chúng tôi, chúng tôi có thể yêu cầu bạn cung cấp địa chỉ email, và một số thông tin liên quan để đảm bảo chất lượng dịch vụ.
        </Section>

        <Section title="Sử Dụng Thông Tin Cá Nhân">
          Chúng tôi sử dụng thông tin cá nhân để cung cấp và duy trì dịch vụ của chúng tôi, gửi thông báo, và cải thiện trải nghiệm người dùng. Chúng tôi có thể sử dụng thông tin để liên hệ với bạn về các cập nhật, thông báo quan trọng, hoặc mục đích tiếp thị.
        </Section>

        <Section title="Bảo Mật Thông Tin Cá Nhân">
          Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và áp dụng các biện pháp an ninh để ngăn chặn truy cập trái phép, sử dụng không đúng hoặc tiết lộ thông tin cá nhân.
        </Section>

        <Section title="Chia Sẻ Thông Tin Cá Nhân">
          Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba mà không có sự đồng ý của bạn, trừ khi có yêu cầu pháp luật hoặc chúng tôi tin rằng việc đó là cần thiết để bảo vệ quyền, tài sản hoặc an toàn của chúng tôi.
        </Section>

        <Section title="Nội dung do AI sinh ra">
          Website của chúng tôi là một công cụ giúp khách hàng tạo nội dung bằng cách sử dụng trí tuệ nhân tạo (AI). Nội dung do AI tạo ra dựa trên dữ liệu và nguồn thông tin đầu vào từ khách hàng.
        </Section>

        <Section title="Quy định về nội dung do AI tạo ra">
          Mỗi nội dung được lưu trữ riêng biệt cho từng khách hàng. Chỉ có khách hàng tạo nội dung đó mới có thể thấy, hiệu chỉnh, đăng tải hoặc xóa nội dung. Chúng tôi không tiến hành chỉnh sửa hay đăng tải nội dung lên website của khách hàng. Khách hàng chịu trách nhiệm hoàn toàn với nội dung được đăng tải.
        </Section>

        <Section title="Quy định về các hành động không được phép">
          Bạn không được quyền xâm nhập hoặc sử dụng trái phép máy chủ và dữ liệu của chúng tôi. Bạn không được sử dụng AI để tạo nội dung vi phạm pháp luật, thuần phong mỹ tục, sai lệch hoặc gây hại. Chúng tôi có quyền từ chối nếu nhận thấy nội dung không phù hợp.
        </Section>

        <Section title="Thay Đổi Chính Sách và Bảo Mật">
          Chúng tôi có thể cập nhật chính sách và bảo mật này theo thời gian và khuyến nghị bạn kiểm tra định kỳ để nắm được các thay đổi.
        </Section>

        <Section title="Liên Hệ">
          Nếu có bất kỳ câu hỏi hoặc đề xuất nào về chính sách và bảo mật này, vui lòng liên hệ qua email:{" "}
          <a href="mailto:Tranhuynhsang@gmail.com" className="policy-link">Tranhuynhsang@gmail.com</a>.
        </Section>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
