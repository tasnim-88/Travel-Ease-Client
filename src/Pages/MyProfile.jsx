import React, { use, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { user, updateUser } = use(AuthContext)

    const [displayName, setDisplayName] = useState(user?.displayName || '')
    const [displayPhoto, setDisplayPhoto] = useState(user?.photoURL || '')

    const [name, setName] = useState(user?.displayName || '')
    const [photo, setPhoto] = useState(user?.photoURL || '')

    const handleSave = (e) => {
        e.preventDefault()

        updateUser( name, photo )
            .then(() => {
                setDisplayName(name)
                setDisplayPhoto(photo)
                toast.success('Congratulation! Profile updated successfully.')
            }).catch(error => {
                toast.error( error.message)
            })
    }

    return (
        <div>
            <title>My Profile</title>

            <div className="gap-1 px-6 md:flex flex-1 justify-start py-5">
                {/* Profile Sidebar */}
                <div className="layout-content-container flex flex-col w-80">
                    <div className="flex p-4 @container">
                        <div className="flex w-full flex-col gap-4 items-center">
                            <div className="flex gap-4 flex-col items-center">
                                <div
                                    className="w-30 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden"

                                >
                                    <img  src={displayPhoto || 'https://w0.peakpx.com/wallpaper/866/1004/HD-wallpaper-mask-guy-neon-eye-artist-neon-mask.jpg'} alt="" />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className=" text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                                        {displayName || 'user name'}
                                    </p>
                                    <p className="text-[#8e9fb1] text-base font-normal leading-normal text-center">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSave}>
                    {/* Main Edit Form */}
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        <div className="flex flex-wrap justify-between gap-3 p-4">
                            <p className="tracking-light text-[32px] font-bold leading-tight min-w-72">
                                Edit Profile
                            </p>
                        </div>

                        {/* Name Input */}
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-base font-medium leading-normal pb-2">
                                    Name
                                </p>
                                <input
                                    type="text"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#283039] h-14 placeholder:text-[#9dabb9] p-4 text-base font-normal leading-normal"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e)=> setName(e.target.value)}
                                />
                            </label>
                        </div>

                        {/* Photo URL Input */}
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-base font-medium leading-normal pb-2">
                                    Photo URL
                                </p>
                                <input
                                    type="url"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#283039] h-14 placeholder:text-[#9dabb9] p-4 text-base font-normal leading-normal"
                                    placeholder="Enter your photo URL"
                                    value={photo}
                                    onChange={(e)=> setPhoto(e.target.value)}
                                />
                            </label>
                        </div>

                        {/* Save Button */}
                        <div className="flex px-4 py-3">
                            <button type='submit' className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1380ec] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default MyProfile;