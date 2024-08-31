"use client";
import React, { useState } from 'react'
import Logo from '@/app/assets/svgs/logo.svg'
import { AnimatedContainer } from '@/components/layout';
import { Button, TextLink } from '@/components/buttons';
import Eye from '@/app/assets/svgs/eye.svg';
import EyeClose from '@/app/assets/svgs/eye-close.svg';
import { Checkbox, TextInput } from '@/components/inputs';
import { Container } from '@/components/common';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AnimatedContainer className="items-center justify-center">
      {/* Apply the gradient background and animation */}
      <Container>
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <Logo className="h-12 w-12 text-theme-primary-600 transition-all ease-in-out duration-300" />
        </div>

        <form className="space-y-4 sm:space-y-6">
          <TextInput type={showPassword ? "text" : "password"} id="password" label="Contraseña" placeholder='Ingresa tu contraseña' trailingIcon={
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="text-theme-secondary-500 hover:text-theme-secondary-800 transition-all ease-in-out duration-300"
            >
              {showPassword ? (
                <EyeClose className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          } />

          <div className="flex items-center justify-between flex-wrap gap-2">
            <Checkbox id="remember-me" label="Mantener sesión" />

            <TextLink className='text-sm' text="¿Olvidaste tu contraseña?" href="mailto:juan.marroquin1@unmsm.edu.pe" />
          </div>
          
          <Button type="submit" text="Ingresar" />
        </form>
      </Container>
    </AnimatedContainer>
  )
}
