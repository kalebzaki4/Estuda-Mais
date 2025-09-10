// Validação de email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de senha forte
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Validação de senha simples (mínimo 6 caracteres)
export const validateSimplePassword = (password) => {
  return password && password.length >= 6;
};

// Validação de nome de usuário
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// Validação de campo obrigatório
export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

// Validação de comprimento mínimo
export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

// Validação de comprimento máximo
export const validateMaxLength = (value, maxLength) => {
  return !value || value.length <= maxLength;
};

// Sanitização de entrada
export const sanitizeInput = (input) => {
  if (!input) return '';
  return input.replace(/<script[^>]*>.*?<\/script>/gi, '')
              .replace(/<[^>]+>/g, '')
              .trim();
};

// Função para criar esquema de validação de formulário
export const createValidationSchema = (rules) => {
  return (values) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const fieldRules = rules[field];
      const value = values[field];
      
      fieldRules.forEach(rule => {
        if (typeof rule === 'function') {
          const error = rule(value, values);
          if (error && !errors[field]) {
            errors[field] = error;
          }
        }
      });
    });
    
    return errors;
  };
};

// Regras de validação pré-definidas
export const validationRules = {
  required: (message = 'Este campo é obrigatório') => (value) => {
    return validateRequired(value) ? null : message;
  },
  
  email: (message = 'Email inválido') => (value) => {
    return !value || validateEmail(value) ? null : message;
  },
  
  password: (message = 'Senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo') => (value) => {
    return !value || validatePassword(value) ? null : message;
  },
  
  simplePassword: (message = 'Senha deve ter pelo menos 6 caracteres') => (value) => {
    return !value || validateSimplePassword(value) ? null : message;
  },
  
  username: (message = 'Nome de usuário deve ter 3-20 caracteres (letras, números e _)') => (value) => {
    return !value || validateUsername(value) ? null : message;
  },
  
  minLength: (min, message) => (value) => {
    const defaultMessage = `Deve ter pelo menos ${min} caracteres`;
    return !value || validateMinLength(value, min) ? null : (message || defaultMessage);
  },
  
  maxLength: (max, message) => (value) => {
    const defaultMessage = `Deve ter no máximo ${max} caracteres`;
    return validateMaxLength(value, max) ? null : (message || defaultMessage);
  },
  
  confirmPassword: (message = 'Senhas não coincidem') => (value, values) => {
    return value === values.password ? null : message;
  }
};