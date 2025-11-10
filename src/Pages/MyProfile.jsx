import React from 'react';

const MyProfile = () => {
    return (
        <div>
            <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                {/* Profile Sidebar */}
                <div className="layout-content-container flex flex-col w-80">
                    <div className="flex p-4 @container">
                        <div className="flex w-full flex-col gap-4 items-center">
                            <div className="flex gap-4 flex-col items-center">
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC10bWF6j8K29r5ofLVdF9PHBPXavGKmaxd9AO06A932Df8DzxTubjDq1gZPekjL_7U11Hq-IgqBS3TI3rnYFTP5aK09m_6cgseZs-DWx2wLyxlJAJVU0nSRpsRFVwG1ayuqLUbmC3taRcqJFX7G3EHr994JzVuonptj0F20gZMSmWn3TMzjY3_mjaiU8uo-ypxZtABJPBR6qClfG-8Nt6M92ZpAfCycDIeHJRLauY4canLXMPta1V0vfRcT4aRWVXq8z6KRqqPks61")',
                                    }}
                                ></div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                                        Olivia Bennett
                                    </p>
                                    <p className="text-[#9dabb9] text-base font-normal leading-normal text-center">
                                        olivia.bennett@email.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Edit Form */}
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                        <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                            Edit Profile
                        </p>
                    </div>

                    {/* Name Input */}
                    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-white text-base font-medium leading-normal pb-2">
                                Name
                            </p>
                            <input
                                type="text"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#283039] h-14 placeholder:text-[#9dabb9] p-4 text-base font-normal leading-normal"
                                placeholder="Enter your name"
                                defaultValue=""
                            />
                        </label>
                    </div>

                    {/* Photo URL Input */}
                    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-white text-base font-medium leading-normal pb-2">
                                Photo URL
                            </p>
                            <input
                                type="text"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#283039] h-14 placeholder:text-[#9dabb9] p-4 text-base font-normal leading-normal"
                                placeholder="Enter your photo URL"
                                defaultValue=""
                            />
                        </label>
                    </div>

                    {/* Email Input */}
                    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-white text-base font-medium leading-normal pb-2">
                                Email
                            </p>
                            <input
                                type="email"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#283039] h-14 placeholder:text-[#9dabb9] p-4 text-base font-normal leading-normal"
                                placeholder="Enter your email"
                                defaultValue=""
                            />
                        </label>
                    </div>

                    {/* Save Button */}
                    <div className="flex px-4 py-3">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1380ec] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                            <span className="truncate">Save Changes</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;