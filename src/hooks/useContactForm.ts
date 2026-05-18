import { useState, useCallback } from 'react';
import { saveMessage } from '../services/messageService';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Errors {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Touched {
  name: boolean;
  email: boolean;
  subject: boolean;
  message: boolean;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState<Touched>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [status, setStatus] = useState<Status>('idle');
  const [charCount, setCharCount] = useState(0);

  const validateField = useCallback((field: keyof FormData, value: string) => {
    let error = '';

    switch (field) {
      case 'name':
        if (!value) error = 'Please enter a valid name';
        else if (value.length < 2) error = 'Please enter a valid name';
        else if (value.length > 50) error = 'Please enter a valid name';
        else if (!/^[a-zA-Z\s]+$/.test(value)) error = 'Please enter a valid name';
        break;
      case 'email':
        if (!value) error = 'Please enter a valid email address';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address';
        else if (value.length > 100) error = 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value || value === '') error = 'Please select a subject';
        break;
      case 'message':
        if (!value) error = 'Message must be between 20 and 500 characters';
        else if (value.length < 20 || value.length > 500) error = 'Message must be between 20 and 500 characters';
        break;
    }

    return error;
  }, []);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    if (field === 'message') {
      setCharCount(value.length);
    }

    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    } else {
      // Clear error if user starts typing and it's valid, even if not touched
      const error = validateField(field, value);
      if (!error) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateAll = () => {
    const newErrors: Errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    return !Object.values(newErrors).some((err) => err !== '');
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({ name: '', email: '', subject: '', message: '' });
    setTouched({ name: false, email: false, subject: false, message: false });
    setStatus('idle');
    setCharCount(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) return;

    setStatus('loading');

    try {
      const result = await saveMessage(formData);
      
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
    }
  };

  return {
    formData,
    errors,
    status,
    charCount,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};
