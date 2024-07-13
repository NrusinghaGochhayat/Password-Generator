import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setform] = useState({ sitename: "", username: "", password: "" })
    const [passwordArry, setpasswordArry] = useState([])
    const ref = useRef()
    const passwordRef = useRef()


   const getPassword =async ()=>{
    let req = await fetch('http://localhost:3000/')
    let password = req.json();
    setpasswordArry(password)
   } 

    useEffect(() => {
        getPassword();
      

    }, [])

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("src/hidden.png")) {
            ref.current.src = "src/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "src/hidden.png"
            passwordRef.current.type = "text"
        }
    }
    const savePassword = () => {
        setpasswordArry([...passwordArry, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArry, { ...form, id: uuidv4() }]))
        console.log(...passwordArry, form)
        setform({ sitename: "", username: "", password: "" })
        
    }
    const deletePassword = (id) => {
        console.log("Deleting Password with id ", id)
        let c = confirm('Do you wnat to delete this password?')
        if (c) {
            setpasswordArry((passwordArry.filter(item => item.id !== id)))
            localStorage.setItem('passwords', JSON.stringify(passwordArry.filter(item => item.id !== id)))
        }
       
    }
    const editPassword = (id) => {
        console.log("Edited Password with id ", id)
        setform(passwordArry.filter(i => i.id === id)[0])
        setpasswordArry(passwordArry.filter(i => i.id !== id))


    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {

        toast('Copy to Clickboard', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)

    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />

            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
            <div className=" mx-auto  max-w-4xl  ">
                <h1 className='text-center'>
                    <div className="logo font-bold text-2xl pt-4">
                        <span className='text-green-500'>&lt;</span>
                        Pass
                        <span className='text-green-500 font-bold'>Op</span>
                        <span className='text-red-500'>/</span>
                        <span className='text-green-500'>&gt;</span>
                    </div>
                </h1>
                <p className='text-center text-green-500 text-lg'>Your own Password Manager</p>
                <div className='flex flex-col  p-4 gap-4'>
                    <input onChange={handleChange} className='border-green-500 rounded-full border max-w-4xl p-4 py-1 w-full text-sm' placeholder='Enter Website URL ' type="text" value={form.sitename} name='sitename' />
                    <div className="flex gap-4 justify-between width-full" >
                        <input onChange={handleChange} className='border-green-500 rounded-full border max-w-2xl p-4 py-1 w-full text-sm' placeholder='Enter Name' type="text" value={form.username} name='username' />

                        <div className="relative">
                            <input onChange={handleChange} placeholder='Enter Password' className='border-green-500 rounded-full border max-w-2xl p-4 py-1 w-full text-sm' type="password" ref={passwordRef} value={form.password} name='password' />
                            <span onClick={showPassword} className='absolute right-[10px] top-[5px] cursor-pointer'>
                                <img ref={ref} width={18} src="src/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center bg-green-500 rounded-full item-center w-fit px-4 py-2 m-auto text-sm hover:bg-green-400 duration-200 border border-green-700'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}>
                        </lord-icon>
                        Add Password </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-center py-4 '>Your Passwords</h2>
                    {passwordArry.length === 0 && <div className='text-center py-6 '>No Password to show...</div>}
                    {passwordArry.length != 0 && <table className="table-auto w-full">
                        <thead className='bg-green-600 text-white'>
                            <tr>
                                <th>Site</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordArry.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-1 border border-white text-center w-32 text-sm'><a href={item.sitename} target='_blank'>{item.sitename}
                                    </a>
                                        <span onClick={() => { copyText(item.sitename) }} className='cursor-pointer'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover"
                                                style={{ width: "12px", height: "12px", paddingLeft: "3px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                    <td className='py-1 border border-white text-center w-32 text-sm'>{item.username}

                                        <span onClick={() => { copyText(item.username) }} className='cursor-pointer'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover"
                                                style={{ width: "12px", height: "12px", paddingLeft: "3px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                    <td className='py-1 border border-white text-center w-32 text-sm'>{item.password}

                                        <span onClick={() => { copyText(item.password) }} className='cursor-pointer'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover"
                                                style={{ width: "12px", height: "12px", paddingLeft: "3px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                    <td className='py-1 border border-white text-center w-32 text-sm'>

                                        <span onClick={() => { editPassword(item.id) }} className='cursor-pointer py-4'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/nxtwldeb.json"
                                                trigger="hover"
                                                style={{ width: "12px", height: "12px", paddingLeft: "3px" }}>
                                            </lord-icon>
                                            <span onClick={() => { deletePassword(item.id) }} className='cursor-pointer'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: "14px", height: "14px", paddingLeft: "3px" }}>
                                                </lord-icon>

                                            </span>
                                        </span>

                                    </td>

                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
