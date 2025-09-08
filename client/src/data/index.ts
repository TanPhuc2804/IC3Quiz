import type { Category, Exam, Question, User } from "../types";

export const user: User = {
  id: 1,
  fullname: "Phan Tấn Phúc",
  username: "phuc123",
  email: "phuc@gmail.com",
  role: "user"
}

export const exams: Exam[] = [
  {
    id: 1,
    content: "IC3 GS6 Level2",
    description: "Đề thi kiểm tra kiến thức cơ bản về phần cứng, phần mềm, hệ điều hành và cách vận hành máy tính.",
    image_url: "https://res.cloudinary.com/da5mlszld/image/upload/v1756055813/IC3-removebg-preview_va4uxe.png",
    total_user: 120,
    total_question: 50,
    duration: 45,
    category_id: 1,
  },
  {
    id: 2,
    content: "IC3 - Key Applications",
    description: "Đề thi đánh giá kỹ năng sử dụng các phần mềm văn phòng như Word, Excel, PowerPoint và công cụ đa phương tiện.",
    image_url: "https://res.cloudinary.com/da5mlszld/image/upload/v1756055813/IC3-removebg-preview_va4uxe.png", total_user: 95,
    total_question: 50,
    duration: 45,
    category_id: 1,
  },
  {
    id: 3,
    content: "IC3 - Living Online",
    description: "Đề thi về kỹ năng sử dụng Internet, email, mạng xã hội và kiến thức bảo mật thông tin trực tuyến.",
    image_url: "https://res.cloudinary.com/da5mlszld/image/upload/v1756055813/IC3-removebg-preview_va4uxe.png", total_user: 105,
    total_question: 50,
    duration: 45,
    category_id: 1,
  },
  {
    id: 4,
    content: "IC3 - Digital Literacy Certification",
    description: "Bộ đề tổng hợp kiến thức và kỹ năng số toàn diện, từ phần cứng, phần mềm, internet đến an toàn thông tin.",
    image_url: "https://res.cloudinary.com/da5mlszld/image/upload/v1756055813/IC3-removebg-preview_va4uxe.png", total_user: 88,
    total_question: 60,
    duration: 60,
    category_id: 1,
  },
  {
    id: 5,
    content: "IC3 - Practice Exam Set",
    description: "Đề luyện tập tổng hợp giúp làm quen dạng câu hỏi và chuẩn bị cho kỳ thi IC3 quốc tế.",
    image_url: "https://res.cloudinary.com/da5mlszld/image/upload/v1756055813/IC3-removebg-preview_va4uxe.png", total_user: 150,
    total_question: 40,
    duration: 30,
    category_id: 1,
  }
];

export const categories: Category[] = [
  {
    id: 1,
    content: "Bộ đề IC3",
    image_url: ""
  }
]

