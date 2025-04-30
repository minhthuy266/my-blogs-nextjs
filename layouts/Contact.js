import React, { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { FaEnvelope, FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import Link from "next/link";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, phone, mail, location } = frontmatter;
  const form_action =
    "/api/contact";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new URLSearchParams();
    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("subject", formData.subject);
    formDataObj.append("message", formData.message);

    try {
      await fetch(form_action, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataObj,
      });

      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message.");
    }
  };

  return (
    <section className="section lg:mt-16">
      <div className="container">
        <div className="row relative pb-16">
          <div className="lg:col-6">
            <h1 className="my-10 lg:my-11 lg:pt-11 text-center lg:text-left lg:text-[64px]">
              {title}
            </h1>
          </div>
          <div className="contact-form-wrapper rounded border border-border p-6 dark:border-darkmode-border lg:col-6">
            <h2>
              Send Us A
              <span className="ml-1.5 inline-flex items-center text-primary">
                Message
                <BsArrowRightShort />
              </span>
            </h2>
            <form className="contact-form mt-12" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name">Full name *</label>
                <input
                  className="form-input w-full"
                  name="name"
                  type="text"
                  placeholder="Thomas Milano"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email">Email Address *</label>
                <input
                  className="form-input w-full"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="subject">Subject *</label>
                <input
                  className="form-input w-full"
                  name="subject"
                  type="text"
                  placeholder="Blog advertisement"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message">Your Message Here *</label>
                <textarea
                  className="form-textarea w-full"
                  placeholder="Hello I’m Mr ‘x’ from………….."
                  rows="7"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                className="btn btn-primary"
                type="submit"
                value="Send Now"
              />
            </form>
            {status && <p className="mt-4">{status}</p>}
          </div>
        </div>

        <div className="row">
          {phone && (
            <div className="md:col-6 lg:col-4">
              <Link
                href={`tel:${phone}`}
                className="my-4 flex h-[100px] items-center justify-center rounded border border-border p-4 text-primary dark:border-darkmode-border"
              >
                <FaUserAlt />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {phone}
                </p>
              </Link>
            </div>
          )}
          {mail && (
            <div className="md:col-6 lg:col-4">
              <Link
                href={`mailto:${mail}`}
                className="my-4 flex h-[100px] items-center justify-center rounded border border-border p-4 text-primary dark:border-darkmode-border"
              >
                <FaEnvelope />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {mail}
                </p>
              </Link>
            </div>
          )}
          {location && (
            <div className="md:col-6 lg:col-4">
              <span className="my-4 flex h-[100px] items-center justify-center rounded border border-border p-4 text-primary dark:border-darkmode-border">
                <FaMapMarkerAlt />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {location}
                </p>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
