import React from 'react'
import Button from '../Button'
import Input from '../Input'

const ResetPasswordForm = ({
    setPasswordConfirmation,
    setPassword,
    handleSubmit,
    loading
}) => {
    return (
        <div
      className="flex items-center justify-center min-h-screen
      px-4 py-12 lg:px-8 bg-gray-50 sm:px-6"
    >
      <div className="w-full max-w-md">
    
        <form className="mt-8" onSubmit={handleSubmit}>
          <Input
            label="New Password"
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Password Confirmation"
            type="password"
            placeholder="********"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button type="submit" buttonText="Change Password" loading={loading} disabled={loading} />
          
         
        </form>
      </div>
    </div>
    )
}

export default ResetPasswordForm
