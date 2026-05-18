import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('NXChemistree Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0a0f1e',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚗️</div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#8892a4', marginBottom: '24px' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              color: '#0a0f1e',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Reload Page 🔄
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
