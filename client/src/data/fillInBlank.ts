import type { Question } from "../types";

export const fillBlankQuestionData: Question[] = [
    {
        // Các trường cơ bản
        id: 8,
        question:8,
        level: 3, // Hoặc level phù hợp
        question_type: 'fill_blank' , // Giả sử bạn có enum QuestionType
        content: "Em cần mô tả các bước xảy ra khi dùng trình duyệt Web của mình để truy cập www.companypro.net. Hoàn thành các câu dưới đây bằng cách chọn đúng tùy chọn từ mỗi danh sách thả xuống.",

        // Dữ liệu chi tiết cho câu hỏi điền vào chỗ trống
        fill_blank_question: {
            leadingText: "Kết nối được thiết lập đến", // Bắt đầu câu

            options: [
                // Các tùy chọn có trong Dropdown (từ hình 2)
                { id: 1, content: "Địa chỉ IP" },
                { id: 2, content: "Trang (Webpage)" },
                { id: 3, content: "Máy chủ (Server)" },
                { id: 4, content: "Trình duyệt web (Browser)" },
                // Có thể thêm các từ gây nhiễu nếu cần
            ],

            blanks: [
                {
                    id: 1,
                    correctOptionId: 3, // Đáp án: Máy chủ (Server)
                    trailingText: "," // Văn bản sau Dropdown 1
                },
                {
                    id: 2,
                    correctOptionId: 2, // Đáp án: Trang (Webpage)
                    trailingText: "được gửi đến máy tính của người dùng" // Văn bản sau Dropdown 2
                },
                {
                    id: 3,
                    correctOptionId: 4, // Đáp án: Trình duyệt web (Browser)
                    trailingText: "hiển thị trang Web" // Văn bản sau Dropdown 3
                }
            ]
        }
    },
    {
        // Các trường cơ bản
        id: 9,
        question:9,
        level: 3, // Hoặc level phù hợp
        question_type: 'fill_blank' , // Giả sử bạn có enum QuestionType
        content: "Em cần mô tả các bước xảy ra khi dùng trình duyệt Web của mình để truy cập www.companypro.net. Hoàn thành các câu dưới đây bằng cách chọn đúng tùy chọn từ mỗi danh sách thả xuống.",

        // Dữ liệu chi tiết cho câu hỏi điền vào chỗ trống
        fill_blank_question: {
            leadingText: "", 

            options: [
              
                { id: 1, content: "Giao thức (Protocol)" },
                { id: 2, content: "Mạng (Network)" },
                { id: 3, content: "Máy chủ (Server)" },
                { id: 4, content: "Trình duyệt web (Browser)" },
            ],

            blanks: [
                {
                    id: 1,
                    correctOptionId: 1, 
                    trailingText: ", giao tiếp là một bộ quy tắc được các máy tính sử dụng để giao tiếp với nhau." 
                }
            ]
        }
    }
];