import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

//template_z710bef

//service_24j9v5g

// hAzCBFr1stKt5cD8t

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const formRef = useRef();
  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailSend();
  };

  const emailSend = async () => {
    const res = await emailjs.send(
      "service_24j9v5g",
      "template_z710bef",
      {
        from_name: form.name,
        to_name: "蔡梓麒",
        from_email: form.email,
        to_email: "2513979520@qq.com",
        message: form.message,
      },
      "hAzCBFr1stKt5cD8t"
    );
    if (res.status === 200) {
      setLoading(false);
      setForm({
        name: "",
        email: "",
        message: "",
      });
      window.alert("感谢您对我的认可，我会尽快与您联系");
    } else {
      setSending(false);
      window.alert("发生未知错误");
    }
  };
  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>保持联系</p>
        <h3 className={styles.sectionHeadText}>联系方式</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className=" flex flex-col">
            <span className=" text-white font-medium mb-4">你的姓名</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className=" bg-tertiary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className=" flex flex-col">
            <span className=" text-white font-medium mb-4">你的邮箱</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className=" bg-tertiary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className=" flex flex-col">
            <span className=" text-white font-medium mb-4">其他信息</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="补充信息:"
              className=" bg-tertiary py-4 px-6 text-white rounded-lg placeholder:text-secondary outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className=" bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {sending ? `${loading ? "发送中..." : "已发送"}` : "发送"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] "
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
