import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FormField } from '../components';

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ybtifoz', 'template_rw1kl0s', form.current, 'udzqDcPaUVHp8xI8W')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      form.current.reset();
  };

  return (
    <section className="sm:w-screen p-4">
        <h1 className="font-extrabold text-white text-[32px]">Contact Us</h1>

        <form className="mt-8 max-w-3xl" ref={form} onSubmit={sendEmail}>
            <div className="flex flex-col gap-5">
                <FormField
                    labelName="Name"
                    type="text"
                    name="name"
                    placeholder="Ex., john doe"
                />
                <FormField
                    labelName="Email address"
                    type="text"
                    name="email"
                    placeholder="name@example.com"
                />
                <FormField
                    labelName="Message"
                    type="text"
                    name="message"
                    placeholder="Leave a comment here"
                />
            </div>

            <button
                type="submit"
                className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto 
                px-5 py-2.5 text-center"
            >Submit
            </button>
        </form>
    </section>
  );
};