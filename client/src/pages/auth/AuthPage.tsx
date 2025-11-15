import "./styleAuth.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faGoogle, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { useState } from "react"
import axios from "axios"
import { showMessage } from "../../component/notification/Message"
type Props = {}
type formLogin = {
  username: string,
  password: string
}

type formRegister = {
  email: string,
  username: string,
  password: string,
  repassword: string
}
type modeTypePass = {
  password: boolean,
  repassword: boolean
}
type errorRegister = {
  username: string,
  password: string,
  repassword: string,
  email: string
}
function AuthPage({ }: Props) {
  const [mode, setMode] = useState("")
  const [typePass, setTypePass] = useState<modeTypePass>({
    password: false,
    repassword: false
  })
  const [error, setError] = useState<errorRegister>({
    username: "",
    password: "",
    repassword: "",
    email: ""
  })
  const [formLogin, setFormLogin] = useState<formLogin>({
    username: "",
    password: ""
  })
  const [formRegister, setFormRegister] = useState<formRegister>({
    email: "",
    username: "",
    password: "",
    repassword: ""
  })

  // validate 
  const checkLengthString = (s: string, name: string): string => {
    if (s.length <= 0) {
      return `${name.toUpperCase()} là bắt buộc`
    }
    return ""
  }
  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Vui lòng nhập đúng dạng email là example@example.com";
    }
    return ""; // Email hợp lệ
  };
  const validateUsername = (username: string): string => {
    // Độ dài tối thiểu và tối đa
    if (username.length < 6) {
      return "Tên người dùng phải có ít nhất 6 ký tự.";
    }
    if (username.length > 20) {
      return "Tên người dùng không được vượt quá 20 ký tự.";
    }

    // Chỉ chứa chữ cái, số, dấu gạch dưới hoặc dấu chấm
    const validPattern = /^[a-zA-Z0-9._]+$/;
    if (!validPattern.test(username)) {
      return "Tên người dùng chỉ được chứa chữ cái, số, dấu gạch dưới (_) và dấu chấm (.).";
    }

    // Không bắt đầu hoặc kết thúc bằng ký tự đặc biệt
    if (/^[._]/.test(username) || /[._]$/.test(username)) {
      return "Tên người dùng không được bắt đầu hoặc kết thúc bằng dấu chấm (.) hoặc dấu gạch dưới (_).";
    }

    // Không chứa hai ký tự đặc biệt liên tiếp
    if (/(\.\.|__|._|_\.)/.test(username)) {
      return "Tên người dùng không được chứa hai dấu chấm hoặc hai dấu gạch dưới liên tiếp.";
    }

    // Nếu hợp lệ
    return "";
  };
  const validatePassword = (password: string): string => {
    // Độ dài tối thiểu
    if (password.length < 8) {
      return "Mật khẩu phải có ít nhất 8 ký tự.";
    }

    // Kiểm tra ký tự in hoa
    if (!/[A-Z]/.test(password)) {
      return "Mật khẩu phải chứa ít nhất một chữ cái in hoa.";
    }

    // Kiểm tra ký tự thường
    if (!/[a-z]/.test(password)) {
      return "Mật khẩu phải chứa ít nhất một chữ cái thường.";
    }

    // Kiểm tra chữ số
    if (!/[0-9]/.test(password)) {
      return "Mật khẩu phải chứa ít nhất một chữ số.";
    }

    // Kiểm tra ký tự đặc biệt
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (ví dụ: !@#$%^&*).";
    }

    // Không được chứa khoảng trắng
    if (/\s/.test(password)) {
      return "Mật khẩu không được chứa khoảng trắng.";
    }

    // Nếu hợp lệ
    return "";
  };


  // handle functions
  const handleCleanState = () => {
    setTypePass({
      password: false,
      repassword: false
    })
    setError({
      username: "",
      password: "",
      repassword: "",
      email: ""
    })

  }

  const handleChangeTypePass = (_e: React.MouseEvent<HTMLElement, MouseEvent>, name: keyof modeTypePass) => {
    setTypePass(pre => {
      return {
        ...pre,
        [name]: !pre[name]
      }
    })
  }

  const handleChangeFormLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormLogin({ ...formLogin, [name]: value })

    const errorMessageDefauld = checkLengthString(value, name)
    if (errorMessageDefauld.length > 0) {
      setError({ ...error, [name]: errorMessageDefauld })
      return
    }
    setError({ ...error, [name]: "" })

    if (name === "username") {
      let messsageError = validateUsername(value)

      if (messsageError.length > 0) {
        setError({ ...error, [name]: messsageError })
        return
      }
      setError({ ...error, [name]: "" })
    }

    if (name === "password") {
      let messsageError = validatePassword(value)

      if (messsageError.length > 0) {
        setError({ ...error, [name]: messsageError })
        return
      }
      setError({ ...error, [name]: "" })
    }

  }
  const handleChangeFormRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRegister({ ...formRegister, [name]: value })

    const errorMessageDefauld = checkLengthString(value, name)
    if (errorMessageDefauld.length > 0) {
      setError({ ...error, [name]: errorMessageDefauld })
      return
    }
    setError({ ...error, [name]: "" })

    if (name === "email") {
      let messsageError = validateEmail(value)

      if (messsageError.length > 0) {
        setError({ ...error, [name]: messsageError })
        return
      }
      setError({ ...error, [name]: "" })
    }

    if (name === "username") {
      let messsageError = validateUsername(value)

      if (messsageError.length > 0) {
        setError({ ...error, [name]: messsageError })
        return
      }
      setError({ ...error, [name]: "" })
    }

    if (name === "password") {
      let messsageError = validatePassword(value)

      if (messsageError.length > 0) {
        setError({ ...error, [name]: messsageError })
        return
      }
      setError({ ...error, [name]: "" })
    }

    if (name === "repassword") {
      let messsageError = ""
      if (value !== formRegister.password) {
        console.log("SS")
        messsageError = "Vui lòng nhập đúng với mật khẩu !"
      }
      if (messsageError.length > 0) {
        setError({ ...error, [name]: messsageError })
        return
      }
      setError({ ...error, [name]: "" })
    }

  }
  const isNullFormElement = (form: any): boolean => {
    if (error.email.length > 0 || error.username.length > 0 || error.password.length > 0 || error.repassword.length > 0) {
      return true
    }
    if (form.email?.length <= 0 || form.username.length <= 0 || form.password.length <= 0 || form.repassword?.length <= 0) {
      setError({
        username: form.username.length <= 0 ? "USERNAME không được trống" : "",
        password: form.password.length <= 0 ? "PASSWORD không được trống" : "",
        repassword: form.repassword?.length <= 0 ? "REPASSWORD không được trống" : "",
        email: form.email?.length <= 0 ? "EMAIL không được trống" : ""
      })
      return true
    }

    return false
  }
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isNullFormElement(formLogin)) {
      return
    }
    const login = async () => {
      const apiUrl = import.meta.env.VITE_API_URL
      axios.post(`${apiUrl}/auth/login`, formLogin, { withCredentials: true })
        .then(res => {
          showMessage(res.data.status, res.data.status ? "Đăng nhập thành công" : "Đăng nhập thất bại")
          setTimeout(() => {
            if (res.data.role === "admin") {
              // Redirect to admin dashboard
              window.location.href = "/admin"
            } else {
              window.location.href = "/"
            }
          }, 1000)
        })
        .catch(err => {
          showMessage(false, err.response.data.error || "Đăng nhập thất bại")
        })
    }
    await login()
  }
  const handleRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isNullFormElement(formRegister)) {
      return
    }
    const apiUrl = import.meta.env.VITE_API_URL
    axios.post(`${apiUrl}/auth/register`, formRegister, { withCredentials: true })
      .then(res => {
        showMessage(res.data.status, res.data.status ? "Đăng ký thành công" : "Đăng ký thất bại")
        setMode("")
        setTimeout(() => {
          setFormRegister({
            email: "",
            username: "",
            password: "",
            repassword: ""
          })
          handleCleanState()
        }, 1000)
      })
      .catch(err => {
        showMessage(false, err.response.data.error || "Đăng ký thất bại")
      })

  }
  return (
    <div className={`container ${mode}`} >
      <div className="form-container">
        <div className="signin-signup">
          {/* LOGIN FORM */}
          <form action="#" className="sign-in-form" >
            <h2 className="title">Đăng nhập</h2>
            <div className={`input-field ${error.username.length > 0 ? "input-error" : ""}`}>
              <i>
                <FontAwesomeIcon className="icon" icon={faUser} />
              </i>
              <input
                name="username"
                placeholder="Nhập tên đăng nhập"
                value={formLogin.username}
                onChange={(e) => handleChangeFormLogin(e)}
              ></input>
            </div>
            <p className={`${error.username.length > 0 ? "message-error" : ""}`}>{error.username}</p>
            <div className={`input-field ${error.password.length > 0 ? "input-error" : ""}`}>
              <i>
                <FontAwesomeIcon className="icon" icon={faLock} />
              </i>
              <input
                type={typePass.password ? "text" : "password"}
                name="password"
                placeholder="Nhập mật khẩu"
                value={formLogin.password}
                onChange={(e) => handleChangeFormLogin(e)}
              ></input>
              <i className="eye" onClick={(e) => handleChangeTypePass(e, "password")}>
                <FontAwesomeIcon className="icon" icon={typePass.password ? faEye : faEyeSlash} />
              </i>
            </div>
            <p className={`${error.password.length > 0 ? "message-error" : ""}`}>{error.password}</p>
            <button className="btn" onClick={e => handleLogin(e)}>Đăng nhập</button>
            <p className="social-text">Hoặc đăng nhập bằng những cách sau</p>
            <div className="social-media">
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faGoogle} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
          </form>

          {/* REGISTER FORM */}
          <form action="#" className="sign-up-form">
            <h2 className="title">Đăng ký</h2>
            <div className={`input-field ${error.email.length > 0 ? "input-error" : ""}`}>
              <i>
                <FontAwesomeIcon className="icon" icon={faEnvelope} />
              </i>
              <input
                type="email"
                name="email"
                placeholder="Nhập email"
                value={formRegister.email}
                onChange={(e) => handleChangeFormRegister(e)}
              ></input>
            </div>
            <p className={`${error.email.length > 0 ? "message-error" : ""}`}>{error.email}</p>
            <div className={`input-field ${error.username.length > 0 ? "input-error" : ""}`}>
              <i>
                <FontAwesomeIcon className="icon" icon={faUser} />
              </i>
              <input
                name="username"
                placeholder="Nhập tên đăng nhập"
                value={formRegister.username}
                onChange={(e) => handleChangeFormRegister(e)}
              ></input>
            </div>
            <p className={`${error.username.length > 0 ? "message-error" : ""}`}>{error.username}</p>
            <div className={`input-field ${error.password.length > 0 ? "input-error" : ""}`}>
              <i className="icon-for-pass">
                <FontAwesomeIcon className="icon" icon={faLock} />
              </i>
              <input
                type={typePass.password ? "text" : "password"}
                name="password"
                placeholder="Nhập mật khẩu"
                value={formRegister.password}
                onChange={(e) => handleChangeFormRegister(e)}
              ></input>
              <i className="icon-for-pass eye" onClick={(e) => handleChangeTypePass(e, "password")}>
                <FontAwesomeIcon className="icon" icon={typePass.password ? faEye : faEyeSlash} />
              </i>
            </div>
            <p className={`${error.password.length > 0 ? "message-error" : ""}`}>{error.password}</p>
            <div className={`input-field ${error.repassword.length > 0 ? "input-error" : ""}`}>
              <i >
                <FontAwesomeIcon className="icon" icon={faLock} />
              </i>
              <input
                type={typePass.repassword ? "text" : "password"}
                name="repassword"
                placeholder="Nhập lại mật khẩu"
                value={formRegister.repassword}
                onChange={(e) => handleChangeFormRegister(e)}
              ></input>

              <i className="eye" onClick={(e) => handleChangeTypePass(e, "repassword")}>
                <FontAwesomeIcon className="icon" icon={typePass.repassword ? faEye : faEyeSlash} />
              </i>
            </div>
            <p className={`${error.repassword.length > 0 ? "message-error" : ""}`}>{error.repassword}</p>
            <button className="btn" onClick={(e) => handleRegister(e)}>Đăng ký</button>
            <p className="social-text">Hoặc đăng nhập bằng những cách sau</p>
            <div className="social-media">
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faGoogle} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
          </form>
        </div>
      </div>

      <div className="panel-containers">
        <div className="panel left-panel">
          <div className="content">
            <h3>Chưa có tài khoản</h3>
            <p>Nhấn nút bên dưới để tạo mới tài khoản</p>
            <button
              className="btn transparent"
              onClick={() => {
                setTimeout(() => {
                  handleCleanState()
                }, 1000)

                setMode("sign-up-mode")
              }}>
              Đăng ký </button>
          </div>
          <img src="/public/enter-password.svg" className="image ml-[10px]  h-[420px] w-[50px]" alt="login-image"></img>


        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Đã có tài khoản</h3>
            <p>Nhấn nút bên dưới để đăng nhập </p>
            <button
              className="btn transparent"
              onClick={() => {
                setMode("")
                setTimeout(() => {
                  setFormRegister({
                    email: "",
                    username: "",
                    password: "",
                    repassword: ""
                  })
                  handleCleanState()
                }, 1000)
              }}
            > Đăng nhập </button>
          </div>
          <img src="/public/sign-up.svg" className="image" alt="login-image"></img>
        </div>
      </div>

    </div>
  )
}

export default AuthPage