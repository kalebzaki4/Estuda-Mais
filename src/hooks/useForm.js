import { useState, useCallback } from 'react';

/**
 * Hook customizado para gerenciar formulários
 * @param {object} initialValues - Valores iniciais do formulário
 * @param {function} validationSchema - Função de validação (opcional)
 * @returns {object} - Objeto com valores, erros e funções de controle
 */
const useForm = (initialValues = {}, validationSchema = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para atualizar um campo específico
  const setValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Função para lidar com mudanças nos inputs
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValue(name, fieldValue);
  }, [setValue]);

  // Função para marcar campo como tocado
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  // Função para validar todos os campos
  const validate = useCallback(() => {
    if (!validationSchema) return {};
    
    try {
      const validationErrors = validationSchema(values);
      return validationErrors || {};
    } catch (error) {
      console.error('Erro na validação:', error);
      return {};
    }
  }, [values, validationSchema]);

  // Função para resetar o formulário
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Função para submeter o formulário
  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      if (e) {
        e.preventDefault();
      }

      setIsSubmitting(true);
      
      // Validar todos os campos
      const validationErrors = validate();
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return;
      }

      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Erro ao submeter formulário:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [values, validate]);

  // Função para definir erros manualmente
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
    reset,
    validate
  };
};

export default useForm;