import React from 'react';
import { useState,useRef } from 'react';
import {motion} from 'framer-motion';
import emailjs from '@emailjs/browser';
import {styles} from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
// Template ID: template_ddyukok 
//Service ID: service_bk7w548
//Public Key: pNOtEtRwqkV3B5q7C

const Contact = () => {
  const formRef =useRef();
  const [form,setForm] = useState({
    name:'',
    email:'',
    message:'',
  })
  const [loading,setLoading]=useState(false);

  const handleChange=(e)=>{
    const {name,value} =e.target;

setForm({...form,[name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    setLoading(true);
    emailjs.send('service_bk7w548','template_ddyukok',
    {
      from_name:form.name,
      to_name:'Anoosha',
      from_email:form.email,
      to_email:'anooshaia16@gmail.com',
      message:form.message,

    },
    'pNOtEtRwqkV3B5q7C'
    )
    .then(()=>{
      setLoading(false);
      alert('Thank you. I will get back to you as soon as possible.');

      setForm({
        name:'',
        email:'',
        message:'',
      })
    },(error)=>{
      setLoading(false);
      console.log(error);
      alert("Something went wrong.");
      setForm({
        name:'',
        email:'',
        message:'',
      })
    })
  }

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
      variants={slideIn('left','tween',0.2,1)}
      className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input type='text'
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder="What's your name?"
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email?"
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea type='text'
            rows='7'
            name='message'
            value={form.message}
            onChange={handleChange}
            placeholder="What do you wanna say? Shoot!!"
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <button
          type='submit'
          className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
          >
          {loading?'Sending...':'Send'}
          </button>
        </form>
      </motion.div>
      <motion.div
       variants={slideIn('right','tween',0.2,1)}
       className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas/>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact,"contact")