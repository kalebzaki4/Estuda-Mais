import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'

vi.mock('../contexts/AuthContextCore.js', () => {
  const mockRegister = vi.fn()
  return {
    useAuth: () => ({ register: mockRegister }),
  }
})

import Signup from '../pages/Signup.jsx'
import { MemoryRouter } from 'react-router-dom'

describe('Signup form', () => {
  it('validates and calls register with trimmed payload', async () => {
    const { useAuth } = await import('../contexts/AuthContextCore.js')
    useAuth().register.mockResolvedValue({ success: true })

    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Signup />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: '  Kaleb  ' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: '  test@example.com  ' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Senha123!' } })
    fireEvent.change(screen.getByLabelText('Confirmar Senha'), { target: { value: 'Senha123!' } })
    fireEvent.click(screen.getByLabelText(/Eu concordo/))

    const submits = screen.getAllByTestId('submit-signup')
    const submitEnabled = submits.find(el => !el.hasAttribute('disabled')) || submits[0]
    fireEvent.click(submitEnabled)

    await waitFor(() => {
      expect(useAuth().register).toHaveBeenCalledWith('Kaleb', 'test@example.com', 'Senha123!')
    })
  })

  it('shows error when register throws', async () => {
    const { useAuth } = await import('../contexts/AuthContextCore.js')
    useAuth().register.mockRejectedValue(new Error('Network error'))

    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Signup />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Kaleb' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Senha123!' } })
    fireEvent.change(screen.getByLabelText('Confirmar Senha'), { target: { value: 'Senha123!' } })
    fireEvent.click(screen.getByLabelText(/Eu concordo/))

    const form = screen.getByLabelText('Formulário de cadastro')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(useAuth().register).toHaveBeenCalledTimes(1)
    })
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })
})