import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
const App = () => {

  const [HasClicked, setHasClicked] = useState(false)
  const [HandleForm, setHandleForm] = useState('')
  const [UserName, setUserName] = useState('')
  const [ClickedHearts, setClickedHearts] = useState(0)
  const [ShowMsg, setShowMsg] = useState(false)
  const [msgText, setMsgText] = useState('Wait...')
  const [MsgList, setMsgList] = useState([])
  const msgRef = useRef(null)
  
  
  const imageClicked = () => {
    console.log("Clicked");
    
    const screenWidth = window.innerWidth;
    let screenValue = 8
    
    if(screenWidth <= 1280){
      screenValue = 10
    }
    else if(screenWidth <= 1536){
      screenValue = 12
    }
    else if(screenWidth <= 1920){
      screenValue = 14
    }
    
    gsap.to(".box",{
      scale: screenValue,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
      onComplete: () => {
        let tl = gsap.timeline();
        tl.to(".box",{
          opacity: 0
        },'a')
        .to(".box-container",{
          opacity: 0
        },'a')
        .to(".form",{
          zIndex: 1
        })
      }
    })
    setHasClicked(true)
  }
  
  
  const submitHandler = (e) => {
    e.preventDefault();
    setUserName(HandleForm)
  }
  
  const formSubmit = () => {
    let txt = document.querySelector('.txt');
    if(txt.value === ''){
      alert("Enter your Name")
    }
    else{
      let tl = gsap.timeline()
      tl.to(".form",{
        opacity: 0
      },'a')
      .to(".main-page",{
        zIndex: 1
      },'a')
      .to(".text",{
        opacity: 1
      })
      .to(".btn",{
        opacity: 1
      })
    }
  }
  
  const Ccontinue = () => {
    console.log("btn clicked")
    let tl = gsap.timeline();
    
    tl.to('.card-1',{
      opacity: 0,
      zIndex: 9
    })
    .to('.card-2',{
      opacity: 1,
      zIndex: 10
    })
  }
  
  const heart = (e) => {
    gsap.to(e.currentTarget,{
      opacity:0,
      duration: 0.3,
      onComplete: () => {
        setClickedHearts(prev => {
          const updated = prev + 1;
          if(updated === 4){
            gsap.to('.card-2',{
              opacity: 0
            })
            setShowMsg(true)
          }
          return updated
        })
      }
    })
  }
  useEffect(() => {
    if (ShowMsg) {
      let tl = gsap.timeline();
      
      // Step 1: Fade in first message
      tl.to(msgRef.current, {
        opacity: 1,
        duration: 0.5,
      })
      .to({}, { duration: 1 }) // wait
      .add(() => setMsgText('Someone having a Birthday 🤣❤'))
      .to({}, { duration: 1 }) // wait to show this message
      .to(msgRef.current, { opacity: 0, duration: 0.5 })
      
      // Step 2: Happy Birthday Message
      .add(() => setMsgText(`Happy Birthday ${UserName} 🥳`))
      .to(msgRef.current, { opacity: 1, duration: 0.5 })
      .to({}, { duration: 1 })
      .to(msgRef.current, { opacity: 0, duration: 0.5 })
      
      // Step 3: Getting Older Message
      .add(() => setMsgText('Getting Older, hehe ><'))
      .to(msgRef.current, { opacity: 1, duration: 0.5 })
      .to({}, { duration: 1 })
      .to(msgRef.current, { opacity: 0, duration: 0.5 })
      
      // Step 4: Final Message
      .add(() => setMsgText('Stay Healthy Always!'))
      .to(msgRef.current, { opacity: 1, duration: 0.5 })
      .to({}, { duration: 1 });
    }
  }, [ShowMsg]);
  
  
  const gifList = [
    'bunga.gif',
    'bwa2.gif',
    'cilukba.gif',
    'ciumin.gif',
    'emawh.gif',
    'hearthappy.gif',
    'mikir.gif',
    'mmm.gif',
    'pandacoklat.gif',
    'pandakuning.gif',
    'pandapanah.gif',
    'pusn.gif',
    'weee.gif'
  ];

  const [CurrentGif, setCurrentGif] = useState(gifList[0])
  
    useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * gifList.length);
      setCurrentGif(gifList[randomIndex]);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  return (
    <>
    {/* Box Image */}
    <div className='box-container w-full h-screen flex flex-col items-center justify-center overflow-hidden'>
      <img onClick={imageClicked} className='box w-40 h-40 duration-300 hover:scale-75 cursor-pointer' src="/Box.png" alt="boxImage" />
      <h3 className='mt-3 text-3xl'>Click the Gift!</h3>
    </div>
    {/* Box Image */}

    {/* Form Page */}
    <div className="form absolute top-0 left-0 z-[-1] w-full h-screen flex items-center justify-center">
      <form onSubmit={submitHandler} className='w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw] bg-zinc-500 px-5 py-5 rounded-lg flex flex-col items-center justify-center'>
        <h2 className='text-4xl font-semibold'>Enter Your Name</h2>
        <input 
        value={HandleForm}
        onChange={(e) => setHandleForm(e.target.value)}
        className='txt w-full h-13 bg-white text-black mt-4 rounded-lg text-3xl px-5 border-none outline-none' type="text" />
        <button onClick={formSubmit} className='bg-blue-600 px-10 py-4 mt-4 rounded-full text-xl duration-300 hover:bg-blue-800 cursor-pointer'>Ok</button>
      </form>
    </div>
    {/* Form Page */}

    {/* Main Page */}
    <div className="main-page absolute top-0 left-0 z-[-1] w-full h-screen flex flex-col items-center px-5 py-8">
      <img key={CurrentGif} className='w-30 rounded-full border border-zinc-400 bg-zinc-400' src={CurrentGif} alt="heartHappy" />
      <h2 className='mt-6 text-3xl font-semibold'>Hai, {UserName && `${UserName}`}✨</h2>

      {/* Card Container */}
      <div className="card relative w-[100%] sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[35%] 2xl:w-[30%] min-h-[20vh] border border-zinc-400 mt-5 rounded-tl-2xl rounded-br-2xl">
        {/* Card-1 Container */}
        <div className="card-1 absolute top-0 left-0 z-[10] w-full h-full flex flex-col items-center justify-center">
          <h2 className="text text-2xl font-semibold opacity-0">I have something for you 🤣❤</h2>
          <h3 onClick={Ccontinue} className='btn mt-5 ml-50 sm:ml-70 -mb-4 cursor-pointer text-zinc-300 text-lg opacity-0'>Click to continue</h3>
        </div>
        {/* Card-1 Container */}

        {/* Heart Container */}
        <div className="card-2 opacity-0 absolute top-0 left-0 z-[9] w-full h-full flex flex-col items-center justify-center">
          <h2 className="text text-2xl font-semibold">Click 4 LOVE Below 😁❤</h2>
          {/* Hearts Show Container */}
          <div className="hearts flex gap-5 mt-4">
            {[...Array(4)].map((_, index) => (
              <span key={index} onClick={heart} className='heart text-4xl duration-300 text-red-700 cursor-pointer'>❤</span>
            ))}
          </div>
          {/* Hearts Show Container */}
        </div>
        {/* Heart Container */}

        {/* Message Show Container */}
        {ShowMsg && (
          <div className="w-full h-full flex items-center justify-center">
            <div ref={msgRef} className='W8 text-2xl font-semibold opacity-0 text-center'>{msgText}</div>
          </div>
        )}
        {/* Message Show Container */}

      </div>
      {/* Card Container */}
    </div>
    {/* Main Page */}
    </>
  )
}

export default App