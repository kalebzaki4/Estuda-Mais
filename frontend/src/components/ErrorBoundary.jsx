import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0F1117] flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle size={40} className="text-red-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">Ops! Algo deu errado</h1>
            <p className="text-white/60 mb-8">
              Ocorreu um erro inesperado na aplicação. Por favor, tente recarregar a página.
            </p>

            <button
              onClick={this.handleReset}
              className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 px-6 rounded-xl transition-all active:scale-[0.98]"
            >
              <FaRedo size={18} />
              Recarregar Aplicação
            </button>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 text-left">
                <p className="text-xs text-red-400 font-mono overflow-auto max-h-40 p-4 bg-black/40 rounded-lg border border-red-500/20">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
