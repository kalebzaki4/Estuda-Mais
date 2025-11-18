import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'

vi.mock('../contexts/AuthContext.jsx', () => {
  const mockRegister = vi.fn()
  return {
    useAuth: () => ({ register: mockRegister }),
  }
})

import Signup from '../pages/Signup.jsx'

describe('Signup form', () => {
  it('validates and calls register with trimmed payload', async () => {
    const { useAuth } = await import('../contexts/AuthContext.jsx')
    useAuth().register.mockResolvedValue({ success: true })

    render(<Signup />)

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: '  Kaleb  ' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: '  test@example.com  ' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Senha123!' } })
    fireEvent.change(screen.getByLabelText('Confirmar Senha'), { target: { value: 'Senha123!' } })
    fireEvent.click(screen.getByLabelText(/Eu concordo/))

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    await waitFor(() => {
      expect(useAuth().register).toHaveBeenCalledWith('Kaleb', 'test@example.com', 'Senha123!')
    })
  })

  it('shows error when register throws', async () => {
    const { useAuth } = await import('../contexts/AuthContext.jsx')
    useAuth().register.mockRejectedValue(new Error('Network error'))

    render(<Signup />)

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Kaleb' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Senha123!' } })
    fireEvent.change(screen.getByLabelText('Confirmar Senha'), { target: { value: 'Senha123!' } })
    fireEvent.click(screen.getByLabelText(/Eu concordo/))

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    await waitFor(() => {
      expect(screen.getByText(/Erro ao cadastrar/)).toBeInTheDocument()
    })
  })
})