import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const DisclaimerPage = () => {
  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>Miễn Trừ Trách Nhiệm</h1>

        <Section title="Chấp Nhận Điều Kiện Sử Dụng">
          Việc sử dụng trang web <strong>aicontent</strong> (sau đây gọi là "Website") của bạn bao gồm việc đồng ý và chấp nhận mọi điều khoản và điều kiện được nêu dưới đây.
        </Section>

        <Section title="Dịch Vụ Tạo Nội Dung Bằng Trí Tuệ Nhân Tạo (AI)">
          Trang web chúng tôi cung cấp dịch vụ tạo nội dung bằng trí tuệ nhân tạo (AI). Nội dung được sinh ra tự động từ các đối tác trí tuệ nhân tạo (AI) của chúng tôi. Chúng tôi không chịu trách nhiệm về bất kỳ nội dung nào được tạo ra thông qua các công cụ AI này.
          <br />
          <br />
          Quý khách hàng (người sử dụng) chịu trách nhiệm về việc kiểm tra, chỉnh sửa và đăng tải nội dung. Quý khách hàng đảm bảo nội dung đáp ứng đúng và đủ yêu cầu về pháp luật cũng như các tiêu chuẩn khác của quý khách.
        </Section>

        <Section title="Không Bảo Đảm và Miễn Trừ Trách Nhiệm Pháp Lý">
          Dù chúng tôi đã cố gắng để đảm bảo tính chính xác và độ tin cậy của thông tin do AI sinh ra, tuy nhiên chúng tôi không đưa ra bất kỳ bảo đảm nào về nó.
          <br />
          <br />
          Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất hoặc thiệt hại nào phát sinh trực tiếp hoặc gián tiếp từ việc sử dụng hoặc không sử dụng thông tin do AI sinh ra.
        </Section>

        <Section title="Quyền Sở Hữu Trí Tuệ">
          Nội dung được tạo ra bởi các công cụ AI có thể không đảm bảo quyền sở hữu trí tuệ rõ ràng. Người dùng chịu trách nhiệm kiểm tra và đảm bảo rằng việc sử dụng nội dung không vi phạm quyền tác giả, thương hiệu hoặc các quyền khác của bên thứ ba.
        </Section>

        <Section title="Không Cung Cấp Lời Khuyên Chuyên Môn">
          Nội dung do AI sinh ra không được xem là lời khuyên chuyên môn trong các lĩnh vực như pháp lý, y tế, tài chính, hay bất kỳ lĩnh vực chuyên môn nào khác. Người dùng cần tham khảo ý kiến của chuyên gia có thẩm quyền trước khi hành động dựa trên nội dung được tạo ra bởi AI.
        </Section>

        <Section title="Xử Lý Nội Dung Vi Phạm">
          Chúng tôi có quyền từ chối cung cấp dịch vụ, chỉnh sửa hoặc xóa bỏ nội dung nếu phát hiện nội dung đó vi phạm pháp luật, đạo đức, hoặc các điều khoản sử dụng của chúng tôi.
        </Section>

        <Section title="Thay Đổi Điều Kiện và Dịch Vụ">
          Chúng tôi có quyền thay đổi bất kỳ điều khoản hoặc điều kiện nào của trang web mà không cần thông báo trước.
          <br />
          <br />
          Chúng tôi cũng có quyền thay đổi hoặc ngừng cung cấp dịch vụ bất kỳ lúc nào mà không cần báo trước.
        </Section>

        <Section title="Liên Kết Tới Trang Web Khác">
          Trang web có thể chứa các liên kết tới trang web khác không thuộc sở hữu hoặc kiểm soát của chúng tôi.
          <br />
          <br />
          Chúng tôi không chịu trách nhiệm về nội dung hoặc chính xác của các trang web này và không hỗ trợ hoặc chấp nhận trách nhiệm về bất kỳ tổn thất hoặc thiệt hại nào do việc sử dụng chúng.
        </Section>

        <Section title="Không Sử Dụng Trái Pháp Luật">
          Trang web của chúng tôi không được sử dụng vào mục đích trái pháp luật. Nếu phát hiện vi phạm, chúng tôi có quyền ngưng tài khoản sử dụng dịch vụ và không hoàn tiền.
        </Section>

        <Section title="Liên Hệ">
          Nếu có bất kỳ câu hỏi hoặc đề xuất nào về miễn trừ trách nhiệm này, vui lòng liên hệ với chúng tôi qua email:{" "}
          <a href="mailto:hello@aicontent.com" style={styles.link}>hello@aicontent.com</a>.
        </Section>
      </div>
      <Footer />
    </>
  );
};

const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>{title}</h2>
    <div style={styles.paragraph}>{children}</div>
  </div>
);

const styles = {
  container: {
    maxWidth: "960px",
    margin: "60px auto",
    padding: "0 24px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#2d3748",
  },
  title: {
    fontSize: "40px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "48px",
    color: "#1a202c",
  },
  section: {
    backgroundColor: "#ffffff",
    padding: "28px 32px",
    borderRadius: "12px",
    marginBottom: "28px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "12px",
    color: "#2b6cb0",
    fontWeight: "600",
  },
  paragraph: {
    fontSize: "16px",
    color: "#4a5568",
    lineHeight: 1.7,
  },
  link: {
    color: "#2b6cb0",
    textDecoration: "underline",
    fontWeight: "500",
    transition: "color 0.3s",
  },
};

export default DisclaimerPage;