export const questions: Question[] = [
  {
    "id": 1,
    "content": "Em hãy cho biết, chương trình nào sau đây phải được cài đặt để hệ điều hành máy tính có thể hiểu được một thiết bị máy in mới?",
    "question": 1,
    "question_type": "normal",
    "option": [
      "A. Intaller",
      "B. Firewall",
      "C. Wizard",
      "D. Driver"
    ],
    "correct_answer": "D"
  },
  {
    "id": 2,
    "content": "Em hãy chọn theo đúng loại chức năng cho từng thiết bị sau.",
    "question": 2,
    "question_type": "classify",
    "classify_question": [
      {
        "id": 4,
        "content": "Bàn di chuột cảm ứng (Touchpad)",
        "classify": "Thiết bị đầu vào (Input Device)"
      },
      {
        "id": 5,
        "content": "Bàn phím (Keyboard)",
        "classify": "Thiết bị đầu vào (Input Device)"
      },
      {
        "id": 6,
        "content": "Máy in (Printer)",
        "classify": "Thiết bị đầu ra (Output Device)"
      },
      {
        "id": 7,
        "content": "Màn hình (Monitor)",
        "classify": "Thiết bị đầu ra (Output Device)"
      },
      {
        "id": 8,
        "content": "Chuột (Mouse)",
        "classify": "Thiết bị đầu vào (Input Device)"
      }
    ]
  },
  {
    "id": 3,
    "content": "Với mỗi câu phát biểu về cáp và kết nối không dây, chọn Đúng hoặc Sai cho phát biểu sau",
    "question": 3,
    "question_type": "classify",
    "classify_question": [
      {
        "id": 1,
        "content": "Có thể dùng cáp USB để cấp dữ liệu và nguồn điện cho một thiết bị.",
        "classify": "Đúng"
      },
      {
        "id": 2,
        "content": "Có thể dùng kết nối Bluetooth để cấp dữ liệu và nguồn điện cho một thiết bị.",
        "classify": "Sai"
      },
      {
        "id": 3,
        "content": "Có thế dùng bộ chia USB Hub để cắm nhiều thiết bị vào cùng một cổng USB duy nhất.",
        "classify": "Đúng"
      }
    ]
  },
  {
    "id": 4,
    "content": "Em hãy cho biết, hạn chế của máy tính bảng so với máy tính xách tay là gì?",
    "question": 4,
    "question_type": "normal",
    "option": [
      "A. Không thể thực hiện cuộc gọi Video.",
      "B. Không thể chỉnh sửa tài liệu.",
      "C. Một số ứng dụng sẽ không cài đặt được trên máy tính bảng.",
      "D. Không thể chỉnh sửa tài liệu"
    ],
    "correct_answer": "C"
  },
  {
    "id": 5,
    "content": "Em hãy cho biết, loại kết nối nào để kết nối tai nghe không dây với máy tính xách tay?",
    "question": 5,
    "question_type": "normal",
    "option": [
      "A. HDMI",
      "B. Intranet",
      "C. USB",
      "D. Bluetooth"
    ],
    "correct_answer": "D"
  },
  {
    "id": 6,
    "content": "Em hãy cho biết, tùy chọn nào sau đây là một thiết bị đầu vào (Input Device)?",
    "question": 6,
    "question_type": "normal",
    "option": [
      "A. Loa (Speakers)",
      "B. Máy chiếu (Projector)",
      "C. Máy in (Printer)",
      "D. Micro"
    ],
    "correct_answer": "D"
  },
  {
    "id": 7,
    "content": "Em hãy cho biết, tùy chọn nào sau đây là lợi thế của việc sử dụng USB để lưu trữ các tập tin so với lưu trữ điện toán đám mây? (Chọn 2)",
    "question": 7,
    "question_type": "multiple",
    "limit_choice": 2,
    "multiple_question": [
      {
        "option_text": "A. USB có thể chứa nhiều dữ liệu hơn.",
        "is_correct": false
      },
      {
        "option_text": "B. USB không an toàn hơn so với lưu trữ đám mây.",
        "is_correct": true
      },
      {
        "option_text": "C. Các tệp tin của em an toàn hơn.",
        "is_correct": true
      },
      {
        "option_text": "D. USB không có giới hạn dung lượng.",
        "is_correct": false
      }
    ]
  },
  {
    "id": 8,
    "content": "Em hãy cho biết, tùy chọn nào sau đây là một lợi thế lớn của máy tính bảng?",
    "question": 8,
    "question_type": "normal",
    "option": [
      "A. Sức mạnh",
      "B. Tính di động",
      "C. Bộ nhớ",
      "D. Khả năng lưu trữ"
    ],
    "correct_answer": "B"
  },
  {
    "id": 9,
    "content": "Em hãy cho biết, loại giao tiếp nào sau đây cho phép hai thiết bị giao tiếp bằng cách đặt chúng cách nhau trong vòng 2 inch?",
    "question": 9,
    "question_type": "normal",
    "option": [
      "A. NFC (Near Field Communication)",
      "B. Wifi",
      "C. Bluetooth",
      "D. Ethernet"
    ],
    "correct_answer": "A"
  },
  {
    "id": 10,
    "content": "Em hãy cho biết, những thiết bị nào sau đây phụ thuộc nhiều vào công nghệ lưu trữ điện toán đám mây? (Chọn 2)",
    "question": 10,
    "question_type": "multiple",
    "limit_choice": 2,
    "multiple_question": [
      {
        "option_text": "A. Laptop",
        "is_correct": false
      },
      {
        "option_text": "B. Desktop",
        "is_correct": false
      },
      {
        "option_text": "C. Smartphone",
        "is_correct": true
      },
      {
        "option_text": "G. Smartphone",
        "is_correct": true
      }
    ]
  },
  {
    "id": 11,
    "content": "Em hãy cho biết, tùy chọn nào sau đây là những thiết bị có thể được ghép nối không dây với máy tính? (Chọn 4)",
    "question": 11,
    "question_type": "multiple",
    "limit_choice": 4,
    "multiple_question": [
      {
        "option_text": "A. Wired Router",
        "is_correct": false
      },
      {
        "option_text": "B. Wireless Keyboard",
        "is_correct": true
      },
      {
        "option_text": "C. Wireless Printer",
        "is_correct": true
      },
      {
        "option_text": "D. CD Drive",
        "is_correct": false
      },
      {
        "option_text": "E. Driver",
        "is_correct": false
      },
      {
        "option_text": "F. Bluetooth Speakers",
        "is_correct": true
      },
      {
        "option_text": "G. Wireless Mouse",
        "is_correct": true
      }
    ]
  },
  {
    "id": 12,
    "content": "Em hãy cho biết, tùy chọn nào là những ưu điểm của điện toán đám mây? (Chọn 4)",
    "question": 12,
    "question_type": "multiple",
    "limit_choice": 4,
    "multiple_question": [
      {
        "option_text": "A. Cần có kết nối Internet để hoạt động.",
        "is_correct": false
      },
      {
        "option_text": "B. Dung lượng lưu trữ có trả phí.",
        "is_correct": false
      },
      {
        "option_text": "C. Truy cập bất cứ nơi nào có kết nối Internet.",
        "is_correct": true
      },
      {
        "option_text": "D. Tự động sao lưu dự phòng.",
        "is_correct": true
      },
      {
        "option_text": "E. Khả năng chia sẻ mọi thứ với nhiều người.",
        "is_correct": true
      },
      {
        "option_text": "F. Nhóm quyền truy cập vào cùng một tài liệu.",
        "is_correct": true
      }
    ]
  },
  {
    "id": 13,
    "content": "Em hãy cho biết, Bluetooth là gì?",
    "question": 13,
    "question_type": "normal",
    "option": [
      "A. Một loại công nghệ dùng phần mềm để kết nối với từ ba thiết bị trở lên.",
      "B. Công nghệ không dây tầm ngắn dùng để kết nối với một thiết bị",
      "C. Một quy trình cài đặt để kết nối hai thiết bị với nhau.",
      "D. Một loại công nghệ cần dùng dây cáp để kết nối với một thiết bị."
    ],
    "correct_answer": "B"
  },
  {
    "id": 14,
    "content": "Em hãy cho biết, loại phần mềm hệ thống nào quản lí tất cả các phần mềm và phần cứng trên máy tính?",
    "question": 14,
    "question_type": "normal",
    "option": [
      "A. Hệ điều hành (OS)",
      "B. Phần mềm chống Virus",
      "C. Phần mềm tiện ích (Utility)",
      "D. Trình điều khiển thiết bị (Driver)"
    ],
    "correct_answer": "A"
  },
  {
    "id": 15,
    "content": "Trong các tùy chọn sau, tùy chọn nào là các thiết bị đầu ra (Output Device)? (Chọn 3)",
    "question": 15,
    "question_type": "multiple",
    "limit_choice": 3,
    "multiple_question": [
      {
        "option_text": "A. Máy in (Printer)",
        "is_correct": true
      },
      {
        "option_text": "B. Tai nghe (Headphone)",
        "is_correct": true
      },
      {
        "option_text": "C. Loa (Speaker)",
        "is_correct": true
      },
      {
        "option_text": "D. Bàn di chuột cảm ứng (Touchpad)",
        "is_correct": false
      },
      {
        "option_text": "E. Chuột (Mouse)",
        "is_correct": false
      },
      {
        "option_text": "F. Bàn phím (Keyboard)",
        "is_correct": false
      }
    ]
  },
  {
    "id": 16,
    "content": "Em hãy cho biết, tùy chọn nào dưới đây là thuật ngữ chỉ kết quả mà máy tính tạo ra, chẳng hạn như thông tin, âm thanh và hình ảnh?",
    "question": 16,
    "question_type": "normal",
    "option": [
      "A. Đầu ra (Output)",
      "B. Ổ cứng (Hard Drive)",
      "C. Bộ nhớ (Memory)",
      "D. Hệ điều hành (OS)"
    ],
    "correct_answer": "A"
  },
  {
    "id": 17,
    "content": "Em hãy cho biết, tùy chọn nào sau đây là thiết bị có vai trò lưu trữ thông tin cho hệ điều hành, phần mềm và phần cứng?",
    "question": 17,
    "question_type": "normal",
    "option": [
      "A. Bộ nguồn",
      "B. Màn hình",
      "C. Card âm thanh",
      "D. Bộ nhớ"
    ],
    "correct_answer": "D"
  },
  {
    "id": 18,
    "content": "Em hãy cho biết, tùy chọn nào dưới đây hỗ trợ chức năng cơ bản và điều khiển các phần khác nhau của máy tính?",
    "question": 18,
    "question_type": "normal",
    "option": [
      "A. Dữ liệu (Data)",
      "B. Đầu vào (Input)",
      "C. Đầu vào (Input)",
      "D. Hệ điều hành (OS)"
    ],
    "correct_answer": "D"
  },
  {
    "id": 19,
    "content": "Hành động nỗ lực khai thác hệ thống máy tính hoặc mạng riêng bên trong máy tính được gọi là gì?",
    "question": 19,
    "question_type": "normal",
    "option": [
      "A. Bystander",
      "B. Hacking",
      "C. Dấu chân kĩ thuật số (Digital Footprint)",
      "D. Công dân kỉ nguyên số (Digital Citizenship)"
    ],
    "correct_answer": "B"
  },
  {
    "id": 20,
    "content": "Hầu hết các điện thoại thông minh đều có tùy chọn gói dữ liệu di động. Em hãy cho biết, tùy chọn nào sau đây mô tả chính xác dữ liệu di động là gì?",
    "question": 20,
    "question_type": "normal",
    "option": [
      "A. Điện thoại của em có bao nhiêu bộ nhớ.",
      "B. Truy cập Internet không dây có tính phí, được đo bằng mức tiêu thụ dữ liệu.",
      "C. Em được phép gửi bao nhiêu tin nhắn văn bản",
      "D. Em được phân bổ bao nhiêu thời gian để gọi điện thoại."
    ],
    "correct_answer": "B"
  },
  {
    "id": 21,
    "content": "Em hãy cho biết, hai lợi ích của việc tải xuống (Download) tập tin thay vì phát trực tuyến (Stream) tập tin đó là gì? (Chọn 2)",
    "question": 21,
    "question_type": "multiple",
    "limit_choice": 2,
    "multiple_question": [
      {
        "option_text": "A. Sau khi tải xuống hoàn tất, quá trình phát lại đáng tin cậy hơn.",
        "is_correct": true
      },
      {
        "option_text": "B. Phát trực tuyến có khả năng phát lại mượt mà hơn.",
        "is_correct": false
      },
      {
        "option_text": "C. Không yêu cầu dung lượng lưu trữ.",
        "is_correct": false
      },
      {
        "option_text": "D. Tệp tin đã được tải xuống không yêu cầu kết nối Internet để phát lại.",
        "is_correct": true
      },
      {
        "option_text": "E. Không cần phát đạt trước khi chạy tệp tin.",
        "is_correct": false
      }
    ]
  },
  {
    "id": 22,
    "content": "Tùy chọn nào dưới đây có thể được sử dụng để truyền dữ liệu không dây giữa hai thiết bị gần nhau?",
    "question": 22,
    "question_type": "normal",
    "option": [
      "A. Ethernet",
      "B. Bluetooth",
      "C. Firewall",
      "D. Modem"
    ],
    "correct_answer": "B"
  },
  {
    "id": 23,
    "content": "Thiết bị nào KHÔNG có Camera?",
    "question": 23,
    "question_type": "normal",
    "option": [
      "A. Google Chromebook",
      "B. Chuông cửa thông minh (Smart Doorbell)",
      "C. Tai nghe Bluetooth (Bluetooth Headset)",
      "D. Apple Iphone"
    ],
    "correct_answer": "C"
  },
  {
    "id": 24,
    "content": "Thiết bị nào trong số này là thiết bị nhập (Input Device)?",
    "question": 24,
    "question_type": "normal",
    "option": [
      "A. Monitor",
      "B. Printer",
      "C. Keyboard",
      "D. Speaker"
    ],
    "correct_answer": "C"
  },
  {
    "id": 25,
    "content": "Em hãy cho biết thiết bị lưu trữ được đo lường bằng đơn vị nào sau đây? (Chọn 2)",
    "question": 25,
    "question_type": "multiple",
    "limit_choice": 2,
    "multiple_question": [
      {
        "option_text": "A. Terabytes",
        "is_correct": true
      },
      {
        "option_text": "B. Centimeters",
        "is_correct": false
      },
      {
        "option_text": "C. Inches",
        "is_correct": false
      },
      {
        "option_text": "D. Feet",
        "is_correct": false
      },
      {
        "option_text": "E. Gigabytes",
        "is_correct": true
      }
    ]
  },
  {
    "id": 26,
    "content": "Em hãy cho biết, loại kết nối không dây nào sau đây sẽ cho phép em tải hình ảnh từ máy ảnh vào máy tính?",
    "question": 26,
    "question_type": "normal",
    "option": [
      "A. VGA",
      "B. HDMI",
      "C. Bluetooth",
      "D. RCA"
    ],
    "correct_answer": "C"
  },
  {
    "id": 27,
    "content": "Em hãy cho biết, thiết bị chuột trên máy tính bảng đã được thay thế bằng những tùy chọn nào đây? (Chọn 2)",
    "question": 27,
    "question_type": "multiple",
    "limit_choice": 2,
    "multiple_question": [
      {
        "option_text": "A. Bút chì (Pencil)",
        "is_correct": false
      },
      {
        "option_text": "B. Bút cảm ứng (Stylus)",
        "is_correct": true
      },
      {
        "option_text": "C. Màn hình cảm ứng (Touch Screen)",
        "is_correct": true
      }
    ]
  },
  {
    "id": 28,
    "content": "Em hãy cho biết, tùy chọn nào sau đây là thành phần quan trọng nhất được sử dụng để chạy các ứng dụng?",
    "question": 28,
    "question_type": "normal",
    "option": [
      "A. Bộ lưu trữ",
      "B. Thẻ sim",
      "C. Card màn hình",
      "D. Bộ nhớ"
    ],
    "correct_answer": "D"
  },
  {
    "id": 29,
    "content": "Các thiết bị di động có dung lượng bộ nhớ hạn chế so với máy tính để bàn. Em hãy cho biết, tùy chọn nào sau đây có khả năng làm cho thiết bị di động của em hết dung lượng bộ nhớ?",
    "question": 29,
    "question_type": "normal",
    "option": [
      "A. Sạc thiết bị di động trước khi hết pin.",
      "B. Thường xuyên quên xóa bộ nhớ đệm",
      "C. Truyền phát các video HD",
      "D. Cài quá nhiều Game"
    ],
    "correct_answer": "D"
  },
  {
    "id": 30,
    "content": "Hệ điều hành (OS) là gì?",
    "question": 30,
    "question_type": "normal",
    "option": [
      "A. Phần mềm hỗ trợ các chức năng cơ bản của máy tính.",
      "B. Một cái gì đó đi vào máy tính.",
      "C. Thiết bị vật lý lưu trữ thông tin cho hệ điều hành, phần mềm và phần cứng.",
      "D. Khu vực làm việc của màn hình máy tính."
    ],
    "correct_answer": "A"
  },
  {
    "id": 31,
    "content": "Em hãy cho biết, tùy chọn nào là phương pháp cho phép truy cập và cập nhật các tập tin trực tuyến?",
    "question": 31,
    "question_type": "normal",
    "option": [
      "A. Lưu trữ đám mây",
      "B. Bộ lưu trữ USB",
      "C. Ổ cứng ngoài",
      "D. Email"
    ],
    "correct_answer": "A"
  },
  {
    "id": 32,
    "content": "Em hãy cho biết, tùy chọn nào sau đây là cách để tăng không gian lưu trữ cho điện thoại thông minh ? (Chọn 2)",
    "question": 32,
    "question_type": "multiple",
    "limit_choice": 2,
    "multiple_question": [
      {
        "option_text": "A. Thường xuyên xóa các ứng dụng.",
        "is_correct": false
      },
      {
        "option_text": "A. Gỡ cài đặt bất kì trò chơi nào mà em không chơi nữa.",
        "is_correct": true
      },
      {
        "option_text": "B. Truyền các tệp tin sang máy tính.",
        "is_correct": true
      },
      {
        "option_text": "C. Không chụp thêm nhiều ảnh và video.",
        "is_correct": false
      },
      {
        "option_text": "D. Gỡ tất cả các chương trình nền đang chạy.",
        "is_correct": false
      },
      {
        "option_text": "E. Xóa toàn bộ tin nhắn đã gửi.",
        "is_correct": false
      }
    ]
  },
  {
    "id": 33,
    "content": "Địa chỉ của một trang Web được gọi là gì?",
    "question": 33,
    "question_type": "normal",
    "option": [
      "A. Tác giả (Author)",
      "B. Tiêu đề trang (Page Title)",
      "C. Nhà xuất bản (Publisher)",
      "D. URL"
    ],
    "correct_answer": "D"
  },
  {
    "id": 34,
    "content": "Em hãy cho biết, tùy chọn nào là loại lưu trữ dữ liệu được truy cập từ xa thông qua kết nối Internet?",
    "question": 34,
    "question_type": "normal",
    "option": [
      "A. Lưu trữ đám mây",
      "B. Đĩa CD",
      "C. Bộ lưu trữ USB",
      "D. Ổ cứng ngoài"
    ],
    "correct_answer": "A"
  },
  {
    "id": 35,
    "content": "Em gọi các thiết bị máy tính được kết nối với nhau có thể trao đổi dữ liệu và chia sẻ tài nguyên là gì?",
    "question": 35,
    "question_type": "normal",
    "option": [
      "A. Ethernet",
      "B. Mạng máy tính (Computer Network)",
      "C. Bluetooth",
      "D. Bộ nhớ (Memory)"
    ],
    "correct_answer": "B"
  },
  {
    "id": 36,
    "content": "Em hãy cho biết, phần mềm Virus ảnh hưởng đến hệ thống máy tính như thế nào? (Chọn 2)",
    "question": 36,
    "question_type": "multiple",
    "limit_choice": 2,
    "multiple_question": [
      {
        "option_text": "A. Làm hỏng các tệp tin.",
        "is_correct": true
      },
      {
        "option_text": "B. Thu thập và chuyển thông tin cá nhân.",
        "is_correct": true
      },
      {
        "option_text": "C. Làm chậm hiệu suất của máy tính.",
        "is_correct": true
      },
      {
        "option_text": "D. Sửa chữa các tệp bị hỏng.",
        "is_correct": false
      },
      {
        "option_text": "E. Không cho phép máy tính khởi động.",
        "is_correct": false
      }
    ]
  },
  {
    "id": 37,
    "content": "Em hãy ghép nối từng thiết bị điện tử ở bên phải với khả năng thu hình/tiếng tương ứng ở bên trái.",
    "question": 37,
    "question_type": "drop_match",
    "match_question": [
      {
        "id":1,
        "term": "Loa thông minh",
        "definition": "Có thể ghi âm những người ở gần xung quanh và thường không quay được Video. "
      },
      {
        "id":2,
        "term": "Chuông cửa thông minh",
        "definition": "Có thể quay Video và thu âm những người ở trước nhà."
      },
      {
        "id":3,
        "term": "Webcam",
        "definition": "Có thể quay Video những người ngồi trước bàn phím và thu âm vùng gần xung quanh. "
      }
    ]
  },
  {
    "id": 38,
    "content": "Hãy di chuyển từng phương thức giao tiếp từ danh sách bên phải sang tình huống sử dụng tương ứng bên trái.",
    "question": 38,
    "question_type": "drop_match",
    "match_question": [
      {
        "id":4,
        "term": "Email",
        "definition": "Dùng cho những tin nhắn có nội dung dài và không cần phản hồi ngay."
      },
      {
        "id":5,
        "term": "Hội thảo truyền hình",
        "definition": "Dùng để giao tiếp và tương tác qua lại tức thì. "
      },
      {
        "id":6,
        "term": "Tin nhắn",
        "definition": "Dùng cho những tin nhắn ngắn, không trang trọng và cần phản hồi nhanh ngay cả khi người đó đang ở nhà."
      }
    ]
  }
]