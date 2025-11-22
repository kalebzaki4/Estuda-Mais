import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import App from '../App.jsx'

describe('Routing behavior', () => {
  it('renders Signup page on /signup', () => {
    window.history.pushState({}, '', '/signup')
    render(<App />)
    expect(screen.getByText('Criar Conta')).toBeInTheDocument()
  })

  it('redirects unknown paths to Home', () => {
    window.history.pushState({}, '', '/unknown')
    render(<App />)
    expect(screen.getByText(/Bem-vindo ao Estuda \+/)).toBeInTheDocument()
  })
})