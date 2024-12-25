import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useState } from 'react';
import { KeyRound, UserPlus } from 'lucide-react';

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          
          <div className="mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Don't have an account? Sign up
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4 mr-2" />
                  Already have an account? Sign in
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}