import React from 'react'

const ConfirmPage = ({user}) => {
    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto mt-10">
                <div className="relative max-w-4xl mx-auto items-center justify-between">
                    <h1 className="section">
                    Welcome
                    <span className="">{` ${user.username}`}</span>
                    , and thanks for signing up!
                    </h1>
                    <h2 className="">
                    Please check your email
                    <span className="">{`(${user.email})`}</span>
                    <br />
                    for the account activation link
                    </h2>
                    <span className="">PS: &#39;If you don&apos;t see the activation email, please check your Junk or Spam folders!&#39;</span>
                </div>
            </div>
        </div>
    )
}

export default ConfirmPage
