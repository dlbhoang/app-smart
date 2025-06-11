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
          Chào mừng bạn đến với <strong>aicontent</strong>. Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và duy trì một môi trường trực tuyến an toàn. Trang "Chính Sách và Bảo Mật" này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng dịch vụ của chúng tôi.
        </p>

        <Section title="Thông Tin Cá Nhân - Thu Thập Thông Tin">
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
          Website của chúng tôi là một công cụ, công cụ này giúp khách hàng tạo nội dung bằng cách sử dụng trí tuệ nhân tạo (AI). Nội dung do AI tạo ra dựa trên dữ liệu và nguồn thông tin đầu vào từ khách hàng.
        </Section>

        <Section title="Quy định về nội dung do AI tạo ra">
          Mỗi nội dung được lưu trữ riêng biệt cho từng khách hàng. Chỉ có khách hàng tạo nội dung đó mới có thể thấy, hiệu chỉnh, đăng tải hoặc xóa nội dung. Chúng tôi không tiến hành chỉnh sửa, đăng tải nội dung lên website của khách hàng. Khách hàng là người chịu trách nhiệm hành động đăng tải nội dung lên website của khách hàng cũng như tính đúng đắn của nội dung trên website của họ.
        </Section>

        <Section title="Quy định về các hành động không được phép">
          Bạn không được quyền xâm phạm, xâm nhập, tiếp cận, sử dụng hay tìm cách xâm phạm, xâm nhập, tiếp cận hoặc sử dụng bất kỳ phần nào trong máy chủ của chúng tôi và bất kỳ khu vực dữ liệu nào nếu không được chúng tôi cho phép. <br /><br />
          Bạn không được sử dụng công cụ trí tuệ nhân tạo (AI) để:
          <ul className="policy-list">
            <li>Tạo các nội dung vi phạm pháp luật hoặc thuần phong mỹ tục của Việt Nam.</li>
            <li>Tạo những thông tin mang tính sai lệch gây hại cho người khác.</li>
            <li>Thực hiện bất kỳ hành động nào mà chúng tôi cho rằng không thích hợp.</li>
          </ul>
        </Section>

        <Section title="Thay Đổi Chính Sách và Bảo Mật">
          Chúng tôi có thể cập nhật chính sách và bảo mật này từ thời gian này và chúng tôi khuyến nghị bạn kiểm tra định kỳ để biết các thay đổi.
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
